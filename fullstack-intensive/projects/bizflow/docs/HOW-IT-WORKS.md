# How It Works — BizFlow Milestone 1 (UI + mock API)

**Product:** one app (`projects/bizflow`). This doc = current slice only.  
Study with the app running: `npm run dev` → http://localhost:5173

---

## 1. Languages & tools — what creates what?

| Piece | Language / tool | Creates |
|-------|-----------------|--------|
| Page shell in browser | **HTML** (`index.html`) | Empty `#root` div |
| Look | **CSS** (`src/index.css`) | Layout, colors, table, pills |
| UI structure & behavior | **JavaScript + JSX** (React components) | Buttons, forms, lists that update |
| Bundler / dev server | **Vite** | Serves app, hot-reloads on save, builds `dist/` |
| URL routing | **React Router** | `/` vs `/customers` without full page reload |
| Fake backend | **JavaScript** (`mockApi.js`) | Delayed promises pretending to be HTTP |

**JSX** = JavaScript syntax that looks like HTML inside `.jsx` files.  
Vite + `@vitejs/plugin-react` compiles JSX → normal JavaScript the browser understands.

**React** = library that re-renders UI when **state** changes (instead of you manually rewriting the DOM like in P1 `render()`).

---

## 2. Boot sequence (before any click)

```
Browser loads index.html
  → finds <div id="root">
  → loads main.jsx (via Vite)
       → createRoot(#root).render(<App />)
            → BrowserRouter
                 → Routes match URL
                      → Layout (nav + <Outlet />)
                           → DashboardPage or CustomersPage
```

| Step | File | Language |
|------|------|----------|
| Mount React | `main.jsx` | JS + React API |
| Routes | `App.jsx` | JSX + React Router |
| Chrome (nav) | `Layout.jsx` | JSX |
| First screen | `DashboardPage.jsx` | JSX + hooks |

---

## 3. Core React ideas (minimal)

| Term | Meaning here |
|------|----------------|
| **Component** | Function that returns UI (`function StatCard...`) |
| **props** | Inputs from parent (`<StatCard label="Active" value={3} />`) |
| **state** | Data owned by a component that can change (`useState`) |
| **hook** | Special function starting with `use` (`useState`, `useEffect`, `useMemo`) |
| **useEffect** | “After paint / on mount, run this” — used to load data |
| **useMemo** | Recompute derived values when inputs change (filter/sort/page) |
| **Controlled input** | Input `value` comes from state; `onChange` updates state |

---

## 4. When you do X → what happens?

### A. Open `/` (Dashboard)

1. Router matches `index` route → `DashboardPage`.  
2. `useState` starts as `loading`.  
3. `useEffect` runs `load()` once on mount.  
4. `load()` calls `listCustomers()` (**mockApi**, waits ~450ms).  
5. On success: `customerStats(...)` (domain) → set stats → `status = ready`.  
6. React re-renders → four `StatCard`s appear.  
7. On failure: `ErrorState` + **Try again** calls `load()` again.

**Languages:** JSX for UI, JS for async load + domain math, CSS for cards.

---

### B. Click **Customers** in the nav

1. `NavLink` changes URL to `/customers` (React Router, no full reload).  
2. `Outlet` swaps `DashboardPage` → `CustomersPage`.  
3. Customers page mounts → its own `useEffect` loads customers (same mock API).  
4. Active nav link gets `.active` class (Router + CSS).

---

### C. Type in **Search**

1. `onChange` → `setQuery(...)` + `setPage(1)`.  
2. State change → React re-renders.  
3. `useMemo` runs `queryCustomers(customers, { query, ... })` in **domain**.  
4. `DataTable` receives new `rows` — table updates.  
5. **No network call** — filtering is client-side on already loaded data.

---

### D. Change **Status** or **Sort**

Same pattern as search: update state → `useMemo` → table updates.

---

### E. Click **Next** / **Previous**

1. `setPage(page ± 1)`.  
2. Domain returns the correct slice (`pageSize: 5`).  
3. Table shows that page only; total count stays in the pager text.

---

### F. Submit **Add customer**

1. Form `onSubmit` → `preventDefault` (React synthetic event).  
2. `CustomerForm` validates with `normalizeCustomerInput` (**domain**).  
3. If invalid → show error under form; stop.  
4. If valid → `onCreated(clean)` → parent calls `createCustomer` (**mockApi**, delayed).  
5. Parent `setCustomers([created, ...prev])` → list updates immediately.  
6. Form fields reset.  
7. Page jumps to page 1 so the new row is visible.

---

### G. Practice **ErrorState** (optional)

In Chrome DevTools console on the app origin:

```js
// Only works if you expose mockApi on window — or edit mockApi.forceFail = true in source and save
```

Easiest solid way: temporarily set `forceFail: true` in `src/data/mockApi.js`, save (Vite hot reload), click Try again / reload. Set back to `false`.

---

## 5. Data flow diagram

```
[User event]
    │
    ▼
Component state (useState)
    │
    ├─► domain/customer.js   (filter, sort, page, validate, stats)
    │
    └─► data/mockApi.js      (async list/create — later: real HTTP)
            │
            ▼
     React re-render → components (StatCard, DataTable, …)
            │
            ▼
          CSS paints
```

---

## 6. Where to look when…

| Question | File |
|----------|------|
| What URLs exist? | `App.jsx` |
| Nav + page frame? | `Layout.jsx` |
| Dashboard load? | `DashboardPage.jsx` |
| Search/filter/page? | `CustomersPage.jsx` + `domain/customer.js` |
| Fake server? | `data/mockApi.js` |
| Form validation? | `CustomerForm.jsx` + `domain/customer.js` |
| Table markup? | `DataTable.jsx` |
| Loading/error/empty? | `*State.jsx` components |

---

## 7. Good shortcuts used here

| Choice | Why it’s solid, not fragile |
|--------|------------------------------|
| Mock API with same function names as a future real API | Swap Week 2 without rewriting pages |
| Domain query/validate outside React | Testable; reusable from Node later |
| Four states: loading / error / empty / ready | Production habit; avoids blank broken screens |
| Client-side filter on loaded list | Fine for small data; pagination prepares you for server later |
| Vite | Fast, standard React toolchain |

**Not done (on purpose):** auth, real DB, global state library — would add complexity without teaching the next lesson.

---

## 8. Study checklist

- [ ] I can explain HTML vs CSS vs JSX vs Vite’s job  
- [ ] I can narrate Dashboard load (useEffect → mockApi → stats → StatCards)  
- [ ] I know why search does not call the API again  
- [ ] I know props vs state  
- [ ] I know where validation lives  
- [ ] I know how `/customers` appears without a full page refresh  

Say **“quiz me on P2 how-it-works”** when ready.
