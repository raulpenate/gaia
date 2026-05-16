---
name: server-first
description: Server Components by default. "use client" only for state/effects/events/browser APIs, pushed to the leaf.
metadata:
  type: standard
---

# Server Components by default

Server Components are the default in `app/`. Add `"use client"` only when the component needs one of:

- `useState`, `useReducer`, `useRef`
- `useEffect`, `useLayoutEffect`
- Event handlers (`onClick`, `onChange`, ...)
- Browser-only APIs (`window`, `localStorage`, `IntersectionObserver`)
- A client-only library

Rules:
- Pages and layouts stay server. Use `getTranslations` / `getMessages`, not `useTranslations`, in server files.
- Push `"use client"` to the **leaf** — wrap the interactive button, not the whole page.
- A server component can render a client component as a child and pass serializable props (including children).
- A client component **cannot** import a server component, but can receive one via `children`.

```tsx
// page.tsx (server)
import { ClientFilters } from "./client-filters";
export default async function Page() {
  const reports = await db.reports.findAll();
  return <ClientFilters>{reports.map(...)}</ClientFilters>;
}

// client-filters.tsx (client)
"use client";
export function ClientFilters({ children }: { children: React.ReactNode }) { ... }
```

Related: [[locale-params]], [[fe-performance]]
