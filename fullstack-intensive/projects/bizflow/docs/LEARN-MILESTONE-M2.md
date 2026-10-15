# BizFlow Milestone 2 — Study brief (Live API)

## Run

```bash
cd "/home/benj/Videos/Learning and Building/fullstack-intensive/projects/bizflow"
npm run dev
```

Open http://127.0.0.1:5173 — both API and UI must be running (one command).

## Read

1. `docs/HOW-IT-WORKS-M2.md`  
2. `server/index.js`  
3. `src/data/api.js`  
4. `shared/customerValidation.js`  

## Practice

1. Load dashboard (watch Network tab: `/api/customers`)  
2. Add a customer; confirm it appears  
3. Stop the API terminal (`Ctrl+C` on that process / stop `npm run dev`) and reload — see error UI  
4. Start again; data resets to seed (in-memory)

## Next product slice

**M3:** MongoDB persistence + auth (same BizFlow repo).
