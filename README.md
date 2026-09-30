# programming-knowledge-base

A personal TypeScript & Python knowledge base — book exercises, worked
examples, algorithms, data structures, and performance notes — all in a single
repo sharing one toolchain.

## How it's organised

Folders are named after the **concept**, not the language. Where a problem is
solved in both languages the two files sit side by side, so you can read the
same idea in two idioms:

```
algorithms/hashmaps/
  _theory.ts        pattern notes + 2-3 reference implementations
  two-sum.ts        TypeScript
  two_sum.py        Python
  test_two_sum.py   pytest, next to the module it tests
```

Language-named folders are reserved for material that is genuinely
language-bound — a TypeScript book, V8-specific performance quirks.

## Contents

| Folder / file | What's inside |
|---|---|
| [`algorithms/`](algorithms) | DSA practice, grouped by pattern: `two-pointers/`, `greedy/`, `strings/`, `hashmaps/`, `searches/`, `sorting/`, `recursion/`, `sliding-window/`, `dynamic-programming/`, `basics/`, `numbers/`. Each pattern folder opens with a `_theory.ts` — the pattern in a few lines, when to reach for it, common bugs, and 2–3 short reference implementations. `_big-o.ts` covers complexity. |
| [`data-structures/`](data-structures) | Notes and implementations — arrays, array lists, linked lists, stacks, queues, ring buffers, trees, graphs, hash maps, plus JS built-ins. `interview-questions/` holds real asked questions; `tests/` holds the Vitest specs. |
| [`design-patterns/`](design-patterns) | Design pattern examples (e.g. Singleton). |
| [`total-typescript-book/`](total-typescript-book) | Exercises from the *Total TypeScript* book (Matt Pocock & Taylor Bell). Logic in `*.exercises.ts`, Vitest tests in `*.test.ts`. |
| [`performance/`](performance) | Numbered `bad.js` / `good.js` pairs with `explanation.txt` notes on JS perf patterns, in reading order. |
| [`notes/`](notes) | Cross-cutting reference material: LeetCode cheatsheets, a Python crash course, and `typescript/` for language semantics — closures, equality & references, deep vs shallow copy, immutability (`readonly`, `as const`, `DeepReadonly`, `Object.freeze`). Each file is runnable with `node notes/typescript/<file>.ts`. |
| [`scratch/`](scratch) | Loose practice & works-in-progress — common JS patterns, misc. exercises, a JSON parser. Excluded from the test run. |

## Conventions

- **Filenames** are kebab-case for `.ts` / `.js` (`two-sum.ts`) and snake_case
  for `.py` (`two_sum.py`). Python has to be snake_case: hyphens are illegal in
  module names, so `two-sum.py` could never be imported or tested.
- **Inside** files, each language's own idiom — `camelCase` in TypeScript,
  `snake_case` in Python.
- A leading `_` (`_theory.ts`, `_review.ts`, `_big-o.ts`) marks reference
  material rather than a problem to solve, and sorts it to the top.

## Toolchain

Tooling is shared at the repo root — one `package.json`, `tsconfig.json`,
`vitest.config.ts`, and `pyproject.toml`. There is no per-folder setup.

| | TypeScript | Python |
|---|---|---|
| Type-check / lint | `tsc --noEmit` | `ruff` |
| Tests | Vitest (`*.{test,spec}.ts`) | pytest (`test_*.py`) |

```bash
npm install              # one time — TypeScript side
uv sync                  # one time — Python side (installs ruff + pytest)

npm test                 # Vitest in watch mode
npm run test:run         # Vitest once
npm run test:ui          # Vitest UI
npm run test:types       # tsc --noEmit

npm run test:py          # pytest
npm run lint:py          # ruff check
npm run lint:py:fix      # ruff check --fix
npm run format:py        # ruff format

npm run check            # all four, in sequence
```

Scope a run to one folder by passing a path:

```bash
npm run test:run -- data-structures
npm run test:py -- algorithms/hashmaps
```

## Notes

- `algorithms/` is excluded from `tsconfig.json` — it carries 114 pre-existing
  `noUncheckedIndexedAccess` errors (`arr[i]` is `T | undefined` under this
  repo's strict settings). Everything else is type-checked. Fixing those is a
  standing to-do; the exclusion comes out when they're done.
- `npm run test:run` currently has 31 failing tests. That's expected — they are
  book exercises not yet solved (`throw new Error('Not implemented')`), plus one
  exercise that fetches `localhost:3000`.
- This is a learning repo: expect scratch files and works-in-progress.
