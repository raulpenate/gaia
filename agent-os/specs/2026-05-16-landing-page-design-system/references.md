# References for Landing Page + Design System

## Source Materials

### GAIA Design System CSS
- **Location:** External file `gaia-design-system.css`
- **Relevance:** Single source of truth for color tokens, typography, spacing, radius, shadows, and utility classes
- **Key patterns:** CSS custom properties with light/dark mode via `[data-theme]`, utility classes prefixed with `gaia-`

### SoilMedic Landing Page HTML
- **Location:** External file `SoilMedic Landing Page.html`
- **Relevance:** Full landing page mockup with all sections, content, and interactions
- **Key patterns:** Fixed header, hero with gradient, alternating light/dark sections, glassmorphism cards, signup modal

## Existing Code References

### i18n Pattern
- **Location:** `src/app/[locale]/page.tsx`, `src/app/[locale]/layout.tsx`
- **Relevance:** Established pattern for server-side translations with `getTranslations`
- **Key patterns:** `setRequestLocale`, `generateStaticParams`, `NextIntlClientProvider`

### API Response Envelope
- **Location:** `src/app/api/weather/route.ts`
- **Relevance:** Established pattern for consistent API responses
- **Key patterns:** `{ success, data | error }` envelope
