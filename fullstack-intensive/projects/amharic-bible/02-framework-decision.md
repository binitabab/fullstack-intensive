# 02 — iOS and the framework decision

## Could the old app go to iOS as-is?

Yes. Capacitor builds Android and iOS from the same web code, and the config already had an `ios` section. The work would be adding the iOS platform, building in Xcode, and rewriting the widget in Swift (iOS widgets are native in every framework). Performance was fine and none of the bugs were framework problems.

**Rewrite when:** the source code is lost, you want a truly native feel, or the app is a learning project. The source code isn't available (only the APK), so a rebuild was chosen.

## Can the APK be fixed without source code?

- **Easy:** data files (Tigrigna verses, daily-verse list) can be edited inside the APK.
- **Risky:** JavaScript bugs mean patching minified code, and the fix is lost on the next build.
- **Signing:** a modified APK must be re-signed. A test key works for sideloading; store updates need the original release key.

## React Native vs Flutter

| Aspect | React Native (Expo) | Flutter | Winner |
|---|---|---|---|
| Your existing skills | Same React and JavaScript | New language (Dart) | **React Native** |
| Reusing the current app | Logic carries over | Everything rewritten; data reused | **React Native** |
| Raw performance | Very good | Excellent | Flutter (slightly) |
| Identical look on both phones | Native controls differ slightly | Draws everything itself | Flutter |
| Ethiopic (Ge'ez) text | Phone's text system | Bundled fonts | Tie |
| Offline SQLite | `expo-sqlite` | `sqflite` | Tie |
| Home-screen widget | Native Swift/Kotlin needed | Native Swift/Kotlin needed | Tie |
| Bug fixes without store review | Built in (EAS Update) | Paid third party (Shorebird) | **React Native** |
| iOS builds without a Mac | Expo cloud builds | Codemagic, more setup | React Native |
| Web version later | Good | Weak for text-heavy sites | React Native |
| Career | Web and mobile | Mobile-focused | React Native |
| Learning curve | Low | Medium to high | React Native |

**Decision: React Native with Expo + TypeScript + expo-sqlite**, reusing the existing Bible databases. Over-the-air fixes matter most for a Bible app, where wrong scripture is the worst kind of bug.

## Costs

| Item | Cost | Notes |
|---|---|---|
| Expo framework and Expo Go | Free | Open source |
| EAS cloud builds | Free tier | A limited number of builds per month; enough for a solo developer |
| EAS Update (over-the-air fixes) | Free tier | Free up to a monthly active-user limit; paid plan only if the app grows large |
| Apple Developer account | $99/year | Needed only when publishing to iOS |
| Google Play account | $25 once | Not paid yet; needed only when publishing to Android |
| Mac | Not required | Expo builds iOS in the cloud |

Expo's exact free-tier limits change; check expo.dev/pricing before relying on them. Android builds can also be made locally for free.
