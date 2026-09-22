# Release an Android APK

The `Android release` workflow (`.github/workflows/android-release.yml`) builds a
signed universal APK, uploads it as a workflow artifact, and attaches it to a
GitHub release when you push a tag. This page explains the one-time signing
setup, how to cut a release, and how users install the build with Obtainium.

## Create an upload keystore

Run `keytool` once and keep the resulting file safe. If you lose it, users can't
update an installed app, because Android requires every update to be signed with
the original key.

```shell
keytool -genkeypair -v \
  -keystore hydra-upload.keystore \
  -alias hydra-upload \
  -keyalg RSA -keysize 4096 \
  -validity 10000
```

`keytool` prompts for a keystore password, a key password, and your name and
organization. Record both passwords; you need them in the next step.

## Set the repository secrets

Encode the keystore as base64 so you can store it in a GitHub secret:

```shell
base64 -i hydra-upload.keystore | pbcopy    # macOS
base64 -w 0 hydra-upload.keystore           # Linux
```

In the repository, go to **Settings > Secrets and variables > Actions** and add
these four secrets:

| Secret | Value |
| --- | --- |
| `ANDROID_KEYSTORE_BASE64` | The base64 output from the command above. |
| `ANDROID_KEY_ALIAS` | The alias you passed to `keytool`, for example `hydra-upload`. |
| `ANDROID_KEYSTORE_PASSWORD` | The keystore password. |
| `ANDROID_KEY_PASSWORD` | The key password. |

The workflow decodes the keystore to `android/app/release.keystore`, and
`scripts/patch-android-signing.js` rewrites the prebuilt
`android/app/build.gradle` so the `release` build type uses that keystore
instead of the debug key.

## Cut a release

Push a tag that starts with `v`:

```shell
git tag v4.2.2-foss.1
git push --tags
```

The workflow builds `hydra-foss-v4.2.2-foss.1.apk` and attaches it to a GitHub
release with generated release notes.

To test the build without publishing a release, run the workflow manually from
the **Actions** tab. A manual run names the file `hydra-foss-manual-<sha>.apk`
and uploads it only as a workflow artifact.

## Install with Obtainium

[Obtainium](https://github.com/ImranR98/Obtainium) installs and updates apps
directly from GitHub releases.

1. In Obtainium, tap **Add App**.
2. Enter the source URL `https://github.com/17451k/hydra`.
3. Leave the APK filter empty, or set it to `.apk`. Every release asset name
   contains `.apk`, so Obtainium finds the build automatically.
4. Tap **Add**, then **Install**.

Install the first build from this repository before you rely on updates. Android
refuses to update an app that was installed from a different signing key, so a
build signed with another key, such as a Play Store or TestFlight install,
requires uninstalling the app first, which deletes its local data.
