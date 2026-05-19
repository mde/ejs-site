# EJS Website — CLAUDE.md

## Project
Single-page marketing site for EJS (Embedded JavaScript Templates). Static HTML only, no build tooling, no frameworks, no JavaScript.

## Architecture
- Single `index.html` file
- All styles live in a `<style>` block in the `<head>` — no separate CSS files
- Minimal JS: pre-paint theme resolver (inline in `<head>`), theme toggle button, ESM/CJS tab toggle in Get Started, service-worker registration. CSS `scroll-behavior: smooth` handles anchor scrolling.
- Fonts: Inter for everything except code/terminal contexts; IBM Plex Mono is reserved strictly for code (code blocks, syntax tokens, file/tab labels inside code windows, inline `<code>`, and the brand's `<%= EJS %>` stylization in the hero/footer). Loaded weights: Inter 400/500/600, IBM Plex Mono 400/600.

## Theming
Two themes via CSS custom properties. Default `:root` defines the cream/light tokens; `:root[data-theme="dark"]` overrides them. An inline script in `<head>` runs before paint to set `data-theme` from `localStorage` if present, otherwise from `prefers-color-scheme`. A nav button toggles and persists the choice. Code surfaces stay dark in both themes — syntax-highlight token colors (`.t-tag` etc.) are hardcoded for the dark code background.

## Design Tokens
| Token                  | Light (cream) | Dark      |
|------------------------|---------------|-----------|
| `--bg`                 | `#f7f1e3`     | `#111`    |
| `--surface`            | `#fffaeb`     | `#1a1a1a` |
| `--surface-faint`      | `#ede5d0`     | `#0e0e0e` |
| `--surface-deep`       | `#e3d9bc`     | `#0a0a0a` |
| `--border`             | `#d4caa8`     | `#272727` |
| `--border-subtle`      | `#e3d9bc`     | `#1a1a1a` |
| `--text-primary`       | `#1a1a1a`     | `#f0f0f0` |
| `--text-body`          | `#2a2a2a`     | `#d0d0d0` |
| `--text-secondary`     | `#6e6553`     | `#888`    |
| `--text-faint`         | `#e3d9bc`     | `#1e1e1e` |
| `--green`              | `#5a7020`     | `#b4ca65` |
| `--crimson`            | `#bf225a`     | `#bf225a` |
| Code background (fixed)| `#0d0d0d`     | `#0d0d0d` |

## Syntax Highlight Classes
Used inside code preview blocks to color tokens:
- `.t-tag` — EJS delimiters `<% %>` → crimson `#bf225a`
- `.t-var` — variables and function names → olive `#b4ca65`
- `.t-kw` — JavaScript keywords → blue `#7a9fd4`
- `.t-str` — strings → green `#90a93a`
- `.t-html` — HTML tags → muted `#777`
- `.t-cm` — comments → dark `#333`
