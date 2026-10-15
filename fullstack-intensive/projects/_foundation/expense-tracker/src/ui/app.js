/**
 * UI LAYER — DOM only.
 *
 * READ THIS FILE TO LEARN:
 * - How events connect buttons/forms to behavior
 * - Why we call store methods instead of recalculating totals in HTML
 * - How empty / error states are first-class (reliability)
 *
 * TIME SHORTCUT:
 * Inline event wiring is fine at this size. When this grows, we'd extract
 * render() helpers or move to React components — domain/store stay put.
 */

import { createMemoryStore } from "../store/memoryStore.js";
import { loadExpenses, saveExpenses } from "../store/localStorageAdapter.js";

const store = createMemoryStore(loadExpenses());

const els = {
  form: document.querySelector("#expense-form"),
  description: document.querySelector("#description"),
  amount: document.querySelector("#amount"),
  category: document.querySelector("#category"),
  message: document.querySelector("#message"),
  list: document.querySelector("#expense-list"),
  empty: document.querySelector("#empty-state"),
  total: document.querySelector("#total"),
  filter: document.querySelector("#filter-category"),
  sort: document.querySelector("#sort-by"),
  editingId: document.querySelector("#editing-id"),
  submitBtn: document.querySelector("#submit-btn"),
  cancelEdit: document.querySelector("#cancel-edit"),
};

function persist() {
  saveExpenses(store.list());
}

function setMessage(text, ok = false) {
  els.message.textContent = text || "";
  els.message.classList.toggle("ok", Boolean(ok && text));
}

function clearForm() {
  els.form.reset();
  els.editingId.value = "";
  els.submitBtn.textContent = "Add expense";
  els.cancelEdit.hidden = true;
}

/**
 * Decide which rows to show from filter + sort controls.
 * Domain rules live in the store/domain — UI only orchestrates.
 */
function visibleExpenses() {
  const filter = els.filter.value.trim();
  const [field, direction] = els.sort.value.split(":");

  // No filter → store.sorted uses domain.sortExpenses on a copy.
  if (!filter) {
    return store.sorted(field, direction);
  }

  // Filtered subset: sort a copy so we don't mutate storage order.
  const rows = store.byCategory(filter);
  const dir = direction === "desc" ? -1 : 1;
  return rows.slice().sort((a, b) => {
    if (field === "amount") return (a.amount - b.amount) * dir;
    return a.createdAt.localeCompare(b.createdAt) * dir;
  });
}

function render() {
  const rows = visibleExpenses();
  els.total.textContent = store.total().toFixed(2);
  els.list.innerHTML = "";

  if (rows.length === 0) {
    els.empty.hidden = false;
  } else {
    els.empty.hidden = true;
    for (const expense of rows) {
      const li = document.createElement("li");
      li.className = "item";
      li.innerHTML = `
        <div>
          <strong></strong>
          <div class="meta">
            <span class="badge"></span>
            · <span class="when"></span>
          </div>
        </div>
        <div class="amount"></div>
        <div class="actions">
          <button type="button" class="secondary" data-edit>Edit</button>
          <button type="button" class="danger" data-delete>Delete</button>
        </div>
      `;
      // textContent assignment avoids XSS if descriptions ever contain HTML-like text
      li.querySelector("strong").textContent = expense.description;
      li.querySelector(".badge").textContent = expense.category;
      li.querySelector(".when").textContent = new Date(
        expense.createdAt,
      ).toLocaleString();
      li.querySelector(".amount").textContent = `$${expense.amount.toFixed(2)}`;

      li.querySelector("[data-edit]").addEventListener("click", () => {
        els.editingId.value = expense.id;
        els.description.value = expense.description;
        els.amount.value = String(expense.amount);
        els.category.value = expense.category;
        els.submitBtn.textContent = "Save changes";
        els.cancelEdit.hidden = false;
        setMessage("Editing — save or cancel.", true);
        els.description.focus();
      });

      li.querySelector("[data-delete]").addEventListener("click", () => {
        store.remove(expense.id);
        persist();
        setMessage("Deleted.", true);
        if (els.editingId.value === expense.id) clearForm();
        render();
      });

      els.list.appendChild(li);
    }
  }
}

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  setMessage("");

  const payload = {
    description: els.description.value,
    amount: els.amount.value,
    category: els.category.value,
  };

  try {
    const id = els.editingId.value;
    if (id) {
      store.update(id, payload);
      setMessage("Updated.", true);
    } else {
      store.add(payload);
      setMessage("Added.", true);
    }
    persist();
    clearForm();
    render();
  } catch (err) {
    setMessage(err.message || "Could not save expense");
  }
});

els.cancelEdit.addEventListener("click", () => {
  clearForm();
  setMessage("");
});

els.filter.addEventListener("input", render);
els.sort.addEventListener("change", render);

render();
