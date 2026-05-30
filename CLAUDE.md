# EJS Website — CLAUDE.md

> Terse, machine-facing summary. For the fuller narrative (sections, rationale,
> decision log), see `documentation.md` at the repo root.

## Project
Single-page marketing site for EJS (Embedded JavaScript Templates). Static HTML only, no build tooling, no frameworks, minimal JavaScript.

## Architecture
- Single `index.html` file
- All styles live in a `<style>` block in the `<head>` — no separate CSS files
- Minimal JS: pre-paint theme resolver (inline in `<head>`), theme toggle button, scroll-spy nav (`.scrolled` + active-link highlighting), tab toggles (Compare-section template tabs and the ESM/CJS tab in Get Started), service-worker registration. CSS `scroll-behavior: smooth` handles anchor scrolling.
- Fonts: Inter for body text and most UI; Montserrat for display/heading type (hero title, section/card/notice titles, nav links, GitHub button, primary/support buttons); IBM Plex Mono reserved strictly for code/terminal contexts (code blocks, syntax tokens, file/tab labels inside code windows, inline `<code>`, the install pill, and the brand's `<%= EJS %>` stylization in the hero/footer). Loaded weights: Inter 400/500/600, Montserrat 400/500/600/700, IBM Plex Mono 400/600.

## Theming
Two themes via CSS custom properties. Default `:root` defines the cool light tokens (a cool near-white, not cream); `:root[data-theme="dark"]` overrides them. An inline script in `<head>` runs before paint to set `data-theme` from `localStorage` if present, otherwise from `prefers-color-scheme`. A nav button toggles and persists the choice (adding `.no-transitions` for one frame so the switch is instant). Code surfaces stay dark in both themes — syntax-highlight token colors (`.t-tag` etc.) are hardcoded for the dark code background.

## Design Tokens
| Token                  | Light       | Dark      |
|------------------------|-------------|-----------|
| `--bg`                 | `#f4f5f3`   | `#101114` |
| `--surface`            | `#fcfdfb`   | `#181a1e` |
| `--surface-faint`      | `#ebedea`   | `#0d0e11` |
| `--surface-deep`       | `#dee0dc`   | `#090a0d` |
| `--border`             | `#d1d4cf`   | `#26282d` |
| `--border-subtle`      | `#e5e7e3`   | `#181a1e` |
| `--text-primary`       | `#1a1a1a`   | `#eef0f3` |
| `--text-body`          | `#1f1f1f`   | `#dee0e4` |
| `--text-secondary`     | `#4f535a`   | `#a4a7ae` |
| `--text-faint`         | `#e4e6e2`   | `#1c1e22` |
| `--green`              | `#9eb44e`   | `#b4ca65` |
| `--green-link`         | `#557d0c`   | `#b4ca65` |
| `--crimson`            | `#bf225a`   | `#bf225a` |
| `--code-bg` (fixed)    | `#1c1c1c`   | `#1c1c1c` |

There are also 3D-button/panel token families (`--btn-*`, `--edge-*`, `--primary-*`, `--code-*`) driving the layered `box-shadow` "physical button" look, and a hero-specific group (`--hero-bg`, `--hero-ink`, `--hero-surface`, `--hero-grain-opacity`, …).

## Syntax Highlight Classes
Used inside code preview blocks to color tokens (Monokai-style palette, tuned for the dark code surface):
- `.t-tag` — EJS / template delimiters (`<% %>`, `{{ }}`) → crimson `#bf225a`
- `.t-var` — variables, function/property names → `#ff6188`
- `.t-kw` — JavaScript keywords → `#ab9df2`
- `.t-str` — strings → `#a9dc76`
- `.t-path` — file paths in CLI examples → `#fc9867`
- `.t-html` — literal HTML tags → `#939293`
- `.t-cm` — comments / shell prompt (`$`) → `#78dce8`
