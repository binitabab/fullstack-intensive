# AGENTS.md — BizFlow

## Current milestone

**M3 — MongoDB + cookie JWT auth** (customers owned per user).

## Stack

- React 19 + Vite 8 + React Router 7
- Express 5 + Mongoose + MongoDB 7 (Docker)
- bcryptjs, jsonwebtoken, cookie-parser, dotenv

## Commands

```bash
npm run dev:mongo   # docker compose up -d mongo
npm run dev         # mongo + API :4000 + web :5173
npm run build
```

Copy `.env.example` → `.env` (never commit `.env`).

## Layout

```
docker-compose.yml
shared/                 shared validation
server/
  models/               User, Customer
  middleware/           auth, errors
  routes/               auth, customers
src/auth/               AuthContext
src/data/api.js         fetch + credentials
```

## Security conventions

- Hash passwords; never store plaintext
- httpOnly cookie for JWT
- Filter customers by `owner` on the server
- No secrets in git

## Next

M4 Products + Orders
