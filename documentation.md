# EJS Site — Documentation

Living documentation for the EJS marketing site. This file is maintained alongside
the code: the **Overview**, **Architecture**, **Design System**, and **Sections**
parts always describe the current state of `index.html`, while the **Decision Log**
at the bottom is append-only — a dated record of what changed and *why*.

> Relationship to `CLAUDE.md`: `CLAUDE.md` is the terse, machine-facing summary for
> tooling. This file is the fuller human-facing version. When they disagree, this
> file reflects the current code (see the drift notes flagged with ⚠️).

---

## Overview

A single-page marketing site for EJS (Embedded JavaScript Templates). Static HTML
only — no build tooling, no frameworks, and almost no JavaScript. The entire site is
one file, `index.html`, with all styles in a single `<style>` block in the `<head>`.

The page sells one idea: EJS is "just JavaScript," so there's no new template syntax
to learn. Every section reinforces that positioning.

---

## Architecture

- **Single file.** Everything lives in `index.html` — markup, CSS, and the small
  amount of JS. There are no separate `.css` or `.js` source files.
- **CSS** is one `<style>` block in the `<head>`, organized top-to-bottom as: token
  definitions (`:root` and `:root[data-theme="dark"]`), global resets, shared
  component skeletons (buttons, cards, panels), then per-section rules under comment
  headers (`/* NAV */`, `/* HERO */`, etc.).
- **JavaScript** is minimal and lives in two places:
  1. A **pre-paint theme resolver** — an inline IIFE at the top of `<head>` that sets
     `data-theme` from `localStorage` (falling back to `prefers-color-scheme`) before
     the first paint, so there's no theme flash.
  2. A script block before `</body>` that handles: the **theme toggle** button, the
     **scroll-spy nav** (adds `.scrolled` to the nav and highlights the active section
     link), the **tab toggles** (Compare-section template tabs and the ESM/CJS tab),
     and **service-worker registration** (`/sw.js`).
- **Smooth scrolling** is pure CSS (`scroll-behavior: smooth` with
  `scroll-padding-top: 60px` to clear the sticky nav). No JS is involved in anchor
  navigation.
- **Fonts** (loaded from Google Fonts in one stylesheet link):
  - **Inter** (400/500/600) — body text and most UI.
  - **Montserrat** (400/500/600/700) — display/heading type: hero title, section
    titles, card/notice titles, nav links, the GitHub button, primary/support buttons.
  - **IBM Plex Mono** (400/600) — reserved for code/terminal contexts: code blocks,
    syntax tokens, file/tab labels in code windows, inline `<code>`, the install pill,
    and the `<%= EJS %>` brand stylization in the hero and footer.
  - ⚠️ Drift: `CLAUDE.md` still says "Inter for everything except code." Montserrat
    was added later for display type and is not yet reflected there.
- **PWA bits:** `manifest.json`, `favicon.svg`, and a registered service worker
  (`sw.js`). `theme-color` meta is set to the crimson `#bf225a`.

---

## Theming

Two themes driven entirely by CSS custom properties. The default `:root` block defines
the **light** palette (a cool near-white, not the original cream); `:root[data-theme="dark"]`
overrides those tokens for **dark**. The inline pre-paint script picks the theme; the
nav toggle button flips `data-theme` and persists the choice to `localStorage`.

- The toggle adds a `.no-transitions` class for one frame while switching, so the theme
  change is instant rather than animating every property.
- **Code surfaces stay dark in both themes.** Code windows, the install pill, and the
  embedded snippet in the security notice use a fixed dark background (`--code-bg`) and
  hardcoded syntax-token colors, because the highlighting is tuned for a dark surface.

---

## Design System

### Color tokens (current values in `index.html`)

⚠️ Drift: the token table in `CLAUDE.md` predates the "cooler palette" pass and lists
the older cream values (e.g. `--bg: #f7f1e3`). The values below are what's in the code now.

| Token              | Light       | Dark       | Role |
|--------------------|-------------|------------|------|
| `--bg`             | `#f4f5f3`   | `#101114`  | Page background (cool near-white) |
| `--surface`        | `#fcfdfb`   | `#181a1e`  | Cards, notices, raised panels |
| `--surface-faint`  | `#ebedea`   | `#0d0e11`  | Quote blocks, subtle fills |
| `--surface-deep`   | `#dee0dc`   | `#090a0d`  | Footer background |
| `--border`         | `#d1d4cf`   | `#26282d`  | Standard borders |
| `--border-subtle`  | `#e5e7e3`   | `#181a1e`  | Hairline dividers |
| `--text-primary`   | `#1a1a1a`   | `#eef0f3`  | Headings |
| `--text-body`      | `#1f1f1f`   | `#dee0e4`  | Body copy |
| `--text-secondary` | `#4f535a`   | `#a4a7ae`  | Muted text, labels |
| `--text-faint`     | `#e4e6e2`   | `#1c1e22`  | Oversized faint numerals (feature count) |
| `--green`          | `#9eb44e`   | `#b4ca65`  | Brand green (icons, accents) |
| `--green-link`     | `#557d0c`   | `#b4ca65`  | Green text links (AA-contrast in light) |
| `--crimson`        | `#bf225a`   | `#bf225a`  | EJS delimiter accent, section labels |
| `--code-bg`        | `#1c1c1c`   | `#1c1c1c`  | Code surface (fixed both themes) |

There are also extensive **3D-button and panel token families** —
`--btn-face`/`--btn-highlight`/`--btn-drop`/`--edge-*` (and `--primary-*` and
`--code-*` variants) — that drive the layered `box-shadow` "physical button" look on
buttons and cards. The hero has its own token group (`--hero-bg`, `--hero-ink`,
`--hero-surface`, `--hero-grain-opacity`, etc.).

### Syntax-highlight classes

⚠️ Drift: `CLAUDE.md` documents an older set of token colors. The code now uses a
Monokai-style palette and added `.t-path`:

| Class    | Color     | Used for |
|----------|-----------|----------|
| `.t-tag` | `#bf225a` | EJS / template delimiters (`<% %>`, `{{ }}`) |
| `.t-var` | `#ff6188` | Variables, function/property names |
| `.t-kw`  | `#ab9df2` | JavaScript keywords |
| `.t-str` | `#a9dc76` | Strings |
| `.t-path`| `#fc9867` | File paths in CLI examples |
| `.t-html`| `#939293` | Literal HTML tags |
| `.t-cm`  | `#78dce8` | Comments / shell prompt (`$`) |

### Typography & layout conventions

- Content is capped at `max-width: 1120px` and centered; sections pad `96px 48px`.
- Section rhythm: a small uppercase crimson `.section-label`, a `.section-title`
  (Montserrat), an optional `.section-intro`, then the section content.
- Buttons and cards share the layered `box-shadow` "raised" treatment and a small
  `translateY` press animation on `:active`.

---

## Sections

In document order:

1. **Nav** (`.nav`, sticky) — logo, center anchor links (Why EJS, About, Features,
   Get Started, Docs, Support), theme toggle, GitHub button. Transparent over the hero;
   gains a background + shadow once scrolled (`.scrolled`). Active link tracks scroll
   position via the scroll-spy script.
2. **Hero** (`#hero`) — green gradient band with a noise-grain overlay and a giant
   `<%=` watermark. Holds the `<%= EJS %>` title, tagline, "Get Started" primary button,
   an `npm install ejs` copy pill, and a stats strip (20M+ downloads, 7.7k stars,
   0 dependencies). Pulled up under the nav via negative margin so the nav blends into it.
3. **Compare** (`#compare`, "Why EJS") — tabbed old-way (Handlebars / Pug / Mustache)
   vs. the EJS way, side by side, to make the "it's just JavaScript" argument concrete.
4. **About** (`#about`) — "What is EJS?" intro, a six-card feature grid, and the
   **security notice** (crimson left-border callout with the "do not submit this
   snippet" guidance).
5. **Features** (`#features`) — asymmetric grid: heading on the left, two-column
   checklist of capabilities on the right.
6. **Get Started** (`#install`) — stacked "blocks," each a description paired with a
   dark code window: npm install, ESM/CJS tabs, render a template, CLI usage, browser build.
7. **Support** (`#support`) — two cards: Stack Overflow and GitHub Issues.
8. **License** (`#license`) — Apache 2.0 blurb with a shield badge.
9. **Footer** — `<%= EJS %>` mark, copyright/credits, and links (GitHub, License, Security).

---

## Decision Log

Append-only. Newest first. Entries marked _(rationale unconfirmed)_ are my inference
from the diff and commit message — correct them and I'll update.

### 2026-05-30 — Green hero, cooler palette, nav-into-hero blend
- **What:** Introduced a green gradient hero band with a noise-grain overlay and an
  oversized `<%=` watermark; shifted the whole light palette from warm cream to a cool
  near-white (`--bg` → `#f4f5f3`); added a hero-specific token group; made the nav
  transparent over the hero and only show its background/shadow once scrolled
  (`.scrolled`), with the hero pulled up under it via negative margin.
- **Why:** The warm cream didn't have a slick, modern look. Cooler tones read as more
  technical, which fits a developer tool. The green hero is a bold, impactful anchor for
  the top of the page, and tying it to the brand accent gives it presence.
- **Commit:** `7fe99fd`

### 2026-05-30 — Refine color tokens and nav styling
- **What:** Reworked the color token set and nav treatment — the first step toward the
  cooler palette.
- **Why:** Moving the palette toward the cooler, more technical direction (see the
  green-hero entry above); tightening token consistency and nav polish along the way.
- **Commit:** `10e369d`

### Initial landing-page redesign
- **What:** Full redesign of the landing page — new section structure (Compare, About,
  Features, Get Started, Support, License), the 3D-button/panel shadow system, scroll-spy
  nav, and the dark-in-both-themes code surfaces.
- **Why:** _(rationale unconfirmed)_ Modernize the site and restructure around the "just
  JavaScript" pitch.
- **Commit:** `581fafe`
