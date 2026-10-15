/**
 * PERSISTENCE ADAPTER — browser only.
 *
 * TIP — strategic shortcut vs future upgrade:
 * localStorage is fast to ship for a single-user prototype.
 * It is NOT multi-device sync, NOT secure against other users on the same
 * machine profile, and NOT suitable for real money/banking apps.
 *
 * Upgrade path: keep saving via `save(store.list())` after mutations;
 * later replace body of save/load with `fetch('/api/expenses')`.
 *
 * PRIVACY: data stays in this browser profile. Clearing site data wipes it.
 */

const KEY = "expense-tracker:v1:expenses";

/**
 * @returns {import("../domain/expense.js").Expense[]}
 */
export function loadExpenses() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Light shape check — full validation can be added when we harden.
    return parsed.filter(
      (e) =>
        e &&
        typeof e.id === "string" &&
        typeof e.description === "string" &&
        typeof e.amount === "number" &&
        typeof e.category === "string" &&
        typeof e.createdAt === "string",
    );
  } catch {
    // Corrupt JSON: fail safe to empty rather than crash the UI.
    console.warn("localStorage data corrupt; starting empty");
    return [];
  }
}

/** @param {import("../domain/expense.js").Expense[]} expenses */
export function saveExpenses(expenses) {
  localStorage.setItem(KEY, JSON.stringify(expenses));
}

export function storageKey() {
  return KEY;
}
