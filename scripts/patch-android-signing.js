#!/usr/bin/env node
/**
 * Patches the prebuilt android/app/build.gradle so release builds are signed
 * with the upload keystore instead of the debug keystore.
 *
 * Reads these Gradle properties (supplied by the CI workflow):
 *   HYDRA_UPLOAD_STORE_FILE, HYDRA_UPLOAD_KEY_ALIAS,
 *   HYDRA_UPLOAD_STORE_PASSWORD, HYDRA_UPLOAD_KEY_PASSWORD
 */
const fs = require('fs');
const path = require('path');

const gradleFile = path.resolve(
  process.argv[2] || path.join(process.cwd(), 'android', 'app', 'build.gradle'),
);

let contents = fs.readFileSync(gradleFile, 'utf8');

if (contents.includes('HYDRA_UPLOAD_STORE_FILE')) {
  console.log('build.gradle already patched; nothing to do.');
  process.exit(0);
}

const releaseSigningConfig = `        release {
            if (project.hasProperty('HYDRA_UPLOAD_STORE_FILE')) {
                storeFile file(project.property('HYDRA_UPLOAD_STORE_FILE'))
                storePassword project.property('HYDRA_UPLOAD_STORE_PASSWORD')
                keyAlias project.property('HYDRA_UPLOAD_KEY_ALIAS')
                keyPassword project.property('HYDRA_UPLOAD_KEY_PASSWORD')
            }
        }
`;

// Insert the release signingConfig at the end of the signingConfigs block.
const signingConfigsIndex = contents.indexOf('signingConfigs {');
if (signingConfigsIndex === -1) {
  throw new Error('Could not find a signingConfigs block in ' + gradleFile);
}

let depth = 0;
let blockEnd = -1;
for (let i = contents.indexOf('{', signingConfigsIndex); i < contents.length; i++) {
  if (contents[i] === '{') depth++;
  else if (contents[i] === '}') {
    depth--;
    if (depth === 0) {
      blockEnd = i;
      break;
    }
  }
}
if (blockEnd === -1) {
  throw new Error('Could not find the end of the signingConfigs block in ' + gradleFile);
}

contents =
  contents.slice(0, blockEnd) + releaseSigningConfig + contents.slice(blockEnd);

// Point the release build type at the new signing config.
const patched = contents.replace(
  /(buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?)signingConfig\s+signingConfigs\.debug/,
  '$1signingConfig signingConfigs.release',
);

if (patched === contents) {
  throw new Error(
    'Could not repoint buildTypes.release.signingConfig in ' + gradleFile,
  );
}

fs.writeFileSync(gradleFile, patched);
console.log('Patched ' + gradleFile + ' with the release signing config.');
