---
name: forms-validation
description: Form handling with React 19 actions and Zod — server actions for mutations, client validation for UX, shared schemas.
metadata:
  type: standard
---

# Forms & validation

## Server Actions for mutations

Use React 19 `useActionState` + Next.js Server Actions for form submissions:

```tsx
// actions.ts
"use server";
import { SoilReportInput } from "@/types/dto/soil-report";

export async function submitReport(_prev: unknown, formData: FormData) {
  const parsed = SoilReportInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }
  await db.reports.create(parsed.data);
  return { success: true, errors: null };
}
```

```tsx
// ReportForm.tsx
"use client";
import { useActionState } from "react";
import { submitReport } from "./actions";

export function ReportForm() {
  const [state, action, pending] = useActionState(submitReport, null);
  return (
    <form action={action}>
      <input name="region" />
      {state?.errors?.region && <p className="text-sm text-red-600">{state.errors.region}</p>}
      <button type="submit" disabled={pending}>Submit</button>
    </form>
  );
}
```

## Validation rules

- **One Zod schema per form** — reuse the DTO schema from `src/types/dto/` (see [[models-dtos]]).
- Validate on the server always. Client-side validation is optional UX sugar, not a security boundary.
- Don't duplicate validation logic — import the same Zod schema on both sides.

## UX conventions

- Show field-level errors below the input, not in a toast or alert banner.
- Disable the submit button while `pending` — don't allow double-submission.
- Use `<label>` for every input. No placeholder-only fields.
- For multi-step forms, keep each step in its own component with its own validation.

Related: [[models-dtos]], [[component-structure]], [[accessibility]]
