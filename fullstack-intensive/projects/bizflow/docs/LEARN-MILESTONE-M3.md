# BizFlow Milestone 3 — Study brief

## Run

```bash
cd "/home/benj/Videos/Learning and Building/fullstack-intensive/projects/bizflow"
npm run dev
```

Needs Docker for MongoDB.

## Practice

1. Open http://127.0.0.1:5173 → redirected to login  
2. Register a new account (password ≥ 8 chars)  
3. See seeded customers on Dashboard / Customers  
4. Add a customer; refresh — it remains (Mongo)  
5. Log out; register a **second** account — you should **not** see the first account’s data  
6. Log back into the first account — data still there  

## Read

1. `docs/HOW-IT-WORKS-M3.md`  
2. `server/routes/auth.js`  
3. `server/middleware/auth.js`  
4. `src/auth/AuthContext.jsx`  

## Next

**M4:** Products + Orders (full business loop) in the same repo.
