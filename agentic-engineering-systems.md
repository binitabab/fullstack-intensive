# Agentic Engineering Systems

Source: [YouTube — Agentic Engineering workflow](https://www.youtube.com/watch?v=Vok_nReMFaU)  
Open-source skills: [github.com/jsmastery-pro/skills](https://github.com/jsmastery-pro/skills)

**Core idea:** Prompting alone decays. Every feature makes the next one harder unless real engineering discipline sits under the agent: plan → decide → keep state in files → build on what exists → prove it works → debug with discipline.

---

## The decay (what this fixes)

Without a system, AI coding typically does this:

1. You describe a wish → AI builds fast but guesses wrong and adds extras
2. You fix one thing → something else breaks
3. You go in circles re-explaining, burning tokens
4. Next feature regenerates logic instead of reusing what exists
5. Codebase drifts; old features break; nothing compounds

Root cause: no plan the agent remembers, no recorded decisions, no rule to build with what already exists.

---

## The pipeline

```
idea → /scope → /audit → /architect → /develop → /check verify → /test → /check review → /document → /sync
```

Plus `/debug` when something breaks.

Match effort to risk: a throwaway prototype may only self-check; a payment system runs all four verification skills.

---

## System 1 — Scope (what to build)

**Job:** Turn a vague idea into an ordered plan *before* code.

**Does:**
- Interviews you: who is this for, what’s in V1, what’s out, what depends on what
- Recommends a build strategy (e.g. thin vertical slice, smallest usable version, full journey at a time)
- Never picks stack/DB/framework — only *what* you’re building

**Why:** Changing a line in a plan is free. Changing a decision already spread through the codebase is a rewrite.

**Apply without the skill:**
- Write: audience, V1 in-scope, explicitly out-of-scope, ordered slices, dependencies
- Do not start coding until that doc exists

---

## System 2 — Architect (how to build)

**Job:** Make load-bearing decisions on purpose and write them down.

**Default opinions it brings:**
- Start with a monolith
- Relational DB by default
- Paginate every list
- Rate-limit every public endpoint
- Never keep secrets in code

**Does:**
- Patterns first (does this need to be complicated?)
- For each real decision: recommended option + honest alternative + why the alternative lost
- **Source check:** for every value the feature must show/compute (total, date, status…), name where it comes from. No source = undecided → catch at design time

**Output:** build specs (typically `docs/specs/`)

**Apply without the skill:**
- Before coding a feature, list every decision and every displayed/computed value + its source
- Write the choice and rejected alternatives somewhere durable (not only chat)

---

## System 3 — Develop (build, but refuse invented decisions)

**Job:** Implement from the plan/spec; stop if something wasn’t decided.

**Gate:**
1. List every value the feature must produce
2. Check plan/spec for a source for each
3. Any value with no source → stop and send back to Architect (or you)
4. You can override and build anyway — but the assumption is written down and flagged until properly decided

**Apply without the skill:**
- Before implementing, do the same value→source checklist
- Never let “I’ll just wire it” invent business rules silently

---

## System 4 — Audit (project context in files)

**Job:** Write lean agent context from the *real* repo (`AGENTS.md`), not from AI assumptions.

**Rules:**
- Single app → one clean root context file
- Monorepo → lean root (what’s true everywhere) + nested files next to parts with their own rules
- Never overwrite handwritten edits; only fill gaps
- If code disagrees with docs → flag conflict, don’t bulldoze

**Why:** Without durable context, every new session guesses differently → style drift.

**Apply without the skill:**
- Maintain `AGENTS.md` (stack, commands, conventions, architecture facts)
- Keep it short; put area-specific rules next to those areas

---

## System 5 — Sync (keep context true)

**Job:** After shipping, reconcile `AGENTS.md`, scope, and spec statuses with what the repo actually shows.

**Apply:** Run (or manually update) context docs after meaningful merges so month-3 context still describes the real app.

---

## System 6 — Check / Verify / Test / Review / Document

Four separate jobs — don’t collapse them into “AI said done.”

| Skill | What it proves |
|--------|----------------|
| **Check verify** | Drive the *real* app (UI clicks / endpoints) against plan criteria — not “read code and nod” |
| **Test** | Suite a senior would write: what callers rely on, what would break something later |
| **Check review** | Diff review on a *different* model than the author (reduces self-review blind spots) |
| **Document** | PR / changelog from the *actual* diff, not the AI’s memory |

Green tests only prove what the AI thought to test. They don’t prove the feature exists or the screen was built.

---

## System 7 — Debug (cause, not vibes)

**Discipline:**
1. Reproduce reliably first
2. Narrow to smallest failing spot
3. Form **one** theory; test that one change; if wrong, throw it away
4. Fix the cause, not the symptom (don’t clamp null — find why it was null)
5. Add a regression test that fails without the fix
6. Hunt for the same mistake elsewhere
7. If the bug is a bad *decision*, send back to redesign — don’t paper over it

---

## Greenfield vs brownfield

**New project:**
1. `/scope` the idea  
2. `/architect` the stack  
3. Scaffold  
4. `/audit` from the real scaffold  
5. Feature loop: architect → develop → verify → test → review → document → sync  

**Inherited / legacy:**
1. `/audit` the existing mess (any language — engineering context, not framework tutorials)  
2. `/scope` plans the *next* slice on top of reality  
3. New features designed against existing data + patterns — reuse, don’t regenerate  

---

## Install the open-source skills

```bash
npx skills add https://github.com/jsmastery-pro/skills
```

Or add one skill at a time, e.g.:

```bash
npx skills add https://github.com/jsmastery-pro/skills --skill scope
npx skills add https://github.com/jsmastery-pro/skills --skill audit
npx skills add https://github.com/jsmastery-pro/skills --skill architect
# ... develop, check, test, document, sync, debug
```

Works with Cursor / Claude Code / Codex-style agents that read project skills + `AGENTS.md`.

---

## Principles to apply every day (even without skills)

1. **Decide what to build first** (scope before code)
2. **Make hard calls on purpose** (architect; write them down)
3. **Keep state in files** (`AGENTS.md`, specs, scope — not chat)
4. **Never let the AI decide something important without telling you**
5. **Prove it runs** (real verify + real tests)
6. **Debug one theory at a time**
7. **Match process weight to risk**

---

## Condensed transcript (narrative)

You open an agent and start building. Every feature quietly makes the next one harder: missing pieces, unwanted extras, fix-one-break-another loops, regenerated duplicate logic, and decay. A better prompt won’t fix that — it’s an engineering problem.

Serious teams plan first. Scope interviews you and produces an ordered plan without choosing tech. Architect then designs: stack, data, failure modes, sources for every value — options on the table, recommendations written down. Develop refuses to invent undecided values; overrides are flagged in files.

Audit writes real project context into `AGENTS.md` (safe on team repos). Sync keeps it true over time. The same audit boots the workflow on inherited codebases in any language. Scope and design then bend around what already exists.

When AI says “done,” don’t trust it: verify in the real app, write protective tests, review on another model, document from the diff. When something breaks, debug by reproduce → one theory → cause → regression test — not thrashing.

The skills are free and open source. Judgment (when to run which, when the AI is wrong, what to do when a session goes sideways) is the part you practice — that’s the difference between prompting AI and engineering with it.
