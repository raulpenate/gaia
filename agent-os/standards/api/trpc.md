---
name: trpc
description: tRPC v11 is the default API layer. Procedures live under src/server/trpc/, inputs are Zod-validated, server components call via a server-side caller.
metadata:
  type: standard
---

# tRPC

tRPC v11 is the default API layer for Gaia. New backend endpoints are tRPC **procedures**, not Next.js route handlers. The `{ success, data }` envelope (see [[response-envelope]]) is reserved for non-tRPC routes — currently just `/api/health` and any future webhooks/healthchecks.

## Layout

```
src/
├── app/api/trpc/[trpc]/route.ts   # fetch adapter mount — exports GET and POST
└── server/trpc/
    ├── trpc.ts                    # initTRPC, exports { router, publicProcedure, createCallerFactory }
    ├── router.ts                  # root router (merges feature routers), exports AppRouter type
    ├── caller.ts                  # createCaller for server-side calls
    └── routers/<feature>.ts       # one router per feature (soil, reports, ...)
```

- One router per feature in `src/server/trpc/routers/`. Mount it on the root router in `src/server/trpc/router.ts`.
- Procedure names are camelCase verbs/nouns: `soil.moisture`, `reports.list`, `reports.create`.
- Use `.query()` for reads, `.mutation()` for writes.

## Inputs

- Every procedure must call `.input(SomeZodSchema)`. No exceptions.
- DTOs live in `src/types/dto/` and are imported by procedures (ties back to [[models-dtos]]).
- Reuse schemas across procedures — don't redefine `Coordinates` per router.

## Errors

- Throw `TRPCError({ code, message })` — never `throw new Error(...)`.
- Use the standard codes: `BAD_REQUEST` (Zod handles this for you on input), `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `PRECONDITION_FAILED` (e.g. missing env var), `BAD_GATEWAY` (upstream API failed), `INTERNAL_SERVER_ERROR`.
- tRPC's own envelope (`{ result }` / `{ error }`) makes the manual `{ success, error }` shape redundant — don't wrap.

## Calling procedures

- **Server Components / server actions / other procedures:** use the server caller from `src/server/trpc/caller.ts` — `const caller = createCaller({}); await caller.soil.moisture({ lat, lng })`. No network hop. Ties back to [[server-first]].
- **Client Components:** only when there's real interactivity (form submit, polling, etc.). Push the `"use client"` boundary to the leaf and use `@trpc/react-query` then.

## Transformer

`superjson` is the default transformer (handles `Date`, `Map`, etc.). Configured once in `src/server/trpc/trpc.ts`.

Related: [[response-envelope]], [[models-dtos]], [[server-first]], [[imports]]
