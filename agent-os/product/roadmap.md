# Product Roadmap

## Phase 1: MVP (Hackathon — 72h)

* **RF-01** Patient Admission Form — GPS coordinates + physical symptom questionnaire (color, odor, biological indicators, structure). Mobile-first, works on 3G/4G.
* **RF-02** Vital Signs Ingestion — Asynchronous fetch of soil moisture at 4 depths (0–7 cm, 7–28 cm, 28–100 cm, 100–255 cm) from Open-Meteo no-auth REST API.
* **RF-03** Agentic Diagnosis Pipeline — AI agent assigns health status (`HEALTHY`, `UNDER_OBSERVATION`, `EMERGENCY_ROOM`, `CRITICAL_BIOLOGICAL_DEATH`) and generates a Markdown mitigation prescription.
* **RF-04** Emergency Triage Dashboard — ER waiting-room list sorted by severity + dark-mode patient record view with subsoil ultrasound bar charts.
* Full deployment on Vercel Serverless + Supabase/PostgreSQL at $0 operational cost.

## Phase 2: Post-Launch

* Expand coverage beyond El Salvador to the broader LATAM region.
* Historical trend tracking per plot (time-series moisture graphs).
* Push notifications / SMS alerts for plots that enter `EMERGENCY_ROOM` or `CRITICAL_BIOLOGICAL_DEATH` status.
* Integration with additional satellite data sources (NASA POWER, Copernicus) for richer telemetry.
* Multi-language support (Spanish primary, indigenous language localization).
* Offline-capable PWA for field workers with zero connectivity.
