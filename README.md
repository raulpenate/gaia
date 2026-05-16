# Gaia 🌱

**Soil that can no longer heal alone.**

A medical-style diagnostic platform for Latin American soil — crossing satellite data with reports from farmers and rural communities to surface AI-driven alerts when soil enters "critical condition."

> Most climate apps look at the sky — temperature, air, rainfall. Almost nobody looks down. Gaia treats the soil like a patient: a medical record with history, symptoms, and prognosis.

**Read this in Spanish:** [README.es.md](./README.es.md)

---

## Stack

| Layer        | Choice                                  |
| ------------ | --------------------------------------- |
| Framework    | [Next.js 15](https://nextjs.org) (App Router) |
| Language     | TypeScript (strict)                     |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com) |
| i18n         | [next-intl](https://next-intl.dev) — `es` (default), `en` |
| Lint / Format| [Biome](https://biomejs.dev)            |
| Package mgr  | [pnpm](https://pnpm.io)                 |

---

## Getting started

```bash
pnpm install
pnpm dev
```

Open:

- <http://localhost:3000> → redirects to `/es`
- <http://localhost:3000/en> → English
- <http://localhost:3000/api/health> → healthcheck JSON

---

## Scripts

| Command           | What it does                          |
| ----------------- | ------------------------------------- |
| `pnpm dev`        | Start dev server on `:3000`           |
| `pnpm build`      | Production build                      |
| `pnpm start`      | Run the production build              |
| `pnpm lint`       | Biome lint + format check             |
| `pnpm lint:fix`   | Biome auto-fix                        |
| `pnpm format`     | Biome format only                     |
| `pnpm typecheck`  | `tsc --noEmit`                        |

---

## Folder layout

```
gaia/
├── messages/                # i18n strings (en.json, es.json)
├── public/                  # static assets
└── src/
    ├── middleware.ts        # next-intl locale routing
    ├── i18n/                # routing, navigation, request config
    ├── app/
    │   ├── [locale]/        # locale-scoped pages
    │   └── api/             # route handlers
    ├── components/          # shared UI
    ├── lib/                 # utilities, clients
    └── types/               # shared types
```

---

## Adding translations

1. Open `messages/es.json` and `messages/en.json`
2. Add the same key in both files under the right namespace
3. Use it in a server or client component:

```tsx
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("Home");
  return <h1>{t("title")}</h1>;
}
```

---

## Roadmap (not yet implemented)

- Soil "medical record" data model + persistence
- Farmer / community report submission flow
- Satellite data ingestion pipeline
- Radiograph-style visualization layer
- AI cross-referencing of satellite + community signals
- Auth for community members
