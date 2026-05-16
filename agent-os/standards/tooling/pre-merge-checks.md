---
name: pre-merge-checks
description: Three commands must pass before merge — pnpm lint, pnpm typecheck, pnpm build.
metadata:
  type: standard
---

# Pre-merge checks

Run these three before opening a PR (and they must pass in CI before merge):

```bash
pnpm lint        # Biome check (lint + format)
pnpm typecheck   # tsc --noEmit
pnpm build       # Next.js production build
```

- `pnpm build` catches things `typecheck` misses (server/client boundary, RSC violations, route conflicts).
- If `pnpm lint` flags something, fix it — don't disable rules per-file.
- If `pnpm build` warns about First Load JS over 200KB, see [[fe-performance]].

Don't `--no-verify` past hooks. If a hook fails, fix the underlying issue.

Related: [[biome]], [[pnpm]], [[fe-performance]]
