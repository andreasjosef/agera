---
title: "@ccpilot/persistence"
---

Data Infrastructure & Storage

## Purpose
This package job is to satisfy the contracts defined by `@repo/domain` using **Drizzle ORM** and **PostgreSQL**.

## Structure
- `src/db/client.ts`: The Drizzle connection pool.
- `src/db/schema.ts`: Drizzle SQL table definitions.
- `src/repositories/`: Factory functions that implement domain interfaces.

## Key Patterns
We use **Factory Functions** instead of classes for repositories.

Example: `const repo = createRequirementRepo(db);`

## Tech Stack
- **ORM:** Drizzle
- **Database:** PostgreSQL
- **Migrations:** Managed via `drizzle-kit` within this package.

## Constraints
- **Dependencies:** Strictly depends on `@repo/domain`.
- **Logic:** This package should contain **zero** business logic. It only handles mapping, querying, and persistence.

---
*To run migrations: `pnpm exec drizzle-kit generate && pnpm exec drizzle-kit migrate` within this folder.*