---
name: adding-a-locale
description: Two steps to add a locale — update routing.ts and create messages/<locale>.json with all existing keys.
metadata:
  type: standard
---

# Adding a locale

Two steps. That's it.

1. Add the locale code to `src/i18n/routing.ts`:
   ```ts
   export const routing = defineRouting({
     locales: ["es", "en", "pt"], // add "pt"
     defaultLocale: "es",
   });
   ```

2. Create `messages/pt.json` with **every** key that exists in `es.json` and `en.json`. Missing keys break the build.

Don't touch:
- `middleware.ts` — it reads `routing` directly.
- `generateStaticParams` in the layout — same.
- Any component — they're all locale-agnostic.

Default locale stays `es`. Don't change it without a product decision.

Related: [[message-namespaces]], [[locale-aware-navigation]]
