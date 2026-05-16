# Tech Stack

## Frontend

* **Next.js 15** (App Router, Server Components by default)
* **v0** for clinical UI component generation
* Dark-mode medical software aesthetic — ER triage board + subsoil ultrasound bar charts

## Backend

* **Next.js API Routes** (Node/Express-style serverless handlers on Vercel)
* Server-side only calls to third-party APIs (Open-Meteo) — never exposed to the client

## Database

* **Supabase / PostgreSQL** — stores Soil Medical Records

## AI / Agent Pipeline

* **AgentOS** AI pipeline acting as Expert Agronomist
* Fuzzy clinical logic for health-status classification
* Markdown prescription generation

## External APIs

* **Open-Meteo** (public, no-auth) — soil moisture at 4 depths
* Future: NASA POWER, Copernicus

## Hosting & Tooling

* **Vercel Serverless** — $0 free tier deployment
* **pnpm** — package manager
* **Biome** — linter and formatter
* **TypeScript** — strict typing throughout
