# 04 — Phases 0 and 1: what was built

Repository: `ethiobible` (separate from this one). Two commits:

1. **Set up Expo project (phase 0):** Expo SDK 58, React Native 0.88, TypeScript, Expo Router, Jest, ESLint, app identity `com.ethiopic.bible`, GitHub Actions CI.
2. **Bible data pipeline and data layer (phase 1).**

## Data pipeline

```
data/source/*.db.zst               original files from the old APK, never edited
data/fixes/tigrigna-merged-verses.json   74 relabels (85 verses), 7 marked needs-review
data/fixes/daily-verses.json       6 Hebrew → English numbering fixes
data/versification-exceptions.json known, allowed numbering differences
        ▼  npm run data:build
assets/bibles/amharic.db, kjv.db   bundled in the app
build/bibles/*.db                  all 5 (others will be downloads)
src/daily-verse/verses.json        corrected list
        ▼  npm run data:validate
```

New database schema: each verse row stores `label`, `start`, `end`, clean `text`, and `red_spans` (KJV words of Jesus) instead of `@6…@5` markers. Builds are byte-for-byte reproducible, and CI checks the committed databases match the source.

**Validation result:** all 5 Bibles pass; all 1,139 daily verses exist in all 5 Bibles.

Allowed numbering differences (standard between Bible traditions): 3 John 1:15, Revelation 12:18, Song of Songs 6:13/7:1, Hosea 1:10–11/2:1–2, Jonah 1:17/2:1, 2 Corinthians 13:14.

## Needs a human check

A Tigrigna reader should compare these with a printed Tigrigna Bible:

- The 7 `needs-review` relabels in `data/fixes/tigrigna-merged-verses.json`: Leviticus 7:38, Job 34:37, Romans 8:38–39, 1 Corinthians 1:31, Philippians 1:30, 2 Thessalonians 1:12, 2 Timothy 3:17. The verse numbers there look shifted rather than merged.
- Nehemiah 13: the Tigrigna text has a verse 32; most Bibles end at 31.

## Code

| File | Purpose |
|---|---|
| `src/bible/books.ts` | 66 books: code, chapter count, names in English, Amharic, Oromo, Tigrigna |
| `src/bible/repository.ts` | `getChapter`, `findVerse` (exact; never falls back to another verse), book and chapter validation |
| `src/bible/open-bible.ts` | Opens bundled Bibles with expo-sqlite; file names include the data revision |
| `src/bible/translations.ts` | The 5 translations with the old app's display names |
| `src/app/…` | Temporary preview: book list → chapter grid → chapter text with red letters |

## Checks

| Check | Result |
|---|---|
| Unit tests | 43 passed (verified they fail when an expectation is broken) |
| TypeScript | Pass |
| ESLint | Pass |
| Data validation | All 5 Bibles + daily verses pass |
| Android bundle (`expo export`) | Builds; includes amharic.db (7.1 MB) and kjv.db (5.4 MB) |
| On a real phone | Not yet — run `npx expo start` and open in Expo Go |

## Next: phase 2 (reader)

Chapter view with book and chapter pickers, translation switch, font size and line spacing, dark mode, Ethiopic fonts, and saved settings loaded before deep links are handled.
