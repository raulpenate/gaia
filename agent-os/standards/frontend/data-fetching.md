---
name: data-fetching
description: Fetch on the server by default, use Suspense for streaming, cache with Next.js revalidation. No useEffect(fetch).
metadata:
  type: standard
---

# Data fetching

## Server-first fetching

Fetch data in Server Components with `async/await` — the component is the data layer:

```tsx
// src/app/[locale]/reports/page.tsx
export default async function ReportsPage() {
  const reports = await db.reports.findMany({ orderBy: { reportedAt: "desc" } });
  return <ReportList reports={reports} />;
}
```

- No `useEffect` + `fetch` for initial data loads. Server Components eliminate the loading spinner on first paint.
- Pass fetched data as props to Client Components that need interactivity.

## Suspense boundaries

Wrap slow async components in `<Suspense>` for streaming:

```tsx
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Suspense fallback={<StatsSkeleton />}>
        <StatsPanel />
      </Suspense>
      <Suspense fallback={<MapSkeleton />}>
        <RegionMap />
      </Suspense>
    </div>
  );
}
```

- Each Suspense boundary streams independently — fast panels render first.
- Place boundaries around independent data sections, not around the entire page.

## Caching & revalidation

- Use Next.js `revalidate` for time-based caching:
  ```ts
  export const revalidate = 60; // seconds
  ```
- For on-demand revalidation after mutations, call `revalidatePath` or `revalidateTag` in Server Actions.
- Don't cache user-specific data on shared routes — use `cookies()` or `headers()` to opt out of static caching.

## Client-side fetching (escape hatch)

Use client-side fetching only when:
- Data depends on client-only state (e.g., geolocation, viewport-dependent queries).
- Real-time updates are needed (WebSocket, polling).

When you must fetch client-side:
- Call internal `/api/` routes, not external services directly.
- Handle loading, error, and empty states explicitly.
- Debounce user-triggered fetches (search inputs, filters).

Related: [[server-first]], [[fe-performance]], [[error-handling]]
