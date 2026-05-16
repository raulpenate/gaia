---
name: tailwind-usage
description: Tailwind v4 conventions — utility-first, no @apply in components, design tokens via CSS theme, responsive mobile-first.
metadata:
  type: standard
---

# Tailwind usage

Stack: **Tailwind CSS v4** with `@tailwindcss/postcss`.

## Utility-first

- Write utilities directly on elements. No `@apply` in component files — it defeats the co-location benefit.
- `@apply` is acceptable only in `globals.css` for base resets or typography prose styles.
- If a utility string exceeds ~8 classes and repeats across 3+ places, extract a component (not a CSS class). Check if a shadcn primitive already covers the pattern (see [[shadcn]]).

## Design tokens

Tailwind v4 uses CSS-based config. Define tokens in `globals.css` with `@theme`:

```css
@theme {
  --color-soil-healthy: oklch(0.72 0.15 155);
  --color-soil-watch: oklch(0.75 0.15 85);
  --color-soil-critical: oklch(0.55 0.2 25);
  --font-sans: "Inter", sans-serif;
}
```

Reference as `text-soil-healthy`, `bg-soil-critical`, etc. Don't hardcode hex/rgb in utilities.

## Responsive & layout

- Mobile-first: bare utilities = mobile, then `sm:`, `md:`, `lg:`.
- Use `flex` / `grid` for layout. No `float`.
- Prefer `gap-*` over margin between siblings.
- Page-level padding lives on the layout, not on every child.

## Dark mode

- Use `dark:` variant when adding colors. Every custom color should have a dark counterpart or use `oklch` with sufficient contrast in both modes.
- Test both modes before merge.

## Don'ts

- No inline `style={{ }}` unless the value is truly dynamic (e.g., a percentage from data).
- No `!important` utilities (`!text-red-500`) — fix specificity at the source.
- No Tailwind class sorting plugins — Biome handles import order; class order is convention (layout → spacing → typography → color → state).

Related: [[fe-performance]], [[component-structure]]
