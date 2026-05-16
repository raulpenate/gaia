# References for Satellite Soil APIs

## Similar Implementations

**None in-repo.** This branch is greenfield apart from:

- `src/app/api/health/route.ts` — only existing route. Flat response (exempt from envelope). Not a useful template for tRPC procedures; included only to confirm that `/api` works.
- `src/i18n/*`, `src/middleware.ts`, `src/app/[locale]/*` — locale/i18n plumbing (next-intl). Unrelated to this spec but the locale layout is preserved.

No prior HTTP client, no prior Zod usage, no prior `src/lib/` or `src/types/dto/` content. This spec creates those folders.

## External docs to reference during implementation

- **Open-Meteo Soil Moisture API** — public endpoints, no key. Hourly forecast endpoint with `soil_moisture_*` and `soil_temperature_*` variables. See `https://open-meteo.com/en/docs`.
- **OpenWeatherMap Agro 1.0** — requires polygon creation (`POST /agro/1.0/polygons`) then NDVI history (`GET /agro/1.0/ndvi/history`). See `https://agromonitoring.com/api`.
- **NASA FIRMS Area API** — bbox-based CSV endpoint with VIIRS_SNPP_NRT or MODIS_NRT sensors. See `https://firms.modaps.eosdis.nasa.gov/api/area/`.
- **tRPC v11 fetch adapter** — `fetchRequestHandler` in `@trpc/server/adapters/fetch`. App Router mounts at `src/app/api/trpc/[trpc]/route.ts` exporting `GET` and `POST`.
