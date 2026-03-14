# 🍷 BottleMe

A mobile app to manage your personal wine cellar — track your bottles,
vintages, appellations and tasting notes, all in one place.

Built with React Native (Expo) and a self-hosted Java backend.

## Tech Stack

**Frontend**

- React Native / Expo (TypeScript)
- Atomic Design architecture

**Backend**

- Java (self-hosted)
- Domain-Driven Design (DDD)
- MongoDB Atlas (database)

**Design & Tooling**

- Figma (UI design)
- ESLint / Prettier
- Metro (bundler)

## Prerequisites

- For Android: install [Android SDK](https://developer.android.com/studio?hl=fr) and create an emulator
- For iOS: follow the instructions [here](https://developer.apple.com/ios/)
- Or install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=fr&pli=1) on your mobile phone

## Development

Start the server and build the app:

```bash
npx metro start
```

```bash
cd Bottleme
npx expo
```

Then choose `a` for Android, `w` for web, or scan the QR code with Expo Go.

## Build

Register on [Expo Dev](https://expo.dev) then run:

```bash
eas build -p android --profile preview
```

You will be able to run the app on a local emulator.