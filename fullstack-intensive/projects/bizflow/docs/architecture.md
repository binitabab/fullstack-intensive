# Architecture — BizFlow Dashboard P2

```
URL ──► App (Routes)
          └── Layout (nav + Outlet)
                ├── DashboardPage ──► mockApi.listCustomers ──► domain.customerStats
                └── CustomersPage ──► mockApi + domain.queryCustomers
                      ├── CustomerForm (validate → create)
                      ├── DataTable
                      └── Loading / Error / Empty states
```

## Upgrade to Week 2 (Express)

Keep page components. Change `src/data/mockApi.js` (or add `src/data/api.js`) to:

```js
export async function listCustomers() {
  const res = await fetch("http://localhost:PORT/api/customers");
  if (!res.ok) throw new Error("Failed to load");
  return res.json();
}
```

Same exports → minimal UI churn.
