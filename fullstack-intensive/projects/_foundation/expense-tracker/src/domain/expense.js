/**
 * DOMAIN LAYER — pure business rules.
 *
 * WHY THIS FILE EXISTS (senior structure):
 * UI will change (HTML → React). Storage will change (memory → API).
 * Validation and totals should NOT be rewritten each time.
 * Keep "what is a valid expense?" in one place = upgradeable + testable.
 *
 * SECURITY / PRIVACY NOTE:
 * This app stores personal spending on the device. No passwords here yet.
 * Still: never trust raw input — treat every field as hostile until validated.
 */

/** @typedef {{ description: string, amount: number, category: string }} ExpenseInput */
/** @typedef {{ id: string, description: string, amount: number, category: string, createdAt: string }} Expense */

/**
 * Normalize + validate user/API input.
 * @param {Partial<ExpenseInput>} input
 * @returns {ExpenseInput}
 */
export function normalizeExpenseInput(input) {
  const description =
    typeof input?.description === "string" ? input.description.trim() : "";
  const category =
    typeof input?.category === "string" ? input.category.trim() : "";

  // Forms often give amount as a string — convert deliberately, don't pretend.
  let amount = input?.amount;
  if (typeof amount === "string" && amount.trim() !== "") {
    amount = Number(amount);
  }

  if (!description) {
    throw new Error("description is required");
  }
  if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
    throw new Error("amount must be a number greater than 0");
  }
  if (!category) {
    throw new Error("category is required");
  }

  return { description, amount, category };
}

/**
 * Build a full expense record (domain factory).
 * @param {ExpenseInput} clean
 * @param {{ createId?: () => string, now?: () => string }} [deps]
 * @returns {Expense}
 */
export function createExpenseRecord(clean, deps = {}) {
  const createId = deps.createId ?? (() => crypto.randomUUID());
  const now = deps.now ?? (() => new Date().toISOString());

  return {
    id: createId(),
    description: clean.description,
    amount: clean.amount,
    category: clean.category,
    createdAt: now(),
  };
}

/**
 * Apply a partial update; re-validate merged result.
 * @param {Expense} existing
 * @param {Partial<ExpenseInput>} patch
 * @returns {Expense}
 */
export function applyExpensePatch(existing, patch) {
  const merged = {
    description:
      patch.description !== undefined ? patch.description : existing.description,
    amount: patch.amount !== undefined ? patch.amount : existing.amount,
    category: patch.category !== undefined ? patch.category : existing.category,
  };
  const clean = normalizeExpenseInput(merged);
  return {
    ...existing,
    description: clean.description,
    amount: clean.amount,
    category: clean.category,
  };
}

/** @param {Expense[]} items */
export function totalOf(items) {
  return items.reduce((sum, e) => sum + e.amount, 0);
}

/**
 * @param {Expense[]} items
 * @param {string} category
 */
export function filterByCategory(items, category) {
  const cat = category.trim().toLowerCase();
  return items.filter((e) => e.category.toLowerCase() === cat);
}

/**
 * Returns a NEW array (does not scramble caller's storage order).
 * @param {Expense[]} items
 * @param {"amount" | "createdAt"} field
 * @param {"asc" | "desc"} [direction]
 */
export function sortExpenses(items, field, direction = "asc") {
  if (field !== "amount" && field !== "createdAt") {
    throw new Error('field must be "amount" or "createdAt"');
  }
  const dir = direction === "desc" ? -1 : 1;
  return items.slice().sort((a, b) => {
    if (field === "amount") {
      return (a.amount - b.amount) * dir;
    }
    return a.createdAt.localeCompare(b.createdAt) * dir;
  });
}

/** Totals grouped by category — useful for dashboards later. */
export function totalsByCategory(items) {
  /** @type {Record<string, number>} */
  const map = {};
  for (const e of items) {
    map[e.category] = (map[e.category] ?? 0) + e.amount;
  }
  return map;
}
