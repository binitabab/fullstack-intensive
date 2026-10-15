# How It Works — Every click, every language, every step

Study this with the app open at http://localhost:3456 (or `npx --yes serve .`).

---

## 1. What language creates what?

The page is **three languages working together**. None replaces the others.

| Language | File(s) | What it creates | What it does *not* do |
|----------|---------|-----------------|------------------------|
| **HTML** | `index.html` | Structure: boxes, form fields, buttons, empty list | Does not calculate totals or save data |
| **CSS** | `src/ui/styles.css` | Look: colors, spacing, layout on phone/desktop | Does not decide business rules |
| **JavaScript** | `src/ui/app.js`, `src/store/*`, `src/domain/*` | Behavior: react to clicks, validate, save, redraw list | Does not draw the basic page skeleton (HTML does) |

**How they connect on load**

1. Browser reads `index.html` (HTML) → builds the **DOM** (tree of elements on screen).  
2. HTML line `<link rel="stylesheet" href="./src/ui/styles.css" />` loads **CSS** → paints layout.  
3. HTML line `<script type="module" src="./src/ui/app.js"></script>` loads **JavaScript** → JS finds elements and attaches **event listeners** (instructions for “when X happens, do Y”).

**Analogy:** HTML = furniture placement, CSS = paint and lighting, JavaScript = what happens when you press a switch.

---

## 2. Good “shortcuts” (what we mean)

A **good shortcut** = the smallest solid design that stays safe and upgradeable.

| Good (do this) | Bad (we avoid calling this a shortcut) |
|----------------|----------------------------------------|
| Split domain / store / UI early (small files, clear jobs) | One giant file that mixes validation + HTML strings forever |
| Validate once in domain | Skip validation “to move fast” |
| `textContent` for user text | Dump user text into `innerHTML` (XSS risk) |
| Versioned `localStorage` key | Random keys, no migration plan |
| Same store API so API swap is later possible | Hard-code `localStorage` inside every button handler |
| Vanilla JS for Week 1 learning | Fake “full SaaS” with insecure auth |

**Rule:** small ≠ weak. Small + clear boundaries = strong.

---

## 3. Boot sequence — what happens before you click anything

```
Browser opens index.html
        │
        ├─► Parses HTML → form, inputs, empty <ul>, total span exist
        ├─► Applies CSS
        └─► Runs app.js as an ES module
                │
                ├─► import createMemoryStore, loadExpenses, saveExpenses
                ├─► loadExpenses() reads localStorage key expense-tracker:v1:expenses
                │       • if empty → []
                │       • if JSON array → restore expenses
                ├─► createMemoryStore(those expenses) → `store` object in memory
                ├─► document.querySelector(...) → cache DOM nodes in `els`
                ├─► addEventListener on form, cancel, filter, sort
                └─► render() once → draw list + total from store
```

**Languages in this phase**

| Step | Language |
|------|----------|
| Page skeleton | HTML |
| Styling | CSS |
| Load/save/restore + first paint of list | JavaScript |

---

## 4. Interaction map — when you do X, what runs?

### A. You type in Description / Amount / Category

| What you do | What happens | Language |
|-------------|--------------|----------|
| Type characters | Browser updates the input’s `.value` | Browser + HTML inputs |
| Nothing else yet | No save until submit | — |

**How:** The inputs are plain HTML `<input>`. JS has not run business logic yet; it will read `.value` on submit.

---

### B. You click **Add expense** (or press Enter in the form)

This fires a **`submit`** event on `#expense-form`.

**Exact how (step by step):**

1. **Browser** creates a submit event (HTML form behavior).  
2. **JavaScript** listener in `app.js` runs:
   ```js
   els.form.addEventListener("submit", (event) => { ... })
   ```
3. `event.preventDefault()` — **stops** the browser’s default “reload the page / send to a server.”  
   Without this, your SPA-like page would refresh and feel broken.  
4. Clear the message line.  
5. Build a **payload** object from the three inputs (still strings from the form):
   ```js
   { description, amount, category }
   ```
6. Read hidden field `#editing-id`:
   - **empty** → this is a **create** → `store.add(payload)`  
   - **has id** → this is an **update** → `store.update(id, payload)`  
7. Inside `store.add` / `store.update` (**JavaScript**, `memoryStore.js`):
   - calls **domain** `normalizeExpenseInput` — trims text, converts amount string→number, throws if invalid  
   - create or patch the expense object (with `id`, `createdAt` on create)  
   - updates the in-memory array  
8. `persist()` → `saveExpenses(store.list())` → **JSON.stringify** → `localStorage.setItem` (**JavaScript** Web API).  
9. `clearForm()` — reset fields, button label back to “Add expense”.  
10. `render()` — rebuild the list HTML and total on screen.  
11. If domain threw (bad amount, empty description): `catch` shows error in `#message` — **nothing** saved.

**Languages:** HTML (form/button) → JavaScript (listener, validation, storage, redraw) → CSS already applied to new list items via classes.

**What got created:** a data **object** in memory + a JSON string in **localStorage** + new **DOM nodes** (`<li>`) for the row.

---

### C. You click **Edit** on a row

**How:**

1. That button was created in `render()` with `data-edit`.  
2. A **click** listener (attached when the row was built) runs.  
3. JS copies that expense into the form fields and sets `#editing-id` to the expense’s `id`.  
4. Submit button text becomes “Save changes”; Cancel appears.  
5. **No save yet** — only the form is prepared.

**Languages:** HTML button (created by JS) + JavaScript click handler.

**When you then click Save changes:** same path as **B**, but `editing-id` is set → `store.update`.

---

### D. You click **Cancel** (while editing)

**How:**

1. `click` on `#cancel-edit`.  
2. `clearForm()` — wipes editing id, resets inputs, hides Cancel.  
3. Message cleared.  
4. Store and localStorage **unchanged**.

---

### E. You click **Delete** on a row

**How:**

1. `click` on the row’s delete button.  
2. `store.remove(expense.id)` — filters that id out of the memory array.  
3. `persist()` — rewrite localStorage with the shorter list.  
4. If you were editing that same id → form clears.  
5. `render()` — row disappears; total updates.

**Languages:** JavaScript only for logic; HTML list updates via DOM APIs.

---

### F. You type in **Filter by category**

**How:**

1. Each keystroke fires **`input`** on `#filter-category`.  
2. Listener calls `render()` only (does not change stored data).  
3. `visibleExpenses()` asks `store.byCategory(filter)` (domain compare, case-insensitive).  
4. List shows a subset; **Total still shows all expenses** (`store.total()`), not only filtered — deliberate: total = whole wallet; filter = view.  
   *(If you later want “filtered total,” that is a product decision — easy to add in domain.)*

---

### G. You change **Sort**

**How:**

1. **`change`** event on `#sort-by`.  
2. Value like `"amount:desc"` is split into field + direction.  
3. `render()` → `visibleExpenses()` → domain `sortExpenses` on a **copy** (storage order stays stable).  
4. List reorders on screen only.

---

### H. You refresh the page (F5)

**How:**

1. All JS memory is wiped.  
2. Boot sequence runs again (section 3).  
3. `loadExpenses()` reads localStorage → store refilled → `render()` shows the same data.

**That is persistence.** Without localStorage, refresh would show an empty app.

---

## 5. Data shape — what an expense “is”

Created in **JavaScript** as an object, then stored as **JSON** text:

```json
{
  "id": "uuid-string",
  "description": "Coffee",
  "amount": 4.5,
  "category": "food",
  "createdAt": "2026-10-15T13:53:50.029Z"
}
```

| Field | Who creates it | How |
|-------|----------------|-----|
| `id` | Domain `createExpenseRecord` | `crypto.randomUUID()` |
| `description` / `category` | You type → domain trims | Validation |
| `amount` | You type string → domain `Number(...)` | Must be > 0 |
| `createdAt` | Domain | `new Date().toISOString()` |

---

## 6. File → responsibility (how to find “where does X happen?”)

| If you wonder… | Open this file |
|----------------|----------------|
| What fields exist on the page? | `index.html` |
| Why does it look like this? | `src/ui/styles.css` |
| What runs on click/submit? | `src/ui/app.js` |
| How is add/update/delete stored in RAM? | `src/store/memoryStore.js` |
| How does refresh keep data? | `src/store/localStorageAdapter.js` |
| What makes input valid/invalid? | `src/domain/expense.js` |
| How do we prove it without clicking? | `scripts/self-check.js` |

---

## 7. End-to-end diagram (Add expense)

```
[You click Add]
      │
      ▼
HTML form submit event
      │
      ▼
JS app.js listener → preventDefault
      │
      ▼
JS memoryStore.add → domain.normalizeExpenseInput
      │ valid?
      ├─ no  → show error message (DOM text) → STOP
      └─ yes → push object into array
                │
                ▼
         JS saveExpenses → localStorage (JSON string)
                │
                ▼
         JS render() → create <li> elements → update total text
                │
                ▼
         CSS styles those elements
```

---

## 8. Study checklist

- [ ] I can name which of HTML / CSS / JS builds structure, look, and behavior  
- [ ] I can narrate Add, Edit, Delete, Filter, Sort, Refresh without looking  
- [ ] I know why `preventDefault` matters on submit  
- [ ] I know validation lives in **domain**, not in the button label  
- [ ] I know localStorage holds **strings** (JSON), memory holds **objects**  
- [ ] I understand “good shortcut” = small + safe + upgradeable — not fragile  

Ask **“quiz me on how-it-works”** when you want a check.
