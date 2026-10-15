# BizFlow — One Product, Progressive Milestones

**Portfolio rule:** You ship **one** application — **BizFlow**.  
Every milestone adds capability to the same codebase. You do not start a new app each week.

```
projects/bizflow/          ← THE product (always)
projects/_foundation/      ← practice sandboxes (not the portfolio story)
```

---

## What BizFlow is

A small-business operations app for an owner-operator:

- Customers  
- Products / services  
- Orders / bookings  
- Dashboard summaries  
- Auth (from Milestone 3)  
- Real database + deploy (later milestones)

**Not in v1:** multi-tenant SaaS, payments, native mobile, GraphQL.

---

## Milestone map (same repo)

| Milestone | Ships inside `bizflow/` | You can demo | Status |
|-----------|-------------------------|--------------|--------|
| **M1 — UI + mock API** | React shell, dashboard, customers CRUD (mock), loading/error/empty | Clickable business UI | **Done** |
| **M2 — Live API** | Express REST; frontend talks to real HTTP; mock removed/swapped | UI + API on your machine | Next |
| **M3 — Persist + Auth** | MongoDB; register/login; server authorization; your data only | Secure multi-user demo | Planned |
| **M4 — Products + Orders** | Full core loop: customers → products → orders + dashboard counts | End-to-end business story | Planned |
| **M5 — Relational core** | PostgreSQL for core relations (orders/customers/products); migrations | SQL-backed production path | Planned |
| **M6 — Harden & ship** | TypeScript where it pays off; tests; deploy; security checklist | Live URL | Planned |
| **M7 — Portfolio polish** | Case study, README, walkthrough; optional one AI feature | Hire/freelance-ready evidence | Planned |

Each milestone has a **Definition of Done**. We do not jump ahead by abandoning structure.

---

## How progress feels (real app dev)

1. **Vertical slices** — each milestone leaves the app *runnable* and *demoable*.  
2. **Replace, don’t rewrite** — e.g. `mockApi` → `api` client with the same function names.  
3. **Stable folders** — `src/domain`, `src/pages`, later `server/` grows beside the UI.  
4. **One Git history** — portfolio link is a single repo with clear commits per milestone.  
5. **Scope cuts** — if time is short, cut optional UI polish before cutting auth/tests/core journey.

---

## Foundation sandbox (closed)

`projects/_foundation/expense-tracker` taught CRUD, validation, persistence, and layered folders in vanilla JS.  

It is **not** a second product. Keep it for reference; **do not** present it as the main portfolio app.

---

## Active commands (BizFlow)

```bash
cd "/home/benj/Videos/Learning and Building/fullstack-intensive/projects/bizflow"
npm run dev
```

Study current slice: `projects/bizflow/docs/HOW-IT-WORKS.md`

---

## Next concrete step

**Milestone 2:** add `server/` (Express), wire customers to HTTP, delete/disable mock path — still the same BizFlow UI.
