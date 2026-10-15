# Living Glossary — Technical + Market Terms

Add terms as we meet them. Plain English first, then the precise meaning.

## How to use this

When a tip says **term**, skim the entry here. You learn terms by using them in the project, not by memorizing lists.

---

## Day 1 — JavaScript & product basics

| Term | Plain English | Precise meaning |
|------|---------------|-----------------|
| **JavaScript (JS)** | The language that runs in browsers and (with Node) on servers | High-level, dynamically typed language for web apps |
| **Node.js** | JavaScript outside the browser | A runtime that executes JS on your computer/server |
| **Runtime** | The environment that runs your code | Browser, Node, etc. |
| **Variable** | A named box that holds a value | Binding created with `let`, `const`, or (legacy) `var` |
| **`const`** | Name that won’t be reassigned | Binding cannot be reassigned; object contents can still change |
| **`let`** | Name you may reassign | Block-scoped mutable binding |
| **`var`** | Old way to declare variables | Function-scoped; avoid in new code |
| **Type** | What kind of value something is | `number`, `string`, `boolean`, `object`, `undefined`, `null`, … |
| **String** | Text | Characters in quotes: `"hi"` or `'hi'` or `` `hi` `` |
| **Number** | Numeric value | `4.5` — note: form inputs are often strings until converted |
| **Boolean** | Yes/no | `true` or `false` |
| **Object** | A record with named fields | `{ description: "Coffee", amount: 4.5 }` |
| **Array** | An ordered list | `[item1, item2]` |
| **Property / field** | A named piece of data on an object | `expense.amount` |
| **Function** | Reusable named steps | Takes inputs (parameters), may return a value |
| **Parameter** | Placeholder input in the function definition | `function add(amount)` — `amount` is the parameter |
| **Argument** | The real value you pass in | `add(4.5)` — `4.5` is the argument |
| **Return** | Send a result back to the caller | `return expense` |
| **CRUD** | Create, Read, Update, Delete | The four basic operations on data |
| **Validate** | Check data before trusting it | Reject empty description, amount ≤ 0, etc. |
| **In-memory** | Exists only while the program runs | Lost when you stop Node (until we add storage) |
| **Persist / persistence** | Survive refresh/restart | e.g. `localStorage`, database |
| **`id`** | Unique label for one record | So update/delete know which item |
| **ISO date string** | Standard text form of a timestamp | e.g. `2026-10-15T13:00:00.000Z` |
| **Module** | A file that exports reusable code | `export` / `import` or CommonJS `require` |
| **Assertion / test check** | A line that proves something is true | `PASS` / `FAIL` prints in our harness |
| **Bug** | Behavior that doesn’t match what you intended | Fix with evidence, not random edits |
| **Stack** | The set of tools in a project | e.g. MERN = Mongo, Express, React, Node |
| **Full-stack** | Frontend + backend (+ usually database) | UI and server/API |
| **Frontend** | What the user sees and clicks | Browser UI |
| **Backend** | Server logic, APIs, auth, DB access | Runs on Node in our path |
| **API** | How programs talk to each other | Often HTTP routes returning JSON |
| **JSON** | Text format for structured data | Looks like JS objects; used in APIs |
| **Portfolio** | Public proof of what you can build | Repos + demos + case studies |
| **Freelance / Upwork** | Paid project work for clients | Clients hire for scoped deliverables |
| **Deliverable** | What you promise to hand over | Working feature, fix, docs, deploy |
| **Scope** | What’s in vs out of the job | Prevents endless unpaid extras |
| **MVP** | Minimum Viable Product | Smallest useful version you can ship |
| **SaaS** | Software as a Service | App users subscribe to / log into online |
| **Tech debt** | Shortcuts that cost time later | Skip tests → slower future changes |

---

## Characters & syntax you’ll see constantly

| Character / syntax | Name | Role |
|--------------------|------|------|
| `//` | Line comment | Notes the computer ignores |
| `/* … */` | Block comment | Multi-line notes |
| `;` | Semicolon | Statement end (often optional in JS; be consistent) |
| `{}` | Curly braces | Object literal or code block |
| `[]` | Square brackets | Array literal or index access `arr[0]` |
| `()` | Parentheses | Call a function `fn()`, or group expressions |
| `.` | Dot | Access property `obj.field` or method `arr.push()` |
| `,` | Comma | Separate list items / parameters |
| `=` | Assignment | Put a value in a name |
| `===` | Strict equality | Same value and type |
| `!==` | Strict inequality | Not equal |
| `=>` | Arrow | Arrow function: `(x) => x * 2` |
| `?` `.` | Optional chaining | `obj?.field` — safe if `obj` is nullish |
| `` ` `` | Backtick | Template string: `` `Hello ${name}` `` |
| `${…}` | Interpolation | Insert expression inside a template string |
| `...` | Spread / rest | Copy arrays/objects or gather leftover args |

---

## Milestone 1 additions (Expense Tracker)

| Term | Plain English | Precise meaning |
|------|---------------|-----------------|
| **Separation of concerns** | Each part has one job | Domain ≠ store ≠ UI |
| **Domain logic** | Business rules | Validation, totals, “what is allowed” |
| **Repository / store** | Place that holds and changes data | `memoryStore` API |
| **Adapter** | Glue to an outside system | `localStorageAdapter` |
| **ES module** | File that can `import`/`export` | Browser `type="module"` |
| **`localStorage`** | Browser key/value storage | Strings only; per origin |
| **XSS** | Attacker injects script into UI | Mitigate: prefer `textContent` over raw HTML for user data |
| **Self-check / harness** | Tiny automated proof | `npm run check` |
| **Technical debt** | Shortcut we accept now | e.g. no cloud sync yet |
| **Upgrade path** | How we grow without rewrite | Same store API → later HTTP |
| **Cross-platform (here)** | Same rules in Node checks + browser UI | Domain runs in both |
| **MVP** | Smallest useful shippable version | This tracker is an MVP prototype |
| **Origin (web)** | Scheme + host + port | localStorage is scoped to it |
| **`npx`** | Run a package without global install | `npx serve .` |
| **Static server** | Serves HTML/JS/CSS files | Needed for ES modules reliably |

## Milestone 2 additions (React BizFlow)

| Term | Plain English | Precise meaning |
|------|---------------|-----------------|
| **React** | Library for building UIs from components | Re-renders when state/props change |
| **Component** | Reusable UI piece | Function returning JSX |
| **JSX** | HTML-like syntax in JS files | Compiled to `React.createElement` calls |
| **props** | Inputs into a component | Parent → child data |
| **state** | Data a component remembers | `useState` — changes trigger re-render |
| **hook** | React function starting with `use` | `useState`, `useEffect`, `useMemo` |
| **useEffect** | Run side effects after render | e.g. load data on mount |
| **useMemo** | Cache a calculated value | Recalculate when dependencies change |
| **Controlled input** | Input driven by React state | `value` + `onChange` |
| **Vite** | Dev server + bundler | Fast HMR for React apps |
| **React Router** | Maps URLs to pages | Client-side navigation |
| **NavLink** | Link that knows “active” route | Adds `.active` class |
| **Outlet** | Placeholder for child routes | Layout wraps pages |
| **Mock API** | Fake backend in the browser | Promises + delay; later real HTTP |
| **Loading / error / empty / ready** | Four UI states | Always design for all four |
| **Pagination** | Show data in pages | `page` + `pageSize` slice |
| **HMR** | Hot Module Replacement | Vite updates UI without full refresh |

## Milestone 2 additions (Live API)

| Term | Plain English | Precise meaning |
|------|---------------|-----------------|
| **Express** | Node library for HTTP APIs | Routes, middleware, JSON responses |
| **Route** | URL + method handler | e.g. `GET /api/customers` |
| **Middleware** | Code in the request pipeline | `express.json()`, CORS, error handler |
| **CORS** | Cross-Origin Resource Sharing | Browser security for other origins |
| **Proxy (Vite)** | Forward `/api` to Express in dev | Avoids messy local CORS setup |
| **fetch** | Browser HTTP client | Used in `src/data/api.js` |
| **Status 201** | Created | Successful POST that made a resource |
| **Status 400** | Bad request | Validation failed |
| **concurrently** | Run multiple npm scripts together | API + Vite in one `npm run dev` |
| **Shared module** | Code both server and client use | `shared/customerValidation.js` |

## Coming later (preview only — learn when we build)

MongoDB, document, collection, PostgreSQL, table, row, SQL, join, migration, JWT, authentication, authorization, TypeScript, deploy, environment variable, rate limit, RAG…

We’ll fill those on the day we use them.
