---
name: pnpm
description: pnpm only — pinned via package.json `packageManager`. Never commit npm/yarn lockfiles.
metadata:
  type: standard
---

# pnpm only

`pnpm` is pinned via `packageManager: "pnpm@10.28.0"` in `package.json`. CI assumes pnpm.

- Install: `pnpm install`
- Add a dep: `pnpm add <pkg>`
- Add a dev dep: `pnpm add -D <pkg>`
- Run a script: `pnpm <script>` (not `npm run`)

Never:
- Commit `package-lock.json` or `yarn.lock`
- Run `npm install` or `yarn` (creates the wrong lockfile, drifts deps)
- Bump the `packageManager` field without team agreement

Related: [[biome]], [[pre-merge-checks]]
