# AGENTS.md — BizFlow (single portfolio product)

## What this is

**BizFlow** — evolving small-business operations app.  
**Current:** Milestone 2 — React UI + **Express live API** (in-memory data).  
**Next:** Milestone 3 — MongoDB + auth.

## Stack

- React 19 + Vite 8 + React Router 7
- Express 5 + cors
- Shared validation in `shared/`

## Commands

```bash
npm run dev       # API :4000 + web :5173 (proxy /api)
npm run dev:api   # API only
npm run dev:web   # Vite only (needs API running)
npm run build     # frontend production build
npm start:api     # API only (alias)
```

## Layout

```
shared/           rules used by API (+ re-exported to UI domain)
server/           Express app + in-memory store
src/data/api.js   fetch client (same names as old mock)
src/pages/        route screens
src/components/   reusable UI
docs/             HOW-IT-WORKS per milestone
```

## Conventions

- Validate on the server; never trust the client alone
- Keep `listCustomers` / `createCustomer` names stable across adapters
- No secrets in git
- Four UI states: loading / error / empty / ready

## Out of scope (until later milestones)

Auth, Mongo/Postgres, payments, TypeScript (M6)
