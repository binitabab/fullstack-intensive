# Architecture — Expense Tracker v0.1

```
┌─────────────────┐
│  index.html     │  structure only
│  src/ui/app.js  │  events + render (no business math)
└────────┬────────┘
         │ calls
┌────────▼────────┐
│  memoryStore    │  repository API: add/list/update/remove/…
└────────┬────────┘
         │ uses
┌────────▼────────┐
│  domain/expense │  validate, total, filter, sort (pure)
└─────────────────┘

Browser persistence:
  ui → saveExpenses(store.list()) → localStorage
  boot → loadExpenses() → createMemoryStore(data)
```

## Why this shape?

| Choice | Reason |
|--------|--------|
| Domain separate from UI | React later won’t force rewriting validation |
| Store interface | Swap localStorage for HTTP API later |
| `textContent` in UI | Reduces XSS risk vs raw `innerHTML` for user text |
| Versioned storage key `v1` | Future migrations without clobbering blindly |
| No framework yet | Learn fundamentals; add Vite/React in P2 |

## Known limitations (honest)

- Single browser profile only  
- Anyone with access to your OS user can read localStorage  
- No sync across devices  
- No auth  

These are **scope** decisions for a Week-1 prototype, not forgotten security.
