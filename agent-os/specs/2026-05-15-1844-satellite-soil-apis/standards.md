# Standards for Satellite Soil APIs

The following standards apply to this spec. Snapshotted here so the spec is self-contained — the canonical files live in `agent-os/standards/`.

---

## api/trpc

tRPC v11 is the default API layer for Gaia. New backend endpoints are tRPC **procedures**, not Next.js route handlers. The `{ success, data }` envelope is reserved for non-tRPC routes — currently just `/api/health` and any future webhooks/healthchecks.

**Layout**

```
src/
├── app/api/trpc/[trpc]/route.ts   # fetch adapter mount
└── server/trpc/
    ├── trpc.ts
    ├── router.ts
    ├── caller.ts
    └── routers/<feature>.ts
```

- Procedure names are camelCase: `soil.moisture`, `reports.list`.
- `.query()` for reads, `.mutation()` for writes.

**Inputs** — every procedure calls `.input(SomeZodSchema)`. DTOs live in `src/types/dto/`.

**Errors** — throw `TRPCError({ code, message })`. Codes: `BAD_REQUEST`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `PRECONDITION_FAILED`, `BAD_GATEWAY`, `INTERNAL_SERVER_ERROR`.

**Calling** — Server Components use the server caller from `src/server/trpc/caller.ts`. Client components only when there's real interactivity (push `"use client"` to the leaf).

**Transformer** — `superjson` configured once in `src/server/trpc/trpc.ts`.

---

## api/response-envelope

tRPC procedures are the default API layer (see `api/trpc`). This envelope applies to **non-tRPC route handlers only**.

```ts
// success
NextResponse.json({ success: true, data: { ... } });

// failure
NextResponse.json(
  { success: false, error: { code: "VAL_001", message: "..." } },
  { status: 400 },
);
```

- `error.code` is a short uppercase tag.
- Status code reflects HTTP outcome (400/401/404/500).
- `/api/health` is exempt — flat shape for load balancers.

---

## global/models-dtos

- **Model** — DB row shape (in `src/lib/db/` or `src/types/db.ts`).
- **DTO** — what crosses the API edge (`src/types/dto/`, Zod-defined). UI reuses the DTO.
- DTO fields are camelCase; map at the boundary.
- One Zod schema per DTO; export schema and inferred type with the same name.

```ts
export const SoilReportDTO = z.object({ ... });
export type SoilReportDTO = z.infer<typeof SoilReportDTO>;
```

---

## global/imports

- Cross-folder → `@/...` alias.
- Same folder → relative.
- Never `../../something`.
- No barrel `index.ts` re-exports.

---

## nextjs/server-first

- Server Components by default.
- `"use client"` only for `useState`/`useEffect`/event handlers/browser APIs.
- Push the client boundary to the leaf.
- Server components can render client components and pass serializable props.

---

## tooling/pre-merge-checks

Before merge: `pnpm lint && pnpm typecheck && pnpm build` must all pass.
