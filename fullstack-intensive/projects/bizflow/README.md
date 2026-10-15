# BizFlow

**Portfolio product** — one app, grown milestone by milestone.

- Roadmap: [`../../PRODUCT.md`](../../PRODUCT.md)
- GitHub: https://github.com/binitabab/fullstack-intensive

## Current: Milestone 3 — MongoDB + Auth

React UI + Express API + MongoDB. Customers are private per account (JWT httpOnly cookie).

## Setup

```bash
cp .env.example .env   # once
npm install
npm run dev:mongo      # needs Docker + network to pull mongo:7
npm run dev            # API :4000 + web :5173
```

If Docker/Mongo is unavailable, set `USE_MEMORY_DB=1` in `.env` — the API falls back to an in-memory store (auth still works; data resets on restart).

| Service | URL |
|---------|-----|
| Web | http://127.0.0.1:5173 |
| API health | http://127.0.0.1:4000/api/health |

Register a user first — protected routes redirect to `/login`.

## Study

- [`docs/HOW-IT-WORKS-M3.md`](docs/HOW-IT-WORKS-M3.md)
- [`docs/LEARN-MILESTONE-M3.md`](docs/LEARN-MILESTONE-M3.md)
