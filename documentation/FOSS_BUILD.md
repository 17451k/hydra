# FOSS build

This is a fork of Hydra that builds and runs on Android without Google Play
Services. Every component that depended on a proprietary Google or vendor
service has been removed, so the app can be built from source and distributed
outside the Play Store.

## What was removed

- `react-native-purchases` / RevenueCat in-app purchases and Play Billing.
- `expo-notifications` push notifications (Firebase Cloud Messaging).
- `expo-updates` over-the-air updates.
- `@sentry/react-native` crash and error reporting, along with the
  Settings > Privacy error-reporting toggle, which no longer had anything to
  control.
- The EAS build configuration: `eas.json`, `extra.eas`, and `owner`.

## Pro features

Without a purchase flow, `isPro` is always false, so Hydra Pro features are
disabled. To unlock them, configure a self-hosted Hydra server in Settings.

## Package ID

The Android application ID is `com.shchepetkov.hydra`. The iOS bundle identifier is
unchanged.

## License

This is a modified fork of https://github.com/dmilin1/hydra, licensed under
AGPL-3.0. The source for this fork is at https://github.com/17451k/hydra.
