# Dependency management

This repo mixes TypeScript, JavaScript and Python, including small backend
projects under `backend/`. All dependencies are managed **once, at the repo
root** — one Python environment and one `node_modules` for everything.

## Layout

| Language | Manifest | Lockfile | Environment |
|---|---|---|---|
| Python ([uv](https://docs.astral.sh/uv/)) | `pyproject.toml` | `uv.lock` | `.venv/` |
| JS/TS (npm) | `package.json` | `package-lock.json` | `node_modules/` |

There is **no** per-folder `.venv`, `package.json`, `package-lock.json` or
`tsconfig.json` (e.g. `backend/simpleFastAPI` and `backend/simpleJSApi` use the
root ones). Node resolves `node_modules` by walking up the directory tree, and
`uv run` finds the root `pyproject.toml` from any subfolder, so sub-projects
just work.

## Setup

```bash
npm install     # installs node_modules (TypeScript, Vitest, tsx, @types/node)
uv sync         # installs .venv (pytest, ruff, fastapi, scalar-fastapi, ...)
```

`uv sync` installs the `dev` and `backend` groups by default
(`[tool.uv] default-groups` in `pyproject.toml`).

## Python

Dependencies are split into groups in `pyproject.toml`:

| Group | Contents |
|---|---|
| `dev` | `pytest`, `ruff` |
| `backend` | `fastapi[standard]`, `scalar-fastapi` |

```bash
uv add <pkg>                    # runtime dependency
uv add --group dev <pkg>        # tooling (tests, linters)
uv add --group backend <pkg>    # API/backend dependency
uv remove <pkg>                 # remove (add --group <name> for groups)
uv sync                         # make .venv match uv.lock exactly
uv run <command>                # run inside the project environment
```

> **Never `pip install` into `.venv`.** `uv sync` makes the environment match
> `uv.lock` exactly and **uninstalls anything not declared**. Always use
> `uv add` so the package lands in `pyproject.toml` and `uv.lock`.

IDE: select `./.venv/bin/python` (repo root) as the interpreter.

## JavaScript / TypeScript

```bash
npm i <pkg>        # runtime dependency
npm i -D <pkg>     # dev dependency (most things here)
npm uninstall <pkg>
```

Key tools: `typescript` (7.x), `vitest`, `tsx` (runs `.ts` directly),
`@types/node` (kept in line with the installed Node major).

The root `tsconfig.json` type-checks every `.ts` file (except `algorithms/`,
`backend/simpleNestJSApi/` and `node_modules/`), including the other backend projects.
`backend/simpleNestJSApi` has its own small `tsconfig.json` (extends the root one) because
NestJS needs decorator metadata; check it with `npm run test:types:nest`.

### NestJS (`backend/simpleNestJSApi`)

NestJS needs `emitDecoratorMetadata`, which `tsx` and Vitest's default transformer
(esbuild) do not support, so this project is compiled with **SWC** instead:

- `npm run dev:nestjs` starts it through a tiny Node loader (`register.mjs` /
  `ts-loader.mjs` in that folder) that compiles `.ts` with `@swc/core`.
- `vitest.config.ts` uses `unplugin-swc`, configured from the Nest tsconfig.
- `package.json` has an `overrides` entry so `@nestjs/swagger` (whose optional
  `typescript` peer stops at 6.x) installs against the repo's TypeScript 7. Without it a
  plain `npm install` fails with `ERESOLVE`. Remove it once Nest supports TS 7.

## Running the backend projects

```bash
npm run dev:fastapi   # backend/simpleFastAPI -> http://127.0.0.1:8000 (docs at /docs, /scalar)
npm run dev:jsapi     # backend/simpleJSApi   -> http://127.0.0.1:3000
npm run dev:nestjs    # backend/simpleNestJSApi -> http://localhost:3001 (docs at /scalar; PORT=... to change)
```

`dev:jsapi` changes into `backend/simpleJSApi` first because `server.ts` reads
`./index.html`, `./users.json`, etc. relative to the working directory.

## Adding a new sub-project

1. Create a folder under `backend/` (or anywhere) with your source files.
2. Add its dependencies to the **root** manifests (`uv add ...` / `npm i -D ...`).
3. Optionally add a `dev:<name>` script to the root `package.json`.
4. Do **not** create a new `.venv` or `package.json` there. A `tsconfig.json` is only
   allowed when the project needs compiler options the root one lacks (see NestJS above).

If a sub-project ever needs a conflicting dependency version, or must be
extractable on its own, switch to
[uv workspaces](https://docs.astral.sh/uv/concepts/projects/workspaces/) and
[npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces): still a single
`.venv` and `node_modules`, but each project keeps its own manifest.

## Checks

```bash
npm run check   # tsc --noEmit (root + nest), vitest, ruff, pytest
```

`npm run test:run` is expected to have 31 failing tests (unsolved book
exercises); see `README.md`.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `ModuleNotFoundError: fastapi` / `scalar_fastapi` | Run `uv sync`, and run code with `uv run` or the root `.venv` interpreter. |
| A package vanished from `.venv` after `uv sync` | It was installed with `pip` and never declared. Re-add it with `uv add`. |
| `Cannot find module 'node:http'` types | `npm install`; check `"node"` is in `types` in `tsconfig.json`. |
| `Not Found` from `dev:jsapi` static files | Start it via `npm run dev:jsapi` so the working directory is correct. |
