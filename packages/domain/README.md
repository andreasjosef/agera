# @ccpilot/domain
Business Logic & Contracts

## Purpose
This package contains the business rules for ccpilot. This is the DNA of the system. It is strictly **Infrastructure Agnostic**—it does not know about databases, APIs, or the web.

## Structure
We organize by domain entity and capabilities:

### Shared Foundation - `src/shared`
- `result.ts`: Railway-oriented `Result<T>` type (`Success<T> | Failure`). All domain operations return this; no exceptions are thrown.
- `context.ts`: `AppContext` — the central DI container. Bundles repos and services and is passed explicitly to actions.
- `constants.ts`: Shared constants and enums.

### Domain Slices - `src/requirements/`, `src/integrations/`, `src/users/`

Each slice contains:
- `definitions.ts`: Zod schemas and their inferred types. This is the single source of truth — types are derived via `z.infer<>`. Repository interfaces are defined here for smaller slices (integrations, users), or in a separate `repository.ts` for larger slices (requirements).
- `repository.ts`: (requirements only) The `IRequirementRepository` interface — 11 methods spanning retrieval, stats, and mutations.
- `actions/`: One file per action. Each is a standalone `export async function` that receives dependencies explicitly and returns `Promise<Result<T>>`.
- `index.ts`: Barrel file re-exporting definitions, repository (if separate), and all actions.
- `prompts/`: (requirements only) Swedish-language LLM prompt templates as `.sv.txt` files, bundled by a generated manifest and loaded at runtime.

### Core Services - `src/services`
- `llm.ts`, `canvas.ts`, `auth.ts`: Interface definitions for external capabilities. These act as ports into our internal architecture.
- `ef-engine.ts`: A concrete implementation — the Executive Function priority scoring algorithm. (Exception to the interface-only rule.)

Services are re-exported directly from the root `index.ts` (no separate barrel).

### Root Barrel - `src/index.ts`
Re-exports everything: shared utilities, each domain slice (via its `index.ts`), and all service interfaces.

## Constraints
- **NO** database drivers (Drizzle/Postgres).
- **NO** network calls (Fetch/Axios).
- **NO** environment variables.
- **Dependencies:** Only utility libraries (e.g., Zod, date-fns).

## The Contracts
- `@ccpilot/persistence` must implement the repository interfaces defined in `src/*/repository.ts` (and `src/*/definitions.ts` for smaller slices).
- `@ccpilot/llm-client` (and other packages) must implement interfaces in `src/services/*.ts`.

---
*Note: This package must build first. All other packages depend on this.*