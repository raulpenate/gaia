# Satellite Soil APIs — Shaping Notes

## Scope

Backend integration layer that exposes soil moisture, vegetation (NDVI), and active-fire data for any `{ lat, lng }` in El Salvador (or anywhere — input is unbounded). Three upstream APIs picked specifically because they avoid raw NASA geospatial formats:

- **Open-Meteo** — soil moisture + temp at 4 depths, no API key, free up to 10k req/day.
- **OpenWeatherMap Agro** — surface moisture + NDVI, free up to 5k req/day, needs key + polygon.
- **NASA FIRMS** — active fire detections, CSV/JSON, free, needs MAP_KEY.

Constraint: 72-hour hackathon, <$10 budget (effectively $0).

## Decisions

| Decision | Choice | Why |
|---|---|---|
| APIs in scope | All three | Each maps to a different "vital sign" — hydration, nutrition, acute trauma |
| Deliverable | Backend only (tRPC procedures + route handler) | Fastest path; UI lands in a follow-up spec |
| Coordinate input | `{ lat, lng }` Zod-validated procedure input | Reusable; no hardcoding lets us reuse for any region |
| Caching | None — direct passthrough | Within free tier, simpler. Revisit if it becomes a bottleneck |
| API layer | **tRPC v11** | User directive — tRPC is now the default for all future APIs. Existing `{ success, data }` envelope applies only to non-tRPC routes (`/api/health`, future webhooks) |
| Env validation | Lazy via `src/lib/env.ts` | Dev server boots without keys; only the procedure that needs the key fails when called |
| Agro polygon strategy | In-memory `Map<rounded-coord, polygonId>` | Avoids polygon-spam on the free account without needing real persistence |

## Context

- **Visuals:** None provided. Backend only — no UI in this spec.
- **References:** None. The branch is greenfield apart from `/api/health` and i18n scaffolding.
- **Product alignment:** README positions Gaia as a medical-style diagnostic for Latin American soil — this spec lays the "blood panel" data ingestion that future "patient chart" UI will read from.

## Standards applied

- `api/trpc` — **new** standard introduced by this spec; defines the tRPC project layout.
- `api/response-envelope` — amended to note tRPC is the default; this envelope applies only to non-tRPC routes.
- `global/models-dtos` — every procedure input and output is a Zod schema; `src/types/dto/` holds the DTOs.
- `global/imports` — `@/...` for cross-folder.
- `nextjs/server-first` — clients live in `src/lib/satellite/*`, called from server-side tRPC procedures.
- `tooling/pre-merge-checks` — `pnpm lint && pnpm typecheck && pnpm build` gate before merge.
