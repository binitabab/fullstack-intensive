/**
 * DOMAIN — customer rules (no React).
 * Same idea as P1 expense domain: UI can change; rules stay.
 */

/**
 * @typedef {{ id: string, name: string, email: string, status: "active" | "lead" | "inactive", createdAt: string }} Customer
 */

/**
 * @param {{ name?: string, email?: string, status?: string }} input
 */
export function normalizeCustomerInput(input) {
  const name = typeof input?.name === "string" ? input.name.trim() : "";
  const email = typeof input?.email === "string" ? input.email.trim().toLowerCase() : "";
  const status = input?.status || "lead";

  if (!name) throw new Error("Name is required");
  if (!email || !email.includes("@")) throw new Error("A valid email is required");
  if (!["active", "lead", "inactive"].includes(status)) {
    throw new Error("Status must be active, lead, or inactive");
  }

  return { name, email, status };
}

/**
 * @param {Customer[]} customers
 * @param {{ query?: string, status?: string, sort?: string, page?: number, pageSize?: number }} opts
 */
export function queryCustomers(customers, opts = {}) {
  const query = (opts.query || "").trim().toLowerCase();
  const status = opts.status || "all";
  const sort = opts.sort || "createdAt:desc";
  const page = Math.max(1, opts.page || 1);
  const pageSize = opts.pageSize || 5;

  let rows = customers.slice();

  if (query) {
    rows = rows.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query),
    );
  }

  if (status !== "all") {
    rows = rows.filter((c) => c.status === status);
  }

  const [field, direction] = sort.split(":");
  const dir = direction === "asc" ? 1 : -1;
  rows.sort((a, b) => {
    if (field === "name") return a.name.localeCompare(b.name) * dir;
    return a.createdAt.localeCompare(b.createdAt) * dir;
  });

  const total = rows.length;
  const start = (page - 1) * pageSize;
  const pageRows = rows.slice(start, start + pageSize);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return { rows: pageRows, total, page, pageSize, totalPages };
}

/** @param {Customer[]} customers */
export function customerStats(customers) {
  return {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    leads: customers.filter((c) => c.status === "lead").length,
    inactive: customers.filter((c) => c.status === "inactive").length,
  };
}
