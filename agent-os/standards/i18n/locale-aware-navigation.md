---
name: locale-aware-navigation
description: Import Link/redirect/useRouter from @/i18n/navigation, never from next/*. Preserves locale prefix automatically.
metadata:
  type: standard
---

# Locale-aware navigation

**Always** import navigation primitives from `@/i18n/navigation`:

```ts
import { Link, useRouter, redirect, usePathname } from "@/i18n/navigation";
```

**Never** from `next/link` or `next/navigation` — they drop the locale prefix and break i18n routing.

- `<Link href="/reports">` automatically becomes `/es/reports` or `/en/reports`.
- `router.push("/login")` respects the current locale.
- To switch locales: `router.replace(pathname, { locale: "en" })`.

The only files that touch `next-intl`'s lower-level APIs are `src/i18n/*.ts` and `src/middleware.ts`. Everything else uses the re-exports.

Related: [[message-namespaces]], [[locale-params]]
