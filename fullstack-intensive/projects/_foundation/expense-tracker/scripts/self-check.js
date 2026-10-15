/**
 * Node self-check — proves domain + memory store without a browser.
 * Run: npm run check
 */

import { createMemoryStore } from "../src/store/memoryStore.js";
import {
  normalizeExpenseInput,
  totalOf,
  filterByCategory,
  sortExpenses,
} from "../src/domain/expense.js";

function assert(name, condition) {
  if (!condition) {
    console.error(`FAIL  ${name}`);
    process.exitCode = 1;
    return;
  }
  console.log(`PASS  ${name}`);
}

// Domain validation
let threw = false;
try {
  normalizeExpenseInput({ description: "  ", amount: 1, category: "food" });
} catch {
  threw = true;
}
assert("rejects blank description", threw);

threw = false;
try {
  normalizeExpenseInput({ description: "x", amount: "nope", category: "food" });
} catch {
  threw = true;
}
assert("rejects non-numeric amount", threw);

assert(
  "coerces numeric string amount",
  normalizeExpenseInput({ description: "Tea", amount: "3.5", category: "food" })
    .amount === 3.5,
);

// Store CRUD
const store = createMemoryStore();
const a = store.add({ description: "Coffee", amount: 4.5, category: "food" });
store.add({ description: "Bus", amount: 2, category: "transport" });
assert("list length 2", store.list().length === 2);
assert("total 6.5", store.total() === 6.5);

store.update(a.id, { amount: 5 });
assert("update amount", store.list().find((e) => e.id === a.id).amount === 5);
assert("total after update 7", store.total() === 7);

assert("filter food", store.byCategory("FOOD").length === 1);
assert(
  "sort amount asc",
  store.sorted("amount", "asc")[0].category === "transport",
);

assert("delete works", store.remove(a.id) === true);
assert("delete missing is false", store.remove("nope") === false);
assert("one left", store.list().length === 1);

// Pure helpers still work on plain arrays
const sample = [
  { id: "1", description: "a", amount: 10, category: "x", createdAt: "2026-01-02" },
  { id: "2", description: "b", amount: 3, category: "y", createdAt: "2026-01-01" },
];
assert("totalOf", totalOf(sample) === 13);
assert("filterByCategory", filterByCategory(sample, "y").length === 1);
assert(
  "sortExpenses createdAt",
  sortExpenses(sample, "createdAt", "asc")[0].id === "2",
);

if (process.exitCode) {
  console.error("\nSelf-check failed.");
} else {
  console.log("\nAll checks passed.");
}
