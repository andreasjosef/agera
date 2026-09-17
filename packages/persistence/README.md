# @ccpilot/persistence
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

## Database provider
Production runs on **Neon** (free tier, `eu-central-1`/Frankfurt), part of the Kubernetes → Railway/Vercel/Neon cutover ([issue #11](https://github.com/AndreasJosef/agera/issues/11)). The direct (non-pooled) connection endpoint is used, since `client.ts` builds a single long-lived `pg.Pool` for a persistent backend container rather than high-churn serverless calls, and Neon's docs recommend the direct endpoint for that shape of workload over its PgBouncer pooler.

**Supabase is the documented fallback** if Neon's pooling or IPv6 behavior ever becomes a problem, with no pre-committed switch trigger — it's an escape hatch, not a plan. Two caveats to weigh before switching: its free tier pauses a project after a week of total inactivity (a calendar timer, not Neon's per-connection idle suspend), and its direct connection is IPv6-only unless you pay for the IPv4 add-on.

## Constraints
- **Dependencies:** Strictly depends on `@repo/domain`.
- **Logic:** This package should contain **zero** business logic. It only handles mapping, querying, and persistence.

---
*To run migrations: `pnpm exec drizzle-kit generate && pnpm exec drizzle-kit migrate` within this folder.*
