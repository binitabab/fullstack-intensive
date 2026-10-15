# Architecture — BizFlow (through Milestone 3)

```
Browser (React + AuthContext)
   credentials: include (httpOnly JWT cookie)
        │
        ▼
Vite :5173  proxy /api ──► Express :4000
                              │
                              ├─ /api/auth/*     (register, login, logout, me)
                              ├─ /api/customers  (requireAuth + owner filter)
                              ├─ Mongoose models (User, Customer)
                              └─ MongoDB :27017
```

## Milestone upgrades

| Milestone | Change |
|-----------|--------|
| M1 | mockApi in browser |
| M2 | Express + in-memory store |
| M3 (now) | MongoDB + bcrypt + JWT cookie + per-user customers |
| M4 | Products + Orders |
