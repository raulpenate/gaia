---
name: dry
description: Rule of three — extract on the 3rd repetition. Co-locate first, promote to src/lib only when a 4th cross-feature caller appears.
metadata:
  type: standard
---

# DRY (rule of three)

Extract a helper on the **3rd repetition**, not the 1st.

- 1 copy → write it inline.
- 2 copies → duplicate is fine if the shapes differ even slightly.
- 3 copies → extract: helper, hook, component, or constant.

Why rule of three: a premature abstraction locks in the wrong shape. With three real call sites you can see what's actually variable and what's truly shared.

Don'ts:
- Don't extract a wrapper that just renames a built-in (`getUser = () => db.users.find(...)` with one call site).
- Don't share a component across two screens just because they look similar — UI duplication is cheaper than the wrong abstraction.
- Don't centralize magic numbers as `const ONE = 1`. Name constants only when the name carries meaning (`MAX_REPORTS_PER_PAGE`).

When you do extract:
- Co-locate first (same file or same folder). Promote to `src/lib/` only when a 4th caller appears from a different feature.
- Match the abstraction to the actual variance — don't add params "in case".

Related: [[models-dtos]], [[fe-performance]]
