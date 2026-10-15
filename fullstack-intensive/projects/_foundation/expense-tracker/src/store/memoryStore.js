/**
 * STORE — in-memory implementation of the expense repository.
 *
 * ARCHITECTURE TIP:
 * UI talks to a "store" with a small API (add/list/update/delete…).
 * Later we can add `ApiStore` with the SAME method names and swap one line
 * in the UI bootstrap. That is how you stay upgradeable without a rewrite.
 *
 * CROSS-PLATFORM:
 * This module runs in Node (self-check) and in the browser (if imported).
 */

import {
  applyExpensePatch,
  createExpenseRecord,
  filterByCategory,
  normalizeExpenseInput,
  sortExpenses,
  totalOf,
  totalsByCategory,
} from "../domain/expense.js";

export function createMemoryStore(initial = []) {
  /** @type {import("../domain/expense.js").Expense[]} */
  let items = initial.slice();

  return {
    /** Snapshot for UI/tests — copy so outsiders can't mutate internal array. */
    list() {
      return items.slice();
    },

    add(input) {
      const clean = normalizeExpenseInput(input);
      const expense = createExpenseRecord(clean);
      items.push(expense);
      return expense;
    },

    update(id, patch) {
      const index = items.findIndex((e) => e.id === id);
      if (index === -1) {
        throw new Error(`expense not found: ${id}`);
      }
      const updated = applyExpensePatch(items[index], patch);
      items[index] = updated;
      return updated;
    },

    /**
     * @returns {boolean} true if something was removed
     */
    remove(id) {
      const before = items.length;
      items = items.filter((e) => e.id !== id);
      return items.length < before;
    },

    total() {
      return totalOf(items);
    },

    byCategory(category) {
      return filterByCategory(items, category);
    },

    sorted(field, direction) {
      return sortExpenses(items, field, direction);
    },

    categoryTotals() {
      return totalsByCategory(items);
    },

    /** Replace all items (used when loading from localStorage). */
    replaceAll(next) {
      items = Array.isArray(next) ? next.slice() : [];
    },
  };
}
