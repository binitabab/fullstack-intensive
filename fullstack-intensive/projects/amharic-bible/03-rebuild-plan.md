# 03 — Rebuild plan (React Native + Expo)

## Tech stack

| Need | Choice |
|---|---|
| Framework | Expo + TypeScript |
| Navigation and deep links | expo-router |
| Bible data and user data | expo-sqlite (+ Zustand for app state) |
| Long chapters | FlashList (can jump to any verse) |
| Languages | i18next with the old app's 697 strings |
| Notifications | expo-notifications |
| Share and verse images | expo-sharing + react-native-view-shot |
| Widgets | Android: react-native-android-widget; iOS: WidgetKit (Swift) via an Expo config plugin |
| Testing | Jest + React Native Testing Library; Maestro for end-to-end |
| Builds and updates | EAS Build + EAS Update |

## Data

1. Take all data out of the old APK.
2. Fix the known problems (Tigrigna verses, 6 daily verses, KJV markers).
3. A validation script runs on every build: every book, chapter and verse, and every daily-verse and reading-plan reference.
4. Bundle Amharic and KJV; download the rest, verified with SHA-256 checksums.

## Phases

| Phase | What | Done when | Time (part-time) |
|---|---|---|---|
| 0. Setup | Expo + TypeScript, repo, tests, CI | App opens in Expo Go | 2–3 days |
| 1. Data layer | Bundled Bibles, chapters, books, validator | Tests pass for all 5 Bibles | 1 week |
| 2. Reader | Chapter view, pickers, translation switch, font size, dark mode, fonts | Comfortable reading | 1–2 weeks |
| 3. Deep links | `ethiobible://read?...` opens and scrolls to the verse | Works on cold start and past verse 120 | 2–3 days |
| 4. User data | Highlights, notes, bookmarks, history; backup export/import | Survives restarts; backup round-trips | 1 week |
| 5. Home + daily verse | Ethiopian date, same verse for everyone, local midnight, notifications | Two phones show the same verse | 1 week |
| 6. Search + plans | Search, reading plans with progress | Search under 1 s on a mid-range phone | 1–2 weeks |
| 7. Extras | Cross-references, Strong's, side-by-side, verse images, downloads | Parity with the old app | 2 weeks |
| 8. Widgets | Android, then iOS | Tapping opens the right verse | 1–2 weeks |
| 9. Polish | Screen-reader labels, 44 px targets, full translations | Accessibility checks pass | 1 week |
| 10. Release | Android, then iOS | Live on both stores | 1–2 weeks |

**Total:** about 3–4 months part-time; first usable version (phases 0–5) about 6–7 weeks.

## Old bugs designed out

| Old bug | Prevention |
|---|---|
| Deep link overridden by saved state | Apply links after settings load, with a test |
| Can't jump past verse 120 | FlashList `scrollToIndex` |
| Random daily verse, changes at 3 AM | Pick from the local date, same for everyone |
| Wrong-verse text in the sheet | Exact lookup; "not found" if missing |
| Hard-coded version | Read from `app.json` |
| Duplicate fonts | One fonts folder |
| Bad data shipped | Validator blocks the build |

## Decisions made

- **Package name:** the old app was never on the Play Store, so `com.ethiopic.bible` is reused and there's no store migration.
- **Users of the sideloaded old app:** their highlights and notes live in WebView storage. The new app should import the old app's backup file format (phase 4).
