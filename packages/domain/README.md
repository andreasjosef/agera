# @repo/domain
Business Logic & Contracts

## Purpose
This package contains the business rules for ccpilot. It contains the DNA of the system. It is strictly **Infrastructure Agnostic**—it does not know about databases, APIs, or the web.

## Structure
We organize by domain entity. Each slice contains:
- `types.ts`: Pure TypeScript interfaces
- `schema.ts`: Zod validation
- `repository.ts`: Interface definitions
- `actions.ts`: Pure business logic functions

## Constraints
- **NO** database drivers (Drizzle/Postgres).
- **NO** network calls (Fetch/Axios).
- **NO** environment variables.
- **Dependencies:** Only utility libraries (e.g., Zod).

## The Contract
Persistence must implement the interfaces defined in `src/*/repository.ts`.

---
*Note: This package must build first. All other packages depend on this.*
