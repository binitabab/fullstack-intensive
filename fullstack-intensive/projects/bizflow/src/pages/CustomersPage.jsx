import { useEffect, useMemo, useState } from "react";
import { createCustomer, listCustomers } from "../data/api.js";
import { queryCustomers } from "../domain/customer.js";
import { CustomerForm } from "../components/CustomerForm.jsx";
import { DataTable } from "../components/DataTable.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { ErrorState } from "../components/ErrorState.jsx";
import { LoadingState } from "../components/LoadingState.jsx";

const COLUMNS = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  {
    key: "status",
    header: "Status",
    render: (row) => <span className={`pill pill-${row.status}`}>{row.status}</span>,
  },
  {
    key: "createdAt",
    header: "Added",
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
];

export function CustomersPage() {
  const [loadState, setLoadState] = useState("loading");
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState([]);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("createdAt:desc");
  const [page, setPage] = useState(1);

  async function load() {
    setLoadState("loading");
    setError("");
    try {
      const data = await listCustomers();
      setCustomers(data);
      setLoadState("ready");
    } catch (err) {
      setError(err.message || "Failed to load customers");
      setLoadState("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Recompute visible page whenever filters or data change (no extra network)
  const result = useMemo(
    () => queryCustomers(customers, { query, status, sort, page, pageSize: 5 }),
    [customers, query, status, sort, page],
  );

  // If filters shrink results, keep page in range
  useEffect(() => {
    if (page > result.totalPages) setPage(result.totalPages);
  }, [page, result.totalPages]);

  async function handleCreated(clean) {
    const created = await createCustomer(clean);
    setCustomers((prev) => [created, ...prev]);
    setPage(1);
  }

  return (
    <section className="customers-page">
      <div className="page-head">
        <div>
          <h1>Customers</h1>
          <p className="muted">Search, filter, sort, and add records</p>
        </div>
      </div>

      <CustomerForm onCreated={handleCreated} />

      <div className="card">
        <div className="toolbar">
          <label>
            Search
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Name or email"
            />
          </label>
          <label>
            Status
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="lead">Lead</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          <label>
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="createdAt:desc">Newest</option>
              <option value="createdAt:asc">Oldest</option>
              <option value="name:asc">Name A–Z</option>
              <option value="name:desc">Name Z–A</option>
            </select>
          </label>
        </div>

        {loadState === "loading" ? <LoadingState label="Loading customers…" /> : null}
        {loadState === "error" ? <ErrorState message={error} onRetry={load} /> : null}

        {loadState === "ready" && result.total === 0 ? (
          <EmptyState
            title="No customers match"
            message="Try clearing search/filter, or add a new customer above."
          />
        ) : null}

        {loadState === "ready" && result.total > 0 ? (
          <>
            <DataTable columns={COLUMNS} rows={result.rows} />
            <div className="pager">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={result.page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </button>
              <span className="muted">
                Page {result.page} of {result.totalPages} · {result.total} total
              </span>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={result.page >= result.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
