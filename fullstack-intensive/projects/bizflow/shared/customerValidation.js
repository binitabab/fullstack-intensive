/**
 * SHARED validation — used by Express (server) and available to the UI domain.
 * One place for "what is a valid customer?" so UI and API cannot disagree.
 */

/**
 * @param {{ name?: string, email?: string, status?: string }} input
 */
export function normalizeCustomerInput(input) {
  const name = typeof input?.name === "string" ? input.name.trim() : "";
  const email =
    typeof input?.email === "string" ? input.email.trim().toLowerCase() : "";
  const status = input?.status || "lead";

  if (!name) {
    const err = new Error("Name is required");
    err.status = 400;
    throw err;
  }
  if (!email || !email.includes("@")) {
    const err = new Error("A valid email is required");
    err.status = 400;
    throw err;
  }
  if (!["active", "lead", "inactive"].includes(status)) {
    const err = new Error("Status must be active, lead, or inactive");
    err.status = 400;
    throw err;
  }

  return { name, email, status };
}
