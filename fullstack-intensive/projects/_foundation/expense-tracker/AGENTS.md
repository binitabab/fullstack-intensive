# AGENTS.md — expense-tracker

## What this is

Week-1 training app: track personal expenses in the browser. Domain logic is separate from UI and from storage so we can later swap `localStorage` for an API without rewriting validation.

## Stack

- Vanilla JavaScript (ES modules)
- Browser DOM + `localStorage`
- Node 20+ only for `npm run check` (no framework yet)

## Commands

```bash
npm run check    # domain + memory store self-checks
# UI: open index.html in Chrome (or `npx serve .` if you want a local server)
```

## Layout

```
src/domain/     pure rules (validate, totals) — no DOM, no storage
src/store/      how data is kept (memory now; localStorage adapter for browser)
src/ui/         DOM only — talks to store, never invents business rules
docs/           architecture + learn briefs
scripts/        automated checks runnable in Node
```

## Conventions

- Validate at the domain boundary before writing
- Never commit secrets (none in this app)
- Prefer small functions with clear names
- UI must not duplicate total/filter logic — call domain/store

## Out of scope (v0.1)

Multi-user auth, cloud sync, charts libraries, React (comes next project)
