# Product Requirements Document (PRD)

## Project: SoilMedic SV (The Earth's Clinic)

### 1. Product Vision Overview

SoilMedic SV is an environmental and agricultural impact platform that redefines soil degradation monitoring in El Salvador and LATAM. Instead of relying on traditional, abstract cartographic dashboards, the system treats agricultural land plots as **"individual patients,"** generating a dynamic **Soil Medical Record**.

The system performs cross-validation by combining quantitative telemetry metrics from space satellites ("space lab analysis") with qualitative physical symptoms reported directly on the ground by farmers ("physical symptoms"). An AI agent pipeline acts as the **Expert Agronomist**, diagnosing the soil's health status and writing immediate mitigation prescriptions to prevent desertification and crop failure.

---

### 2. Strategic Objectives (Hackathon Success Metrics)

* **Extreme Technical Viability:** Real-time data processing using pre-analyzed telemetry REST APIs (Open-Meteo/Agro API), bypassing the technical debt of handling heavy geospatial imagery formats (.HDF5/GeoTIFF) under a tight 72-hour timeline.
* **$0 Operational Cost:** Strict use of free tier services (Open-Meteo public tier, Vercel Serverless, Supabase/PostgreSQL) to meet strict budget constraints.
* **Disruptive UX (Blue Ocean):** A clinical software aesthetic that eliminates generic weather maps, focusing instead on an emergency room triage board and soil "ultrasounds" generated via v0.
* **Open Source & Deployed:** Modular, decoupled system architecture with a fully functional AI agent pipeline deployed in production before the 72-hour mark.

---

### 3. System Architecture & Data Flow

```
[ Frontend Form (v0) ] ──(Coordinates + Human Symptoms)──> [ Backend API (Node/Express) ]
                                                                        │
   ┌────────────────────────────────────────────────────────────────────┘
   ▼
[ Ingestion Worker ] ───> HTTP REST Request to Open-Meteo API (Soil Moisture at 4 Depths)
   │
   ▼
[ Consolidated JSON Payload ] ───> [ AgentOS: AI Pipeline (Expert Agronomist) ]
                                              │
                                              ▼
[ DB (Supabase/PostgreSQL) ] <─── (Saves Medical Record) ─── [ UI: Clinical Ultrasound View ]
```

---

### 4. Functional Requirements

#### RF-01: Patient Admission (Form Submission)

* The system shall allow users (farmers or environmental watchdogs) to register a plot of land by sending their current GPS coordinates via mobile or selecting key agricultural coordinates in El Salvador.
* The user must complete a rapid physical symptom questionnaire:
  * **Apparent Color:** (Fertile Black, Clay/Reddish Brown, Degraded Grey/Pale).
  * **Odor:** (Fresh rain/Healthy, Chemical/Acidic, Rotten/Anaerobic, Odorless/Inert).
  * **Biological Indicators:** Visible presence of earthworms (Yes / No / Scarce).
  * **Structure:** (Loose/Spongy, Cracked by drought, Compacted like concrete).

#### RF-02: Vital Signs Extraction (Telemetry Ingestion)

* Upon receiving the patient's coordinates, the backend shall asynchronously fetch the soil hydration profile from Open-Meteo's no-auth API across 4 critical depths simultaneously:
  * Layer 1: 0 to 7 cm (Surface Moisture).
  * Layer 2: 7 to 28 cm (Short-root Moisture).
  * Layer 3: 28 to 100 cm (Intermediate Subsoil Moisture).
  * Layer 4: 100 to 255 cm (Deep Water Reserve).

#### RF-03: Agentic Diagnosis Pipeline (AgentOS)

* An AI agent shall process the consolidated data payload (Satellite Metrics + Ground Farmer Report).
* The agent shall evaluate the inputs using fuzzy clinical logic to assign a global health status (`HEALTHY`, `UNDER_OBSERVATION`, `EMERGENCY_ROOM`, `CRITICAL_BIOLOGICAL_DEATH`).
* **Medical Prescription Generation:** The agent shall generate a technical mitigation plan in Markdown format, detailing:
  * Root cause of the soil's stress.
  * Immediate mitigation actions (e.g., biochar incorporation, cover-cropping to prevent thermal erosion, immediate crop rotation, or specific organic matter addition).

#### RF-04: Emergency Triage Dashboard (UI with v0)

* **Main Screen (ER Waiting Room):** A list of monitored land plots in El Salvador, sorted from highest to lowest environmental severity.
* **Patient Record View:** A dark-mode medical software interface that renders bar charts representing moisture levels across depths—simulating a subsoil ultrasound scan—accompanied by the textual diagnosis written by the AI agronomist.

---

### 5. Non-Functional Requirements

* **RNF-01 (Security & Cost Boundaries):** Third-party API calls to Open-Meteo must be handled entirely server-side to protect client performance and data aggregation integrity.
* **RNF-02 (Performance Optimization):** The agent's diagnosis pipeline must not block the backend's main thread; state management will handle asynchronous loading skeletons gracefully on the UI.
* **RNF-03 (Responsiveness):** The data entry form must be 100% Mobile-First, ensuring usability for field workers operating on unstable 3G/4G networks in rural El Salvador.

---

### 6. Central Data Schema (The Contract)

```json
{
  "patient_id": "plot-zapotitan-001",
  "coordinates": { "lat": 13.7833, "lng": -89.3333 },
  "admission_date": "2026-05-16T13:30:00Z",
  "satellite_vital_signs": {
    "surface_moisture_0_7cm": 0.12,
    "root_moisture_7_28cm": 0.18,
    "subsoil_moisture_28_100cm": 0.35,
    "deep_reserve_100_255cm": 0.42
  },
  "field_symptoms": {
    "color": "Pale Grey",
    "odor": "Odorless/Inert",
    "compaction": "HIGH",
    "visible_life": "Scarce"
  },
  "medical_diagnosis": {
    "health_status": "EMERGENCY_ROOM",
    "pathology": "Severe surface dehydration combined with extreme mechanical compaction due to intensive over-farming.",
    "mitigation_prescription_markdown": "### Required Treatment:\n1. **Halt mechanical tilling** immediately to prevent further loss of subsurface moisture.\n2. **Apply organic mulch** over the topsoil layer to drastically reduce evaporation caused by direct solar radiation.\n3. **Inoculate mycorrhizal fungi** to stimulate root absorption from lower subsoil channels (28-100cm) which still maintain stable hydration metrics."
  }
}
```
