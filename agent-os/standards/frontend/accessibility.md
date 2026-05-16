---
name: accessibility
description: Baseline a11y — semantic HTML, keyboard navigation, ARIA only when needed, color contrast, focus management.
metadata:
  type: standard
---

# Accessibility

Baseline target: **WCAG 2.1 AA**.

## Semantic HTML first

- Use `<button>` for actions, `<a>` (via `Link`) for navigation. Never `<div onClick>`.
- Use `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>` over generic `<div>`.
- Headings (`h1`–`h6`) follow document outline — one `h1` per page, no skipped levels.
- Use `<ul>`/`<ol>` for lists of items, `<table>` for tabular data.

## Keyboard navigation

- Every interactive element must be reachable via Tab and activatable via Enter/Space.
- Custom components (dropdowns, modals, tabs) need explicit `tabIndex`, `role`, and key handlers.
- Trap focus inside modals — return focus to the trigger on close.
- Visible focus rings: don't remove `outline` without providing an equivalent `ring-*` utility.

## ARIA

- Prefer semantic HTML over ARIA — a `<button>` beats `<div role="button">`.
- When ARIA is needed: `aria-label` for icon-only buttons, `aria-live="polite"` for dynamic status updates, `aria-expanded` for toggleable sections.
- Never use `aria-hidden="true"` on focusable elements.

## Color & contrast

- Text on backgrounds must meet 4.5:1 contrast (3:1 for large text).
- Don't rely on color alone to convey meaning — add an icon, pattern, or text label alongside.
- Soil severity indicators: use both color and a text label (`healthy`, `watch`, `critical`).

## Images & media

- Every `<img>` / `next/image` gets a meaningful `alt`. Decorative images get `alt=""`.
- Charts and maps need a text summary or `aria-label` describing the key insight.

## Testing

- Tab through new UI before merge — every control should be reachable and operable.
- Check with browser DevTools accessibility panel for missing labels or roles.

Related: [[forms-validation]], [[component-structure]]
