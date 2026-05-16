---
name: error-handling
description: Error boundaries per route, typed error returns from server actions, user-facing messages via i18n.
metadata:
  type: standard
---

# Error handling

## Route-level error boundaries

Every route segment should have an `error.tsx`:

```tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <button type="button" onClick={reset} className="underline">
        Try again
      </button>
    </div>
  );
}
```

- Don't show raw error messages to users — log them server-side, show a generic message client-side.
- Use `error.digest` to correlate client errors with server logs.

## Server Action errors

Return structured errors, never throw from actions:

```ts
type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> };
```

- Validation errors → field-level `errors` object (see [[forms-validation]]).
- Unexpected errors → catch, log, return `{ success: false, errors: { _root: ["Unexpected error"] } }`.
- Never expose stack traces, DB errors, or internal paths to the client.

## Loading states

- Use `loading.tsx` per route segment for Suspense fallbacks.
- For client components, show a skeleton or spinner — never a blank screen.
- Prefer `<Suspense fallback={<Skeleton />}>` around async server components over full-page loaders.

## Not found

- Use `notFound()` from `next/navigation` when a resource doesn't exist — Next.js renders `not-found.tsx`.
- Don't return `null` or an empty div when data is missing.

Related: [[forms-validation]], [[server-first]]
