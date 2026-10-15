import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listCustomers } from "../data/api.js";
import { customerStats } from "../domain/customer.js";
import { StatCard } from "../components/StatCard.jsx";
import { LoadingState } from "../components/LoadingState.jsx";
import { ErrorState } from "../components/ErrorState.jsx";

/**
 * Dashboard loads data once on mount (useEffect).
 * Four UI states: loading → error | success (with stats).
 */
export function DashboardPage() {
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);

  async function load() {
    setStatus("loading");
    setError("");
    try {
      const customers = await listCustomers();
      setStats(customerStats(customers));
      setStatus("ready");
    } catch (err) {
      setError(err.message || "Failed to load");
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Snapshot of your customer pipeline</p>
        </div>
        <Link className="btn btn-secondary" to="/customers">
          Manage customers
        </Link>
      </div>

      {status === "loading" ? <LoadingState label="Loading dashboard…" /> : null}
      {status === "error" ? (
        <ErrorState message={error} onRetry={load} />
      ) : null}
      {status === "ready" && stats ? (
        <div className="stat-grid">
          <StatCard label="Customers" value={stats.total} hint="All records" />
          <StatCard label="Active" value={stats.active} hint="Paying / engaged" />
          <StatCard label="Leads" value={stats.leads} hint="Needs follow-up" />
          <StatCard label="Inactive" value={stats.inactive} hint="Re-engage later" />
        </div>
      ) : null}
    </section>
  );
}
