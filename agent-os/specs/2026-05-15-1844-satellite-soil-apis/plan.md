# Satellite Soil APIs — Spec Plan

## Context

Gaia diagnoses soil health by crossing satellite data with farmer reports, but `feature/add-nasa-api` currently has zero data layer — the only route is `/api/health`. Raw NASA AppEEARS/Earthdata returns HDF5/NetCDF/GeoTIFF that requires GDAL-class processing — non-viable for a 72-hour hackathon. The fix is to bypass NASA's raw tiles and use three "analysis-ready" APIs that already turn satellite data into clean JSON:

1. **Open-Meteo** — soil moisture + temperature at 4 depths (`0–7`, `7–28`, `28–100`, `100–255 cm`). No key, no signup, free.
2. **OpenWeatherMap Agro** — surface soil moisture + NDVI vegetation index. Free tier: 5,000 calls/day, needs API key + polygon registration.
3. **NASA FIRMS** — active fire/burn detections as clean CSV/JSON. Free, needs a MAP_KEY.

The deliverable is the **backend integration layer only** — no UI yet. The user also directed us to standardize on **tRPC** going forward, so this spec lands tRPC scaffolding alongside the three soil procedures and codifies the convention in `agent-os/standards/`.

## Decisions

- **APIs in scope:** all three (Open-Meteo, OpenWeatherMap Agro, NASA FIRMS).
- **Deliverable:** backend only — tRPC procedures + a tRPC route handler. No pages, no UI.
- **Coordinate input:** `{ lat, lng }` as procedure input (validated by Zod).
- **Caching:** none — direct passthrough.
- **API layer:** **tRPC** (new project standard). The existing `response-envelope` standard becomes the rule for non-tRPC routes only.

## Tasks

1. Save spec documentation (this folder).
2. Adopt tRPC as project standard — add `agent-os/standards/api/trpc.md`, amend `response-envelope.md`, update `index.yml`.
3. Install dependencies + env scaffold — `pnpm add @trpc/server @trpc/client zod superjson`, update `.env.example`, add `src/lib/env.ts`.
4. tRPC base wiring — `src/server/trpc/{trpc,router,caller}.ts`, fetch adapter at `src/app/api/trpc/[trpc]/route.ts`, `Coordinates` DTO.
5. `soil.moisture` procedure — `src/lib/satellite/open-meteo.ts` + `SoilMoistureReading` DTO.
6. `soil.vegetation` procedure — `src/lib/satellite/agro.ts` (polygon-cache strategy) + `VegetationReading` DTO.
7. `soil.fires` procedure — `src/lib/satellite/firms.ts` (CSV parse) + `FireReading` DTO.
8. Verification — `pnpm typecheck && pnpm lint && pnpm build`, then dev server smoke against all three procedures.

## Critical files

- `agent-os/standards/api/trpc.md` (new), `agent-os/standards/api/response-envelope.md` (amend), `agent-os/standards/index.yml` (add).
- `.env.example` (replace placeholder).
- `src/lib/env.ts`, `src/lib/satellite/{open-meteo,agro,firms}.ts`.
- `src/types/dto/{coordinates,soil-reading}.ts`.
- `src/server/trpc/{trpc,router,caller}.ts`, `src/server/trpc/routers/soil.ts`.
- `src/app/api/trpc/[trpc]/route.ts`.

## Verification

End-to-end manual checks once the dev server is running:

```bash
# Open-Meteo (no key needed)
curl 'http://localhost:3000/api/trpc/soil.moisture?input=%7B%22json%22%3A%7B%22lat%22%3A13.69%2C%22lng%22%3A-89.21%7D%7D'

# NASA FIRMS (needs NASA_FIRMS_MAP_KEY)
curl 'http://localhost:3000/api/trpc/soil.fires?input=%7B%22json%22%3A%7B%22lat%22%3A13.69%2C%22lng%22%3A-89.21%7D%7D'

# Agro NDVI (needs OPENWEATHER_AGRO_API_KEY)
curl 'http://localhost:3000/api/trpc/soil.vegetation?input=%7B%22json%22%3A%7B%22lat%22%3A13.69%2C%22lng%22%3A-89.21%7D%7D'
```

Confirm: HTTP 200, valid JSON, DTO shape matches. Then call any procedure with `lat=999` to confirm Zod rejects with `BAD_REQUEST`. Then call `soil.vegetation` with no env key to confirm `PRECONDITION_FAILED` is returned (no 500).
