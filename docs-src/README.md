# EJS Docs

The EJS documentation is built with Astro Starlight and served under `/docs/`
alongside the static landing page.

## Project Structure

```text
docs-src/
├── public/
├── src/
│   ├── assets/
│   ├── content/docs/
│   └── styles/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Source files live in `docs-src/src/content/docs/`. The production build writes
static files to `../docs/`, which Firebase serves from the repository root.

## Commands

Run these from the repository root:

| Command | Action |
| :-- | :-- |
| `npm run docs:dev` | Start the docs dev server |
| `npm run docs:build` | Build the docs into `docs/` |
| `npm run docs:preview` | Preview the built docs locally |

You can also run the underlying Starlight commands from this directory:

| Command | Action |
| :-- | :-- |
| `npm install` | Install docs dependencies |
| `npm run dev` | Start the docs dev server |
| `npm run build` | Build production docs to `../docs/` |
| `npm run preview` | Preview the production build |
