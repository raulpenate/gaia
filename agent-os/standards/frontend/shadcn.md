---
name: shadcn
description: shadcn/ui as the component library — copy-paste primitives in src/components/ui, customize via Tailwind tokens, never wrap without reason.
metadata:
  type: standard
---

# shadcn/ui

shadcn/ui is the component library. Components are copied into the project (not installed as a package) and owned by us.

## File layout

- All shadcn primitives live in `src/components/ui/` — this is the only place for them.
- Feature components that compose primitives live in `src/components/` (e.g., `SoilCard.tsx` uses `Card` from `ui/card`).
- Don't move or rename shadcn files — the CLI expects the default paths for updates.

```
src/components/
  ui/
    button.tsx
    card.tsx
    dialog.tsx
    input.tsx
    ...
  SoilCard.tsx        # composes ui/card + ui/button
  ReportForm.tsx      # composes ui/input + ui/button
```

## Adding components

```bash
pnpm dlx shadcn@latest add <component>
```

- Add only what you need — don't bulk-install the entire library.
- After adding, verify it respects the project's Tailwind tokens (colors, radius, fonts).

## Customization rules

- **Style via Tailwind tokens**, not by editing shadcn source. Override colors, radius, and spacing in `globals.css` `@theme` block so all primitives update together.
- Edit a shadcn component directly only when you need structural changes (extra slots, different HTML elements).
- Don't wrap a shadcn component in another component just to add a className — pass `className` directly:

```tsx
// Good
<Button className="w-full" variant="destructive">Delete</Button>

// Bad — unnecessary wrapper
function FullWidthButton(props) {
  return <Button className="w-full" {...props} />;
}
```

## Variants & props

- Use the built-in `variant` and `size` props. Don't add custom variants unless the design system genuinely needs them.
- For project-specific compound components (e.g., a status badge with severity color), compose shadcn primitives with `cva` or plain conditional classes:

```tsx
import { Badge } from "@/components/ui/badge";

const severityClass = {
  healthy: "bg-soil-healthy text-white",
  watch: "bg-soil-watch text-black",
  critical: "bg-soil-critical text-white",
} as const;

export function SeverityBadge({ severity }: { severity: keyof typeof severityClass }) {
  return <Badge className={severityClass[severity]}>{severity}</Badge>;
}
```

## Don'ts

- Don't install a second component library (Radix primitives are already under the hood).
- Don't use raw Radix imports — go through the shadcn wrapper so styling stays consistent.
- Don't delete the `cn()` utility from `src/lib/utils.ts` — shadcn components depend on it.
- Don't add `"use client"` to shadcn files that don't already have it — some are server-safe.

Related: [[component-structure]], [[tailwind-usage]], [[accessibility]]
