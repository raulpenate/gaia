# Landing Page + Design System -- Shaping Notes

## Scope

Integrate the GAIA design system CSS tokens into Tailwind v4's `@theme` block and build the full landing page as Next.js server/client components with bilingual i18n support.

## Decisions

- **Pure Tailwind, no shadcn** -- landing page is presentational; shadcn overhead not justified. Tokens will flow into shadcn when added for the dashboard later.
- **Gradient-only hero** -- no background image asset, uses CSS gradient on `gaia-earth-900`.
- **Inline SVGs as React components** -- co-located with landing components.
- **Independent modal instances** -- each CTA renders its own `SignupTrigger` with its own modal. No shared state, no context provider.
- **Signup modal is UI shell only** -- no real auth backend wired up.
- **Section components** -- each landing section is its own component in `src/components/landing/`.
- **Server-first** -- only 4 client components (MobileMenu, LanguageSelector, SignupModal, SignupTrigger).

## Context

- **Visuals:** Design from `gaia-design-system.css` (tokens) and `SoilMedic Landing Page.html` (structure/content).
- **References:** Existing `page.tsx` and `layout.tsx` for i18n patterns.
- **Product alignment:** Matches PRD RF-04 clinical/ER aesthetic. Establishes the visual foundation referenced in `tech-stack.md`.

## Standards Applied

- `frontend/tailwind-usage` -- @theme tokens, utility-first, no @apply in components
- `frontend/component-structure` -- one component per file, PascalCase, co-locate types
- `nextjs/server-first` -- server by default, "use client" at interactive leaves
- `frontend/accessibility` -- semantic HTML, keyboard nav, focus trap in modal, ARIA
- `i18n/message-namespaces` -- Landing namespace, all keys in both locales
