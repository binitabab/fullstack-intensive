# AGENTS.md — BizFlow (single portfolio product)

## What this is

**BizFlow** — one evolving app. Current slice: React UI + **mock API**.  
Next: Express in `server/`, same UI, swap `src/data/mockApi.js` → real HTTP client.

## Stack

- React 19 + Vite 8
- React Router DOM 7
- Plain CSS (no UI kit yet)

## Commands

```bash
npm run dev      # http://localhost:5173
npm run build    # production bundle
npm run preview  # serve dist/
```

## Layout

```
src/domain/     validation / pure rules (no React)
src/data/       mockApi — tomorrow this becomes fetch('/api/...')
src/components/ reusable UI pieces
src/pages/      route screens
src/App.jsx     routes + shell
```

## Conventions

- Components stay presentational where possible; data loads in pages
- Always model loading / error / empty / success
- Validate before calling create/update
- No secrets in repo (none needed here)

## Out of scope (P2)

Auth, real backend, Mongo/Postgres, TypeScript, charts libraries
