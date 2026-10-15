import { useState } from "react";
import { normalizeCustomerInput } from "../domain/customer.js";

/**
 * Controlled form: React state is the source of truth for input values.
 * onCreated(customer) — parent refreshes list after success.
 */
export function CustomerForm({ onCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("lead");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      // Validate first (fast fail) before hitting mock API
      const clean = normalizeCustomerInput({ name, email, status });
      await onCreated(clean);
      setName("");
      setEmail("");
      setStatus("lead");
    } catch (err) {
      setError(err.message || "Could not create customer");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit} noValidate>
      <h2>Add customer</h2>
      <div className="form-grid">
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="lead">Lead</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </div>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <button className="btn" type="submit" disabled={saving}>
        {saving ? "Saving…" : "Add customer"}
      </button>
    </form>
  );
}
