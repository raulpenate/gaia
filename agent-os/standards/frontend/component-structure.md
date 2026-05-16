---
name: component-structure
description: File layout and naming for React components — one component per file, co-locate styles/types/tests, PascalCase files.
metadata:
  type: standard
---

# Component structure

## Naming & files

- One exported component per file. File name = component name in PascalCase: `SoilCard.tsx`.
- Co-locate related files in the same folder when the component grows:
  ```
  src/components/SoilCard/
    SoilCard.tsx
    SoilCard.test.tsx
    useSoilCard.ts        # hook used only by this component
  ```
- Pages and layouts keep Next.js conventions: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`.

## Props

- Define props inline for simple components (≤ 3 props). Extract a `type Props` above the component for anything larger.
- Prefer `children: React.ReactNode` over render-prop patterns unless you need to pass data back up.
- Avoid spreading `...rest` onto DOM elements — explicitly forward only the props you need.

```tsx
type Props = {
  region: string;
  severity: "healthy" | "watch" | "critical";
  onSelect?: (id: string) => void;
};

export function SoilCard({ region, severity, onSelect }: Props) {
  return (
    <button
      type="button"
      className="rounded-lg border p-4"
      onClick={() => onSelect?.(region)}
    >
      {region} — {severity}
    </button>
  );
}
```

## Composition rules

- Prefer composition over config. A component with 6+ boolean props probably wants to be split.
- Don't pass className as a prop unless the component is a design-system primitive (shadcn `ui/` components already support this). Page-level components own their layout.
- Server Components can render Client Components as children — use this to keep interactivity at the leaf (see [[server-first]]).

Related: [[dry]], [[server-first]], [[tailwind-usage]], [[shadcn]]
