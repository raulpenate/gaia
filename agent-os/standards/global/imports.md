---
name: imports
description: Use `@/...` for cross-folder imports; relative paths only within the same folder. Biome organizes imports automatically.
metadata:
  type: standard
---

# Imports

- **Cross-folder** → `@/...` alias.
  ```ts
  import { routing } from "@/i18n/routing";
  import { Button } from "@/components/Button";
  ```
- **Same folder** → relative.
  ```ts
  import { helper } from "./helper";
  ```
- Never `../../something` — if you're climbing two levels, use `@/`.
- Don't create barrel `index.ts` files that re-export everything (kills tree-shaking — see [[fe-performance]]).
- Biome runs `organizeImports` on save; don't hand-sort.

Related: [[fe-performance]], [[server-first]]
