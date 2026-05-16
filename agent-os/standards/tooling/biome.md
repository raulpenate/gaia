---
name: biome
description: Biome is the only linter/formatter. No ESLint, no Prettier. Format rules are fixed by biome.json.
metadata:
  type: standard
---

# Biome (single source of truth)

Biome handles lint + format. **Don't add ESLint or Prettier.**

Commands:
- `pnpm lint` — check (CI uses this)
- `pnpm lint:fix` — auto-fix
- `pnpm format` — format only

Fixed format rules (from `biome.json`, don't change without team agreement):
- Double quotes, semicolons always, trailing commas everywhere
- 2-space indent, 100-char line width
- Imports auto-organized

Active lint warnings to respect:
- `noExplicitAny` — use `unknown` + narrowing, or a real type
- `noNonNullAssertion` — no `value!`; narrow with `if (!value) return` or `??`

Editor: install the Biome extension. Don't fight the formatter on save.

Related: [[pnpm]], [[pre-merge-checks]]
