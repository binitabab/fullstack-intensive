# Milestone 1 — What to learn from this build

**Status:** Built for you. Your job: read, run, notice, ask.

## What we shipped

A real mini-product: add / edit / delete expenses, filter, sort, totals, validation, empty/error messages, and persistence across refresh.

## How to run (tools)

```bash
cd "/home/benj/Videos/Learning and Building/fullstack-intensive/projects/expense-tracker"
npm run check
```

UI (recommended — ES modules need a tiny server, not always `file://`):

```bash
npx --yes serve .
```

Open the URL it prints (usually http://localhost:3000). Use Chrome.

**Tools you just used**

| Tool | What it is | Why we use it |
|------|------------|---------------|
| **Node.js** | JS runtime on your machine | Run checks without a browser |
| **npm** | Package/script runner | `npm run check` |
| **npx** | Run a package once | `serve` static files without permanent install |
| **Chrome DevTools** | Inspect page | Console tab for errors; Application → Local Storage |
| **ES modules** | `import` / `export` | Split code into files browsers understand |

## Reading order (45–60 min)

1. **`docs/HOW-IT-WORKS.md`** — every click, every language, every how *(start here)*  
2. `AGENTS.md` — project map  
3. `docs/architecture.md` — layers diagram  
4. `src/domain/expense.js` — rules without UI  
5. `src/store/memoryStore.js` — CRUD API  
6. `src/store/localStorageAdapter.js` — persistence + privacy limits  
7. `src/ui/app.js` — DOM events (match to HOW-IT-WORKS)  
8. `index.html` — structure the JS binds to  
9. `scripts/self-check.js` — how we prove behavior  

## Multi-dimension checklist (self-assess)

After reading, you should be able to explain in your own words:

- [ ] **Structure:** Why domain / store / ui folders?  
- [ ] **Function:** What happens on form submit end-to-end?  
- [ ] **Scope:** Why is this not a banking app?  
- [ ] **Security/privacy:** Why `textContent`? Why validate? What’s unsafe about localStorage for secrets?  
- [ ] **Upgrade path:** What would change to talk to a future Express API?  
- [ ] **Shortcut taken:** Why vanilla JS instead of React this week?  
- [ ] **Bugfix later:** Where would you look if totals are wrong? If data vanishes?  

When you want a quiz, say: **“quiz me on Milestone 1.”**

## Terms added this milestone

See root `../../GLOSSARY.md` — especially: domain, repository/store, adapter, ES module, localStorage, XSS, persistence, MVP, technical debt, separation of concerns.
