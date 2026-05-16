---
name: message-namespaces
description: Group message keys under feature namespaces in messages/*.json. Every key must exist in every locale file.
metadata:
  type: standard
---

# Message namespaces

Group keys by **feature**, not by page or component:

```json
// messages/es.json
{
  "Home": { "title": "...", "tagline": "..." },
  "SoilReport": { "submit": "Enviar reporte", "severity.critical": "Crítico" }
}
```

- One top-level namespace per feature (`Home`, `SoilReport`, `Auth`, ...).
- Use dot-notation inside a namespace for sub-keys (`severity.critical`) — not nested objects.
- **Every key exists in every locale file.** When you add a key to `es.json`, add it to `en.json` in the same commit.
- Use the namespace at the call site:
  ```ts
  const t = await getTranslations("SoilReport");
  t("submit");
  ```
- Never inline literal strings in JSX — every user-visible string goes through `t(...)`.

Related: [[locale-aware-navigation]], [[adding-a-locale]]
