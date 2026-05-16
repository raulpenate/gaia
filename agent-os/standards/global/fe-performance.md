---
name: fe-performance
description: FE perf priorities — bundle size first, server-first rendering, then network/images. Concrete rules for Next 15 + Tailwind.
metadata:
  type: standard
---

# Frontend performance

Priorities (in order): **bundle size → server-first rendering → network/images**.

## Bundle size
- Audit before adding any dep > ~10KB gzipped. Prefer native APIs (`fetch`, `Intl`, `Date`) over libraries.
- Avoid moment, lodash (whole), date-fns (whole). Use targeted imports: `import debounce from "lodash/debounce"`.
- Heavy client-only code goes behind `next/dynamic` with `ssr: false` and a skeleton fallback.

```ts
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});
```

- No barrel files in `src/components/index.ts` that re-export everything — kills tree-shaking.

## Server-first rendering
- Default to Server Components. Add `"use client"` only for: state, effects, event handlers, browser APIs, refs.
- Push `"use client"` as far down the tree as possible — wrap the leaf, not the page.
- Fetch on the server with `await` in the component; don't `useEffect(fetch)` if you don't have to.

## Network / images
- `next/image` for every raster image. Always set `width`/`height` or `fill` + container.
- `next/font` for fonts — no `<link>` to Google Fonts.
- Cache route handlers explicitly: `export const revalidate = 60` or `force-static`.

## Quick checks before merge
- `pnpm build` — note any route over 200KB First Load JS.
- No `<img>`, `<link rel="stylesheet" href="https://...">`, or top-level `useEffect(fetch)` in new code.

Related: [[dry]], [[models-dtos]]
