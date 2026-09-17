# Free-tier external Postgres provider comparison

Researched 2026-09-17, for the Kubernetes → Railway (backend) + Vercel (frontend) migration.
Backend: `apps/express` via `packages/persistence`, which uses **Drizzle ORM +
`drizzle-orm/node-postgres` + a standard `pg.Pool`** talking to a plain `DATABASE_URL`
(see `packages/persistence/src/db/client.ts`). Railway runs the backend as a
**long-running container**, not ephemeral serverless functions, so the `pg.Pool`
holds a small number of persistent, long-lived connections rather than opening
one connection per request. That single fact drives most of the pooling/gotcha
analysis below: providers that funnel everything through a **transaction-mode
PgBouncer/Supavisor pooler** (meant for high-churn, short-lived connections)
are a worse fit than providers whose **direct, session-oriented connection**
is the one recommended for persistent backends.

All facts below are cited to the provider's own docs/pricing pages or
Railway's own docs, fetched live on 2026-09-17 (not from training data).

---

## Recommendation

**Primary recommendation: Neon.** **Runner-up / acceptable alternative: Supabase.**

Neon's free tier gives a comfortable 0.5 GB storage / 100 CU-hours per project
per month, has an AWS region in **US East (Ohio, `aws-us-east-2`)** that
sits right next to Railway's **US East (Virginia)** region, and — critically —
its PgBouncer pooler supports full session-level behavior well enough that a
persistent `pg.Pool` can use either the direct or pooled hostname without
hitting the "broken features" caveats that transaction-mode poolers usually
carry ([Neon connection pooling docs](https://neon.com/docs/connect/connection-pooling)).
Its scale-to-zero suspend (5 minutes idle) wakes in "a few hundred
milliseconds" ([Neon scale-to-zero docs](https://neon.com/docs/introduction/scale-to-zero)),
so cold-start latency is unlikely to be noticeable for a low-traffic hobby
app, and the free allowance (100 CU-hours ≈ 400 hours/month of a 0.25 CU
instance) comfortably covers a small app that isn't running 24/7 at load.
Supabase is the close second: its docs explicitly recommend the **direct
connection** (not the Supavisor pooler) for "persistent backends, such as
... long-running containers" — exactly our case — but its free-tier project
auto-pauses after **1 week of total inactivity** (not just idle compute) and
direct connections are **IPv6-only unless you pay for the IPv4 add-on**,
which is a real risk if Railway's outbound networking or DNS resolution path
doesn't handle IPv6 cleanly ([Supabase connection docs](https://supabase.com/docs/guides/database/connecting-to-postgres),
[Supabase IPv4 add-on docs](https://supabase.com/docs/guides/platform/ipv4-address)).
Given the app is a fresh, empty, low-traffic database, either is workable;
Neon is the safer default because its pooling story is less fragile for a
`pg.Pool` app and it avoids the IPv4/IPv6 question entirely.

Everything else researched is a worse fit: Aiven's free tier disables
connection pooling entirely and caps `max_connections` at 20
([Aiven free-tier docs](https://aiven.io/docs/products/postgresql/concepts/pg-free-tier)),
Render's free Postgres is deleted after 30 days
([Render free-tier docs](https://render.com/docs/free)), ElephantSQL has shut
down completely, and CockroachDB's free allowance is now a $15/month
resource credit on a **paid-tier organization type** with hard cutoffs (not a
standing free-forever tier), plus a non-standard SQL dialect despite pgwire
compatibility. Railway's own built-in Postgres remains a fine *baseline* —
zero integration friction — but is unmanaged and billed from Railway's usage
credits rather than being free.

---

## Comparison table

| Provider | Free storage | Free connections | Auto-pause / inactivity | Railway integration | Region match to Railway (US West/US East/EU West/SE Asia) |
|---|---|---|---|---|---|
| **Neon** | 0.5 GB/project [[1]](#neon) | Pooler: up to 10,000 client conns via PgBouncer; direct `max_connections` 104–4000 depending on compute size [[2]](#neon) | Compute suspends after 5 min idle, wakes in ~hundreds of ms; cannot be disabled on free tier [[3]](#neon) | No native marketplace resource; manual `DATABASE_URL` paste into Railway env vars [[9]](#neon) | US East (Ohio `aws-us-east-2`, N. Virginia `aws-us-east-1`), US West (Oregon), EU (Frankfurt, London); no SE Asia match to Railway's Singapore region, but AP Singapore/Sydney exist [[4]](#neon) |
| **Supabase** | 500 MB/project [[5]](#supabase) | Micro instance: 60 direct / 200 pooled [[5]](#supabase) | Free projects paused after **1 week** of inactivity; max 2 active free projects [[5]](#supabase) | No native marketplace resource for hosted Supabase; manual `DATABASE_URL`/pooler string paste. (Railway *does* have templates, but those self-host the OSS Supabase stack as containers, a different thing) [[10]](#supabase) | General regions: East US (N. Virginia), West EU (Ireland/Frankfurt/London/Paris), SE Asia (Singapore) — good match incl. Railway's Singapore region [[6]](#supabase) |
| **Aiven for PostgreSQL** | 1 GB disk [[7]](#aiven) | `max_connections` capped at 20; **no connection pooling on free tier** [[7]](#aiven) | Powered off if unused shortly after creation or with no continued activity, with notice; can be reactivated [[7]](#aiven) | No marketplace entry found; manual env var paste | Free tier: pick a general geographic area (North America, Europe, APAC, Australia) but not cloud/specific region — coarse match only [[8]](#aiven) |
| **Render Postgres** | 1 GB (free instance) [[13]](#render) | Not pool-specific on free tier; general Postgres cap ~100 conns for <8GB RAM plans [[12]](#render) | Free DB deleted after **30 days**, 14-day grace period to upgrade first [[13]](#render) | Manual env var paste; no Railway marketplace entry | Not verified for free-tier region set (out of scope; provider not primarily proposed) |
| **CockroachDB Cloud (Basic, ex-Serverless)** | 10 GiB storage credit/month [[14]](#cockroach) | Not documented in Basic-plan docs fetched; wire-protocol (pgwire) compatible with `pg`/node-postgres [[15]](#cockroach) | Hard resource caps, not a suspend: writes blocked at storage cap, cluster disabled at RU cap until next cycle or plan bump [[14]](#cockroach) | Manual env var paste; no Railway marketplace entry | Not verified for free-tier region set (deprioritized: non-standard SQL dialect risk with Drizzle, and Sept 2026 "Cockroach Continuum" pricing overhaul in progress) [[16]](#cockroach) |
| **ElephantSQL** | — | — | — | — | **Shut down completely by 2025-01-27**; no longer viable [[17]](#elephant) |
| **Railway Postgres (built-in, baseline)** | No fixed free storage; billed from usage credits (disk, egress) | Unmanaged image; no documented pooling built in [[11]](#railway) | N/A (always-on container, no pause) | Native: auto-wired via `${{ServiceName.DATABASE_URL}}` variable reference [[11]](#railway) | Same region as your Railway project by construction |

---

## Railway's own regions (for reference)

Per Railway's docs, current deploy regions are:

- **US West** — `us-west2` (California)
- **US East** — `us-east4-eqdc4a` (Virginia)
- **EU West** — `europe-west4-drams3a` (Amsterdam)
- **Southeast Asia** — `asia-southeast1-eqsg3a` (Singapore)

This is one more region than the previously-known "US West / US East / EU
West" — Railway has since added a Southeast Asia region.
[Railway regions docs](https://docs.railway.com/reference/regions)

---

## Per-provider detail

### Neon <a name="neon"></a>

- **Storage & compute**: Free plan = 0.5 GB storage per project, 100 CU-hours/month
  of compute (enough to run a 0.25 CU instance ~400 hrs/month), autoscaling up
  to 2 CU, 5 GB/month public network transfer, 100 projects per org, 10
  branches per project. [1] [Neon plans docs](https://neon.com/docs/introduction/plans)
- **Connections & pooling**: Neon fronts every project with PgBouncer.
  Pooled endpoint uses a `-pooler` suffix in the hostname
  (`...-pooler.us-east-2.aws.neon.tech`); direct endpoint omits it. The
  pooler supports up to 10,000 client connections; actual concurrent
  transactions are capped at ~90% of the compute's `max_connections` (104 for
  a 0.25 CU instance, up to 4000 for 9+ CU). Neon's own docs call out that
  `pg` (node-postgres) works fine against the pooler for connection-churn
  workloads, and recommend the **direct** endpoint only for
  migrations/`pg_dump`/logical replication/session features
  (`LISTEN/NOTIFY`, temp tables, SQL-level `PREPARE`). Since our `pg.Pool` is
  small and long-lived rather than high-churn, either endpoint works; the
  direct endpoint is the simpler/safer default for a persistent pool. [2]
  [Neon connection pooling docs](https://neon.com/docs/connect/connection-pooling)
- **Scale-to-zero**: Free-tier computes always autosuspend after 5 minutes of
  inactivity (cannot be disabled on Free); reactivation happens automatically
  on the next query, in "a few hundred milliseconds." No documented
  hard-fail/hang behavior for the waking connection. [3]
  [Neon scale-to-zero docs](https://neon.com/docs/introduction/scale-to-zero)
- **Regions**: AWS us-east-1 (N. Virginia), us-east-2 (Ohio), us-west-2
  (Oregon), eu-central-1 (Frankfurt), eu-west-2 (London), plus
  ap-southeast-1/2 and sa-east-1. Region is fixed at project creation. [4]
  [Neon regions docs](https://neon.com/docs/introduction/regions)
- **Railway integration**: No native Railway marketplace resource for hosted
  Neon. Neon's own Railway guide has you create the Neon project, copy the
  connection string, and manually add it as Railway's `DATABASE_URL`
  variable; the guide's own sample code builds a `pg.Pool` from that
  connection string. A separate "Next.js with Neon Postgres" Railway
  *template* exists that uses Neon's zero-signup "Instagres" flow, but that's
  a demo starter, not a marketplace database resource with automatic env
  var wiring. [9] [Neon's Railway guide](https://neon.com/docs/guides/railway)

### Supabase <a name="supabase"></a>

- **Storage & compute**: Free plan = 500 MB database storage, Micro compute
  (shared CPU, 500 MB RAM), 5 GB egress + 5 GB cached egress/month, up to
  50,000 MAUs, max 2 active free projects per org (others can be paused). [5]
  [Supabase pricing](https://supabase.com/pricing)
- **Connections & pooling**: Supabase's Micro instance (used by free
  projects) supports 60 direct connections and 200 pooled connections. Three
  connection modes exist: **direct** (port 5432, IPv6 by default, "for
  persistent backends, such as ... long-running containers"), **Supavisor
  session pooler** (port 5432, IPv4, alternative to direct on IPv4-only
  networks), and **Supavisor transaction pooler** (port 6543, IPv4, "for
  serverless and edge functions... does not support prepared statements").
  Supabase's own docs explicitly steer a long-running container app with a
  connection pool toward the **direct** connection, which matches our
  `pg.Pool` usage exactly. SSL is required (`sslmode=require`). [6]
  [Supabase connecting-to-Postgres docs](https://supabase.com/docs/guides/database/connecting-to-postgres)
- **IPv4/IPv6 gotcha**: Direct connections are IPv6-only unless you buy the
  paid IPv4 add-on. Supabase's own docs list platforms known to require IPv4
  (Vercel, GitHub Actions, Render, Retool) and do **not** list Railway,
  implying Railway's egress is IPv6-capable — but this is inferred by
  omission, not confirmed outright by either vendor's docs, so it's worth a
  quick connectivity smoke test before committing. If Railway's networking
  turns out to be IPv4-only in practice, you'd need the paid IPv4 add-on or
  fall back to the session pooler. [Supabase IPv4 docs](https://supabase.com/docs/guides/platform/ipv4-address)
- **Inactivity**: Free projects pause after **1 week of inactivity**
  (calendar-based, not a per-connection idle timer like Neon's). [5]
  [Supabase pricing](https://supabase.com/pricing)
- **Regions**: General regions East US (N. Virginia), Central EU (Frankfurt),
  SE Asia (Singapore), plus specific AWS regions including us-east-1/2,
  us-west-1/2, eu-west-1/2/3, eu-central-1/2, eu-north-1, and APAC/SA
  options. Good overlap with all four Railway regions. [8]
  [Supabase regions docs](https://supabase.com/docs/guides/platform/regions)
- **Railway integration**: No native marketplace resource for hosted
  Supabase either — Railway's "Supabase" templates/guides
  (`docs.railway.com/guides/supabase`) deploy the **open-source Supabase
  stack as self-hosted containers on Railway** (Postgres + GoTrue + PostgREST
  + Storage + Studio, wired together with Railway private networking), which
  is a different thing from pointing your app at Supabase's own managed
  cloud service. Using managed Supabase Cloud means the same manual
  `DATABASE_URL` copy-paste as any other external provider. [10]
  [Railway's self-host Supabase guide](https://docs.railway.com/guides/supabase)

### Aiven for PostgreSQL <a name="aiven"></a>

- **Free tier**: 1 GB disk, 1 CPU / 1 GB RAM VM, `max_connections` capped at
  20, no VPC, no static IPs, **no integrations, no connection pooling**,
  limited to one free service per organization, excluded from Aiven's SLA.
  Free services can be powered off if unused shortly after creation or with
  no continuing activity (with prior notice and easy reactivation). [7]
  [Aiven free-tier docs](https://aiven.io/docs/products/postgresql/concepts/pg-free-tier)
- **Region**: on the free tier you can only choose a broad geographic area
  (North America / Europe / APAC / Australia), not the specific cloud or
  region — Aiven "reserves the right to change the cloud provider, region,
  or configuration at any time." No guaranteed match to a specific Railway
  region. [8] [Aiven search result summary of free-tier region docs](https://aiven.io/docs/products/postgresql/concepts/pg-free-tier)
- **Pooling caveat**: Aiven's PgBouncer offering (on paid plans) requires
  `pgbouncer.max_prepared_statements` to be set to a non-zero value to
  support named prepared statements under transaction/statement pooling —
  moot here since pooling isn't available on the free tier at all.
  [Aiven connection pooling docs](https://aiven.io/docs/products/postgresql/concepts/pg-connection-pooling)
- **Verdict**: the 20-connection cap and total absence of pooling make this
  the tightest fit of the credible options for even a small `pg.Pool`
  ceiling, and the lack of pooling removes the very feature that would
  matter if the free-tier connection cap were ever hit.

### Render Postgres <a name="render"></a>

- **Free plan**: fixed 1 GB storage, one free Postgres instance per
  workspace, no backups, no managed connection pooling, platform can restart
  the DB without notice. The database becomes inaccessible after **30 days**,
  then there's a 14-day grace period to upgrade before Render deletes it and
  its data permanently. [13] [Render free-tier docs](https://render.com/docs/free)
- **Connections/SSL**: external connections require TLS (`sslmode=disable`
  is rejected); ~100 max connections is the general ceiling for databases
  under 8 GB RAM, but this isn't confirmed as the exact free-tier value. [12]
  [Render Postgres connecting docs](https://render.com/docs/postgresql-creating-connecting)
- **Verdict**: the 30-day hard expiry makes Render's free Postgres
  unsuitable as a durable database for this project even though the
  connection/storage numbers look otherwise reasonable; it's designed for
  trials, not standing hobby projects.

### CockroachDB Cloud (Basic, formerly "Serverless") <a name="cockroach"></a>

- **Free allowance**: every CockroachDB Cloud organization gets $15/month of
  resource consumption free, equivalent to 50 million Request Units (RUs)
  and 10 GiB storage per month — this is a **usage credit on an
  otherwise-paid account type**, not a separate always-free plan tier. [14]
  [Cockroach Cloud Basic plan docs](https://docs.cockroachlabs.com/docs/cockroachcloud/plan-your-cluster-basic)
- **Behavior at limits**: hitting the storage cap blocks further writes;
  hitting the RU cap disables the cluster until the next billing cycle or a
  plan increase — a hard stop rather than a graceful throttle or pause. [14]
  (same source)
- **Compatibility**: CockroachDB implements PostgreSQL wire protocol v3
  (pgwire) and documents `node-postgres`/`pg` as a supported driver, so a
  Drizzle + `pg.Pool` app can connect, but CockroachDB is not full SQL/feature
  compatible with PostgreSQL under the hood — some PostgreSQL-specific
  behavior and SQL features differ, which is a real risk surface for an ORM
  like Drizzle that may assume Postgres-specific semantics. [15]
  [CockroachDB PostgreSQL compatibility docs](https://docs.cockroachlabs.com/docs/stable/postgresql-compatibility)
- **Timing note**: Cockroach Labs introduced "Cockroach Continuum" as the
  default for new Cloud organizations created on/after 2026-09-15 (i.e.
  two days before this research), with the current public pricing page
  focused on the new Standard/Mission-Critical paid tiers rather than
  documenting the Basic free allowance — worth re-checking before adoption,
  as the free-tier terms may be mid-transition. [16]
  [Cockroach Labs pricing page](https://www.cockroachlabs.com/pricing/)
- **Verdict**: deprioritized both for the SQL-compatibility risk with
  Drizzle and for the pricing-model churn happening right now.

### ElephantSQL <a name="elephant"></a>

- Announced end-of-life in 2024 (stopped accepting new signups 2024-05-01)
  and **fully shut down by 2025-01-27**. No longer a usable option. [17]
  [ElephantSQL end-of-life announcement](https://www.elephantsql.com/blog/end-of-life-announcement.html)

### Railway Postgres (built-in, baseline) <a name="railway"></a>

- Deployed as an **unmanaged** Postgres image (Railway's own image, based on
  official Postgres with SSL enabled out of the box) — "you have total
  control over their configuration and maintenance," i.e. no managed
  pooling, backups, or free-tier allowance are documented beyond Railway's
  general usage-based billing (disk, egress, network egress billed
  specifically when using the TCP proxy for external connections). [11]
  [Railway PostgreSQL docs](https://docs.railway.com/databases/postgresql)
- **Integration**: this is the one case with a genuinely native,
  zero-config wiring — other services in the same Railway project can
  reference its `DATABASE_URL` via `${{Postgres.DATABASE_URL}}` variable
  references, no manual copy-paste needed.
  [Railway variables docs](https://docs.railway.com/guides/variables)
- **Cost model**: Railway's Free plan includes only $1/month of usage
  credit; the $5/month Hobby plan is the realistic entry point for a small
  always-on Postgres container, so this is not "free" in the same sense as
  the external providers' free tiers, and it doesn't satisfy the project's
  goal of moving the database off self-managed infrastructure onto a
  provider with its own free tier and operational ownership.
  [Railway pricing](https://railway.com/pricing)

---

## Sources

1. Neon plans — <https://neon.com/docs/introduction/plans>
2. Neon connection pooling — <https://neon.com/docs/connect/connection-pooling>
3. Neon scale-to-zero — <https://neon.com/docs/introduction/scale-to-zero>
4. Neon regions — <https://neon.com/docs/introduction/regions>
5. Supabase pricing — <https://supabase.com/pricing>
6. Supabase connecting to Postgres — <https://supabase.com/docs/guides/database/connecting-to-postgres>
7. Aiven PostgreSQL free tier — <https://aiven.io/docs/products/postgresql/concepts/pg-free-tier>
8. Supabase regions — <https://supabase.com/docs/guides/platform/regions>; Aiven free-tier region note (same as [7])
9. Neon's Railway guide — <https://neon.com/docs/guides/railway>
10. Railway self-hosted Supabase guide — <https://docs.railway.com/guides/supabase>
11. Railway PostgreSQL docs — <https://docs.railway.com/databases/postgresql>; Railway variables docs — <https://docs.railway.com/guides/variables>
12. Render Postgres connecting docs — <https://render.com/docs/postgresql-creating-connecting>
13. Render free-tier docs — <https://render.com/docs/free>
14. Cockroach Cloud Basic plan docs — <https://docs.cockroachlabs.com/docs/cockroachcloud/plan-your-cluster-basic>
15. CockroachDB PostgreSQL compatibility docs — <https://docs.cockroachlabs.com/docs/stable/postgresql-compatibility>
16. Cockroach Labs pricing — <https://www.cockroachlabs.com/pricing/>
17. ElephantSQL end-of-life announcement — <https://www.elephantsql.com/blog/end-of-life-announcement.html>
18. Railway regions — <https://docs.railway.com/reference/regions>
19. Railway pricing — <https://railway.com/pricing>
20. Supabase IPv4 add-on docs — <https://supabase.com/docs/guides/platform/ipv4-address>
21. Aiven connection pooling docs — <https://aiven.io/docs/products/postgresql/concepts/pg-connection-pooling>
