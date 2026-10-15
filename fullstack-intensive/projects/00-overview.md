# Product & milestone specs — BizFlow only

**Single portfolio app:** [`bizflow/`](bizflow/)  
**Roadmap:** [`../PRODUCT.md`](../PRODUCT.md)

Target user: owner-operator managing customers, products/services, and orders.  
Out of scope for v1: multi-tenant SaaS, payments, mobile apps, GraphQL.

Engineering workflow each milestone: Scope → Audit → Architect → Develop → Test → Check → Document → Sync.

---

## Milestone 1 — UI + mock API (done)

**Repo:** `bizflow/`  
**Ships:** Layout, dashboard stats, customers (search/filter/sort/pagination), add form, four UI states, mock API.

---

## Milestone 2 — Live API (next)

**Same repo.** Add Express backend; replace mock with `fetch` to `/api/customers`.  
App remains runnable end-to-end on localhost.

---

## Milestone 3 — Persist + Auth

MongoDB persistence; register/login; protect routes; ownership checks.

---

## Milestone 4 — Products + Orders

CRUD products; create orders linking customers + products; dashboard counts from real data.

---

## Milestone 5 — PostgreSQL core

Relational schema for customers/products/orders; migrations; transactions; document Mongo vs SQL choices. Prefer Postgres for the shipped default if time forces one DB.

---

## Milestone 6 — Harden & ship

TypeScript where valuable; automated tests; deploy; security checklist; API docs; README.

---

## Milestone 7 — Portfolio polish

Case study; walkthrough; optional one AI feature (only if core is green).

---

## Foundation (not portfolio)

[`_foundation/expense-tracker`](_foundation/expense-tracker/) — closed skills sandbox. Reference only.
