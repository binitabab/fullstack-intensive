# 42-Day Schedule

**Single product:** all days grow **BizFlow** (`projects/bizflow`). See `PRODUCT.md`.  
Foundation sandbox days (vanilla JS) are closed — do not start new apps.

**Budget:** ~5–7 hrs/day (30–40 hrs/week). **Sustainable mode:** 4 hrs/day — skip Optional columns first.  
**Docs to prefer:** MDN, React.dev, Node.js, Express, MongoDB, PostgreSQL, TypeScript, Next.js official docs.

Legend: **Must** = required for gate | **Should** = strong | **Opt** = early-finish only

---

## Week 1 — JS diagnostic, fundamentals, React start (~35 hrs)

| Day | Objective | Study | Practice (Must) | Opt | Acceptance | Review Q |
|-----|-----------|-------|-----------------|-----|------------|----------|
| 1 | Diagnose JS; arrays/objects | Diagnostic; array methods | Complete diagnostic; start Expense Tracker core | — | Diagnostic submitted; tracker add/list works | What does `map` return? |
| 2 | Functions, scope, modules | Closures intro; ES modules | Edit/delete; categories; validation | Filter UI polish | CRUD + validation | Explain scope bug |
| 3 | Async + fetch | Promises, async/await, errors | Fetch mock API; handle errors | AbortController | Loading/error states | Why await? |
| 4 | React setup + components | Vite React; props/state | Dashboard shell + ExpenseCard | CSS polish | Renders list from state | Props vs state |
| 5 | Forms + controlled inputs | Controlled components | Add expense form in React | — | Form updates state | Controlled input |
| 6 | Effects + lists | useEffect; keys | Persist to localStorage; filter/sort | Pagination | Persists after refresh | When useEffect runs |
| 7 | Week 1 gate | — | Timed challenge: filter+total without AI paste | Portfolio screenshot | Gate pass criteria | Self-score mastery |

**Week 1 gate:** Build expense list with add/edit/delete, category filter, total, localStorage — explain code aloud or in writing.

---

## Week 2 — React architecture + Express (~35 hrs)

| Day | Objective | Study | Practice | Opt | Acceptance |
|-----|-----------|-------|----------|-----|------------|
| 8 | Routing + layout | React Router | Dashboard routes | — | Nav works |
| 9 | UI states + reusable table | Empty/loading/error | BizFlow customers table (mock) | A11y labels | All 4 states |
| 10 | Node + HTTP | HTTP methods/status | Express hello + logger | — | Returns JSON |
| 11 | REST design | Resources, status codes | CRUD routes (in-memory) | OpenAPI sketch | Postman/Thunder collection |
| 12 | Middleware + validation | Central errors | Validate body; 400/404 | Rate limit stub | Bad input rejected |
| 13 | Connect React ↔ API | CORS, fetch | Dashboard loads API data | — | End-to-end mock |
| 14 | Week 2 gate | — | Add one endpoint + UI without hints | — | Documented routes |

---

## Week 3 — MongoDB + MERN BizFlow (~35–40 hrs)

| Day | Objective | Practice | Acceptance |
|-----|-----------|----------|------------|
| 15 | Mongo model + Mongoose | Customers/Products schemas | CRUD persists |
| 16 | Embed vs reference | Orders referencing products | Justify model |
| 17 | Auth register/login | bcrypt + JWT | Tokens issued safely |
| 18 | Authorization | Protect routes; ownership | Unauthorized blocked |
| 19 | Frontend auth + protected routes | Login flow | Secure UX |
| 20 | Search/filter/pagination + tests | Critical route tests | Tests pass |
| 21 | Week 3 gate | Full journey: register → CRUD → logout | README + model doc |

---

## Week 4 — PostgreSQL + PERN slice (~35 hrs)

| Day | Objective | Practice | Acceptance |
|-----|-----------|----------|------------|
| 22 | SQL fundamentals | SELECT/INSERT/UPDATE/DELETE | Exercise set done |
| 23 | Schema design | customers, products, orders FKs | ER + constraints |
| 24 | Joins + aggregations | Dashboard SQL | Correct totals |
| 25 | Migrations + `pg` | Migration files | Reproducible schema |
| 26 | Transactions | Create order + stock adjust | Atomic success/fail |
| 27 | PERN API slice | Port one feature from Mongo | Same acceptance as MERN feature |
| 28 | Week 4 gate | Explain Mongo vs Postgres for BizFlow | Working PERN slice |

---

## Week 5 — TypeScript, Next intro, test, deploy (~35 hrs)

| Day | Objective | Practice | Acceptance |
|-----|-----------|----------|------------|
| 29 | TS basics | Annotate domain types | Compiles |
| 30 | TS + React + API types | Type props + responses | No `any` abuse |
| 31 | Next.js fundamentals | App router, server vs client concept | Small Next page or migration note |
| 32 | Testing deeper | Unit + integration | Critical paths covered |
| 33 | Security checklist | Env, CORS, headers review | Checklist signed |
| 34 | Deploy | Deploy API + frontend | Live URL or verified runbook |
| 35 | Week 5 gate | Hit deployed health + login | Deploy docs |

---

## Week 6 — Capstone, portfolio, career (~35 hrs)

| Day | Objective | Practice | Acceptance |
|-----|-----------|----------|------------|
| 36 | Capstone stabilize | Fix bugs; edge cases | Core journeys green |
| 37 | Polish + docs | Case study draft | Screenshots + architecture |
| 38 | Optional AI **or** deepen tests | One AI feature **or** e2e tests | Measured usefulness |
| 39 | Interview drills | JS/React/HTTP/SQL Qs | Written answers |
| 40 | Upwork lab | Evaluate 5 posts; 1 proposal draft | Suitability labels |
| 41 | Final assessment | Timed practical | Rubric scored |
| 42 | Retrospective | Skills gap + 30-day plan | Continuity closed |

---

## Schedule adjustment rules

- Behind → cut Opt, shrink UI polish, keep auth/tests/SQL.  
- Ahead → more tests, edge cases, second job-post analysis — **not** new frameworks.  
- Mid-program market re-check: Days 21 and 40.
