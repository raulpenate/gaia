---
name: locale-params
description: Every locale-scoped page/layout awaits params, validates the locale, and calls setRequestLocale. Required for static rendering with next-intl.
metadata:
  type: standard
---

# Locale params (Next 15 + next-intl)

Every file under `src/app/[locale]/` does these three things, in order:

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  // ...
}
```

- `params` is **always** typed `Promise<{ locale: string }>` (Next 15 async params).
- Unknown locale → `notFound()`. Never redirect-to-default; the middleware handles bare paths.
- `setRequestLocale(locale)` is required for static rendering — skipping it forces dynamic rendering.
- `generateStaticParams` lives in the layout, returning `routing.locales.map((locale) => ({ locale }))`.
- `generateMetadata` follows the same pattern (await params, then `getTranslations({ locale, namespace })`).

Related: [[server-first]], [[response-envelope]]
