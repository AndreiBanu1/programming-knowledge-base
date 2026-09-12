# programming-knowledge-base

A personal TypeScript & Python knowledge base — book exercises, worked
examples, algorithms, and performance notes — all in a single monorepo sharing
one toolchain.

## Contents

| Folder / file | What's inside |
|---|---|
| [`algorithms/`](algorithms) | DSA practice, grouped by pattern: `two-pointers/`, `greedy/`, `strings/`, `hashmaps/`, and `notes/big-o.ts`. Each pattern folder starts with a `_theory.ts` — the pattern in a few lines, when to reach for it, common bugs, and 2–3 short reference examples. |
| [`data-structures/`](data-structures) | Notes and implementations — arrays, linked lists, stacks, queues, trees, graphs, hash maps. |
| [`design-patterns/`](design-patterns) | Design pattern examples (e.g. Singleton). |
| [`typescript-book/`](typescript-book) | Exercises from the *Total TypeScript* book (Matt Pocock & Taylor Bell). Logic lives in `*.exercises.ts`, Vitest tests in `*.spec.ts`. |
| [`performance/`](performance) | Numbered `bad.js` / `good.js` pairs with `explanation.txt` notes on JS perf patterns. |
| [`checkout-module/`](checkout-module) | A worked example of extracting an internal helper into its own testable module. See its [README](checkout-module/README.md). |
| [`scratch/`](scratch) | Loose practice & scratch files — common JS patterns, misc. exercises, a JSON parser, and a two-pointers review sheet. |

## Toolchain

Tooling is shared at the repo root — a single `package.json`, `tsconfig.json`,
`vitest.config.ts`, and `node_modules`. There is no per-folder setup.

- **TypeScript** for type-checking (`tsc --noEmit`)
- **Vitest** for tests — picks up any `*.{test,spec}.ts` file across the repo

## Commands

```bash
npm install              # one time

npm test                 # run all tests in watch mode
npm run test:run         # run all tests once
npm run test:ui          # Vitest UI
npm run test:types       # type-check everything with tsc --noEmit
```

Run tests for a single module by passing a path:

```bash
npm run test:run -- checkout-module
```

## Notes

- `algorithms/`, `performance/`, `scratch/`, and `design-patterns/` are excluded
  from the root `tsconfig.json` / Vitest config — they're standalone study
  material, not part of the typed/tested surface.
- This is a learning repo: expect scratch files and works-in-progress.
