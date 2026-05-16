---
name: response-envelope
description: All /api routes return { success, data } or { success, error: { code, message } }. Health endpoint is the only exception.
metadata:
  type: standard
---

# API response envelope

Every `src/app/api/**/route.ts` handler returns this shape:

```ts
// success
NextResponse.json({ success: true, data: { ... } });

// failure
NextResponse.json(
  { success: false, error: { code: "VAL_001", message: "..." } },
  { status: 400 },
);
```

- Frontend always reads `success` first, then `data` **or** `error`.
- `error.code` is a short uppercase tag (`VAL_001`, `AUTH_001`, `DB_001`). Pick a code; don't return prose alone.
- `error.message` is human-readable but safe to show — log the full error server-side.
- Status code reflects the actual HTTP outcome (400/401/404/500); the envelope is in addition, not a replacement.

**Exception:** `/api/health` returns a flat shape (`{ status, service, timestamp }`) so load balancers and uptime probes can parse it without knowing our envelope.

DTO validation goes before the response is built — see [[models-dtos]].

Related: [[models-dtos]], [[locale-params]]
