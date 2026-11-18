# Amharic Bible — project notes

Notes from the Claude Code session of 17 Nov 2026 where the existing Amharic Bible APK was analysed and tested, iOS options were weighed, and the rebuild in React Native (Expo) began.

| Document | What's in it |
|---|---|
| [01-apk-analysis.md](01-apk-analysis.md) | How the old app is built, what was tested, and every bug found, with evidence |
| [02-framework-decision.md](02-framework-decision.md) | Keep Capacitor or rewrite? React Native vs Flutter, and what Expo costs |
| [03-rebuild-plan.md](03-rebuild-plan.md) | The phase-by-phase plan for the rebuild |
| [04-phase-0-1-report.md](04-phase-0-1-report.md) | What was built in phases 0 and 1, and what's next |
| [05-conversation-log.md](05-conversation-log.md) | The conversation, question by question |
| [06-phase-2-report.md](06-phase-2-report.md) | Phase 2: the reader screen |
| [07-phase-3-report.md](07-phase-3-report.md) | Phase 3: links that open a verse |
| [08-phase-4-report.md](08-phase-4-report.md) | Phase 4: highlights, notes, bookmarks, backups |
| [09-phase-5-report.md](09-phase-5-report.md) | Phase 5: home, verse of the day, reminders |
| [10-restyle-report.md](10-restyle-report.md) | Restyle to match the original app's look |
| [11-phase-6-report.md](11-phase-6-report.md) | Phase 6: search and reading plans |
| [12-phase-7-report.md](12-phase-7-report.md) | Phase 7: cross-references, Strong's numbers, downloads, parallel reading, verse images |
| [13-phase-8-report.md](13-phase-8-report.md) | Phase 8: red letters in Amharic, a smaller settings sheet, fonts, pinch to zoom, keeping the screen on |
| [14-phase-9-report.md](14-phase-9-report.md) | Phase 9: the old app's 8 themes in light and dark, and the system bars, alerts and splash following the theme |

**Old app:** `com.ethiopic.bible` v1.0.4, Capacitor (React web app inside an Android WebView). Never published on the Play Store.
**New app:** separate repository `holy-bible-et` (Expo SDK 58, React Native, TypeScript).
