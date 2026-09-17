# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`CONTEXT-MAP.md`** at the repo root: it points at one `CONTEXT.md` per context (app or package). Read each one relevant to the topic.
- **`docs/adr/`**: system-wide decisions. Also check `apps/<app>/docs/adr/` and `packages/<package>/docs/adr/` for context-scoped decisions in the area you're about to work in.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and `/improve-codebase-architecture`) creates them lazily when terms or decisions actually get resolved.

## File structure

This is a multi-context repo (pnpm monorepo, `apps/*` and `packages/*`):

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← system-wide decisions
├── apps/
│   ├── web/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                  ← context-specific decisions
│   ├── express/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/
│   ├── docs/
│   └── sandbox/
└── packages/
    ├── domain/
    │   ├── CONTEXT.md
    │   └── docs/adr/
    ├── persistence/
    │   ├── CONTEXT.md
    │   └── docs/adr/
    ├── ui/
    ├── ts-fetch/
    ├── auth-betterauth/
    ├── auth-jwt/
    ├── crypto/
    ├── lms-canvas/
    ├── llm-client/
    ├── ef-engine/
    └── cdd-monitor/
```

Each app/package's own `README.md` (per the root `README.md`'s "Package Autonomy" rule) documents its Input/Output/Rules; `CONTEXT.md` is for domain vocabulary and cross-cutting concepts specific to that context, created lazily rather than scaffolded upfront for every package.

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in the relevant `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders), but worth reopening because…_
