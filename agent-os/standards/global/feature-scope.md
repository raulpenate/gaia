---
name: feature-scope
description: Features declare FE / BE / both scope at shape time. BE-only must not touch FE without permission; FE-only may touch BE only via existing standards.
metadata:
  type: standard
---

# Feature Scope

Every shaped feature declares one of three scopes: **FE**, **BE**, or **both**. The implementer is bound to that scope. Scope changes require re-shaping, not a unilateral expansion mid-implementation.

## The asymmetric rule

- **BE-only** → do not create or modify frontend code. No new pages, no UI tweaks, no client components, no i18n keys, no `app/` routes that render. If the work seems to need FE, stop and ask — don't extend scope.
- **FE-only** → backend changes are allowed *only* when they follow existing standards. A FE feature adding a route handler is fine if it honors [[response-envelope]], [[models-dtos]], and [[server-first]]. A FE feature inventing a new response shape, a bespoke error format, or a non-standard import path is not.
- **both** → must be declared at shape time, not discovered mid-implementation. Both-scoped features still owe the same standards across the boundary.

## Why

AI implementers default to "complete" features and produce a frontend even when only a backend was asked for (or vice versa). At hackathon pace this duplicates work, creates a second unwanted UI, or smuggles ad-hoc backend conventions into a FE task. A declared scope at shape time is the cheapest guardrail: one line in `shape.md`, enforced by every downstream step.

## Don'ts

- Don't add a "small" frontend page to a BE-only spec to "demo" the endpoint. Demos live in `curl`, a test script, or the existing triage dashboard — not in a new page.
- Don't invent a new API response shape from a FE task. Reuse the envelope; if a new endpoint is needed, follow [[models-dtos]] and [[response-envelope]].
- Don't add i18n keys, client components, or `"use client"` files from a BE-only spec. If a UI string changes, that's a separate FE spec.
- Don't silently re-classify mid-implementation. If scope expands, pause the work and re-run `/shape-spec` so the new scope is on record.

## How implementers honor scope

When picking up a plan to execute:

1. Read the `**Scope: <FE|BE|both>**` banner at the top of `plan.md`.
2. Read the `## Scope` section of `shape.md` for the justification.
3. If a task seems to require crossing the line, stop and ask the user — don't infer permission from the task wording.

Related: [[models-dtos]], [[response-envelope]], [[server-first]], [[imports]]
