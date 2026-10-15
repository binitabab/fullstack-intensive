# Architecture — BizFlow (through Milestone 2)

```
Browser (React)
   fetch /api/customers
        │
        ▼
Vite dev proxy (:5173) ──► Express (:4000)
                              │
                              ├─ shared/customerValidation.js
                              └─ server/customersStore.js (memory)
```

## Milestone upgrades

| Milestone | Change |
|-----------|--------|
| M1 | mockApi in browser only |
| M2 (now) | Express + `src/data/api.js` |
| M3 | Replace memory store with Mongo; add auth middleware |
| M5 | Postgres for relational core |
