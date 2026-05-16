---
name: models-dtos
description: Two-layer model/DTO boundary — DB row ≠ API DTO, UI reuses the DTO. Zod for validation.
metadata:
  type: standard
---

# Models & DTOs

Hackathon-pragmatic boundary: **DB model ≠ API DTO**, but UI reuses the API DTO.

- **Model** — DB row shape (Drizzle/Prisma row, raw SQL result). Lives in `src/lib/db/` or `src/types/db.ts`.
- **DTO** — what crosses the API edge (request body, response payload). Lives in `src/types/dto/` or co-located near the route. Defined with Zod.
- **UI** — consumes the DTO directly. Don't invent a third "view model" unless the shape genuinely differs.

```ts
// src/types/dto/soil-report.ts
import { z } from "zod";

export const SoilReportDTO = z.object({
  id: z.string().uuid(),
  region: z.string(),
  severity: z.enum(["healthy", "watch", "critical"]),
  reportedAt: z.string().datetime(),
});
export type SoilReportDTO = z.infer<typeof SoilReportDTO>;
```

- Never return a DB row directly from a route handler — map model → DTO first.
- Never accept `req.body` without `DTO.parse(...)`.
- DTO field names are camelCase; DB columns can be snake_case — map at the boundary.
- One Zod schema per DTO; export both the schema and the inferred type with the same name.

Related: [[dry]], [[fe-performance]]
