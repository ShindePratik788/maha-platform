# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A dependency-free SaaS admin dashboard written in plain HTML, CSS and ES5-style JavaScript. There is no build step, no package manager, no linter and no test suite, and the app runs only on mock data (there is no backend). The folder is not a git repository.

## Running

You can open `login.html` directly in a browser, or serve the folder with `python -m http.server 8000` (or `npx serve .`). Any email and password signs you in. The only automated check available is a syntax check, for example `node --check js/app.js`.

## Architecture

- **Global namespace, no modules.** Every file is an IIFE that attaches to `window.App`:
  - `App.ui`: DOM helpers, modal, toast, dataTable
  - `App.charts`: SVG line and bar charts
  - `App.store`: persisted state
  - `App.router`: hash router
  - `App.pages.<id>`: one per page
  - `App.theme`: light/dark theme
- **Script order matters.** It is fixed by the `<script>` tags at the bottom of `index.html`: data → ui → charts → router → pages → `app.js`. Any new page file must come before `app.js`.
- **`app.js` boots the app.** It runs the mock auth guard (no `maha.auth` in localStorage sends you to `login.html`), builds the sidebar from `App.menu`, wires up the topbar and user menu, then calls `App.router.start()`.
- **Routing and pages.** Routes look like `#/<id>` and map to `App.pages[id]`, which is `{ title, render(view) }`. On every navigation the router clears `#view` and calls `render` again, so pages rebuild their whole DOM each time and keep no state between renders. To add a menu page, follow the three steps in README.md: create the page file, add its script tag, and add it to `App.menu`.
- **DOM building.** Everything is built with `ui.el("tag.class1.class2", attrs?, ...children)`. Attributes that start with `on` become event listeners. Prefer this helper over writing HTML strings. Reusable pieces are `ui.modal`, `ui.confirm`, `ui.toast`, `ui.badge`/`ui.statusBadge`, and `ui.dataTable` (search, filter, sort and pagination; its config options are documented in the comment above it in `js/ui.js`).
- **State.** `App.store.state` is loaded from localStorage key `maha.store.v1` and falls back to `seed()` in `js/data.js`. After changing state, call `App.store.save()`, then usually `App.router.refresh()` to re-render. Static reference data (`App.plans`, `App.metrics`, `App.permissionLabels`) is not persisted. If you change the shape of the seed data, existing saved state goes stale; users can clear it with "Reset demo data" in the user menu, or you can bump the storage key.
- **Storage conventions.** localStorage keys use the `maha.` prefix (`maha.auth`, `maha.store.v1`, `maha.theme`), and every storage access is wrapped in try/catch so the app still works when storage is blocked.

## Styling and theming

- **Tokens.** All colors, shadows and radii are CSS custom properties defined in `css/base.css`. The light values sit under `:root`; the dark overrides sit under `:root[data-theme="dark"]`. Components and charts must use `var(--…)` tokens and never hardcoded colors, or they won't switch themes. Charts get their colors from CSS classes in `components.css`, not from inline attributes.
- **Theme script.** `js/theme.js` is loaded as a blocking script in `<head>` on both HTML pages, before the stylesheets, so `data-theme` is set before the first paint.
- **Theme behavior.** The theme follows the OS preference until the user picks one with the toggle; after that, the saved choice in `maha.theme` wins. Other open tabs stay in sync through the `storage` event.
- **Contrast.** Text and background token pairs currently meet WCAG AA (4.5:1) in both themes. Re-check contrast when you change a token.
- **Stylesheet roles.** `layout.css` covers the app shell, grids and responsive breakpoints (1200px collapses the sidebar to icons; 900px turns it into an off-canvas drawer). `components.css` covers everything reusable.
- **`login.html` loads less.** It loads only `base.css`, `components.css` and `theme.js`; it does not load `layout.css` or `ui.js`. As a result, `theme.js` carries its own SVG icons, and the `.brand` logo styles from `layout.css` don't apply on the login page.
