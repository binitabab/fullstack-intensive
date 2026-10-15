# How It Works — BizFlow Milestone 2 (Live API)

**Run both sides:**

```bash
cd fullstack-intensive/projects/bizflow
npm run dev
```

- Web: http://127.0.0.1:5173  
- API: http://127.0.0.1:4000  

---

## 1. What languages / tools create what?

| Piece | Language / tool | Creates |
|-------|-----------------|--------|
| UI (same as M1) | HTML + CSS + React/JSX | Screens you click |
| Bundler / proxy | **Vite** | Serves UI; forwards `/api` → Express |
| API server | **Node.js + Express** (JavaScript) | HTTP routes, JSON responses |
| Shared rules | **JavaScript** (`shared/customerValidation.js`) | Same validation on server (and UI form) |
| Process runner | **concurrently** | Starts API + Vite together |

**New terms**

| Term | Meaning |
|------|---------|
| **HTTP** | How browser and server talk (GET/POST + status codes) |
| **REST-ish API** | URLs for resources, e.g. `/api/customers` |
| **JSON** | Data format in request/response bodies |
| **Express** | Popular Node library for routes + middleware |
| **Middleware** | Functions that run on the way in/out (JSON parse, CORS, errors) |
| **CORS** | Browser rule about calling another origin; we use proxy in dev to keep it simple |
| **Proxy** | Vite receives `/api/...` and forwards to Express |
| **Status code** | `200` ok, `201` created, `400` bad input, `500` server bug |
| **In-memory (server)** | Data lives in RAM until process restarts — not a database yet |

---

## 2. Boot sequence

```
npm run dev
  ├─► node server/index.js     → listen :4000
  └─► vite                     → listen :5173 + proxy /api → :4000

Browser loads React app
  → Dashboard useEffect → fetch('/api/customers')
       → Vite proxy → Express GET /api/customers
       → JSON list → stats → StatCards
```

---

## 3. When you click / type — what happens now?

### Open Dashboard

1. React still runs `listCustomers()` (same name as M1).  
2. **New:** that function lives in `src/data/api.js` and calls `fetch('/api/customers')`.  
3. Browser → Vite → Express → `customersStore.listCustomers()`.  
4. JSON returns → React sets state → UI updates.

### Add customer

1. Form validates with shared `normalizeCustomerInput` (client-side fast feedback).  
2. `createCustomer(clean)` → `POST /api/customers` with JSON body.  
3. Express runs **the same** validation again (never trust the client alone).  
4. Store adds row → `201` + customer JSON.  
5. React prepends to list.

### Invalid POST (empty name)

1. Express throws with `status: 400`.  
2. Error middleware returns `{ "error": "Name is required" }`.  
3. `api.js` throws `Error(message)` → form shows it.

---

## 4. File map (where to look)

| Question | File |
|----------|------|
| HTTP routes? | `server/index.js` |
| Server data? | `server/customersStore.js` |
| Shared validation? | `shared/customerValidation.js` |
| Browser → HTTP? | `src/data/api.js` |
| Proxy config? | `vite.config.js` |
| Pages (almost unchanged)? | `src/pages/*.jsx` |

---

## 5. Good shortcut used

Kept **same function names** (`listCustomers`, `createCustomer`) so pages barely changed.  
That is how real apps evolve: swap the *adapter*, not the whole UI.

---

## 6. Honest limits (M2)

- Restarting the API wipes new customers (no Mongo yet).  
- No login — anyone who can hit the API can read/write (auth = M3).  
- Single-machine demo, not production deploy.

---

## Study checklist

- [ ] I can name Express vs Vite vs React roles  
- [ ] I can narrate Add customer through POST → JSON → UI  
- [ ] I know why we validate on the **server** even if the form already checked  
- [ ] I know what the Vite **proxy** avoids  

Quiz anytime: **“quiz me on M2 how-it-works”**
