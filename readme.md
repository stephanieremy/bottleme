# 🍷 BottleMe

A mobile app to manage your personal wine cellar — track your bottles, vintages, appellations and tasting notes, all in
one place.

Built with React Native (Expo) and a self-hosted Java backend.

---

## Related Repositories

| Project                    | Repository                                                        |
|----------------------------|-------------------------------------------------------------------|
| Backend (Java Spring Boot) | [bottle-backend](https://github.com/stephanieremy/bottle-backend) |
| Web app (Angular)          | [bottle-webapp](https://github.com/stephanieremy/bottle-webapp)   |

---

## Design

| Resource                        | Link                                                                                                                                                                                                                               |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Mobile prototype                | [View prototype](https://www.figma.com/proto/EphGZnu7Y7ubuEmAceQFGf/Untitled?node-id=1-213&p=f&viewport=60%2C230%2C0.58&t=MNcI4KVXDAym1e1M-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1)                               |
| Figma maquettes & design system | [View in Figma](https://www.figma.com/proto/Ey2tcwDSi6xACE0dutCjIT/Untitled?page-id=0%3A1&node-id=27-8&p=f&viewport=324%2C3125%2C0.32&t=KLmpfoGRmmdApZwc-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=27%3A8) |

---

## Tech Stack

### Frontend
- React Native / Expo (TypeScript)
- Atomic Design architecture
- React Query (server state management)

### Backend

- Java Spring Boot — hexagonal architecture
- MongoDB Atlas (database)

### Design & Tooling

- Figma (UI design & prototyping)
- ESLint / Prettier
- Metro (bundler)

---

## Prerequisites

- For Android: install [Android SDK](https://developer.android.com/studio?hl=fr) and create an emulator
- For iOS: follow the instructions [here](https://developer.apple.com/ios/)
- Or install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=fr&pli=1) on your mobile phone

---

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

---

## Build

Register on [Expo Dev](https://expo.dev) then run:

```bash
eas build -p android --profile preview
```

You will be able to run the app on a local emulator.
****