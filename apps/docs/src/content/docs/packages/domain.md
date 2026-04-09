---
title: "@ccpilot/domain"
---

Business Logic & Contracts

## Purpose
This package contains the business rules for ccpilot. This is DNA of the system. It is strictly **Infrastructure Agnostic**—it does not know about databases, APIs, or the web.

## Structure
We organize by domain entity and capabilities:

### Domain Slices - `src/requirements/`, etc
- `types.ts`: Pure TypeScript interfaces
- `schema.ts`: Zod validation
- `repository.ts`: Interface definitions
- `actions.ts`: Pure business logic functions

### Core Services - `src/services`
- `*.ts`: Interface definitions for external capabilities. These interaces act
as Ports into our internal architecture

## Constraints
- **NO** database drivers (Drizzle/Postgres).
- **NO** network calls (Fetch/Axios).
- **NO** environment variables.
- **Dependencies:** Only utility libraries (e.g., Zod).

## The Contracts
- `@ccpilot/persistence` must implement the interfaces defined in `src/*/repository.ts`.
- `@ccpilot/llm-client` (and other packages) must implement interfaces in
`src/services/*.ts`

---
*Note: This package must build first. All other packages depend on this.*