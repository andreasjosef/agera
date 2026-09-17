# Research: does `apps/express`'s Dockerfile build correctly on Railway in this monorepo?

Ticket: [agera#5](https://github.com/andreasjosef/agera/issues/5) (part of the Railway migration map, [agera#2](https://github.com/andreasjosef/agera/issues/2))

## Verdict

**No Dockerfile changes needed.** On Railway, set the `apps/express` service's **Root Directory to `/`** (i.e. leave it unset/default — do *not* point it at `apps/express`) and set the **Dockerfile Path to `apps/express/Dockerfile`**, via the dashboard's Build settings field (or the `RAILWAY_DOCKERFILE_PATH` service variable). Root Directory *is* Railway's build context, not an independent "context vs. path" toggle — so it must stay at the repo root for this Dockerfile's root-context `COPY`s to resolve. Do not add a `railway.json`/`railway.toml`: Config as Code is deprecated and new services can no longer opt into it (see below); use dashboard settings, optionally backed by Infrastructure-as-Code (`.railway/railway.ts`) later.

## How Railway resolves Root Directory / build context

Railway's build-configuration docs state Root Directory "defaults to `/` but can be changed for various use-cases like monorepo projects," and once set, "all build and deploy commands will operate within the defined root directory." Concretely, this isn't a cosmetic "working directory" — it scopes what Railway even pulls from the repo: "Setting this means that Railway will only pull down files from that directory when creating new deployments" (Monorepo guide). For a Dockerfile build, Railway "will look for and use a `Dockerfile` at the root of the source directory" (Dockerfiles doc) — where "source directory" is exactly the Root Directory.

Applied to this repo: if Root Directory were set to `apps/express` (the naive per-service choice), Railway would only check out `apps/express/`, and the Dockerfile's `COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./`, `COPY packages/ ./packages/`, and `COPY packages/auth-betterauth/package.json ...` lines would all fail — those paths live one level up, outside the pulled tree. **Root Directory does become the build context**; it is not layered independently from a separate "Dockerfile path" concept the way, say, a plain `docker build -f <path> <context>` invocation lets you pick a context different from where the Dockerfile lives.

The fix is the mirror image of what this repo's existing GitLab CI already does (`.gitlab-ci.yml`: `docker build -t $BACKEND_IMAGE:latest -f apps/express/Dockerfile .` — context `.` = repo root, `-f` pointing at the nested Dockerfile). Railway's equivalent of `-f` without moving the context is: **leave Root Directory at `/`, and separately set the Dockerfile Path** to `apps/express/Dockerfile`. This is confirmed by Railway's own Dockerfiles doc, which describes exactly this override path independent of Root Directory: "In your service variables, set a variable named `RAILWAY_DOCKERFILE_PATH` to specify the path to the file" (e.g. `apps/express/Dockerfile`), and by a Railway staff answer on a near-identical monorepo question on Railway's Help Station ("shared monorepo dockerfile"): for services that build from a shared/parent directory, the recommended fix was to set the Dockerfile path via a service variable *without* setting a Root Directory at all, rather than reaching for a per-service `railway.json`.

## Config file: none needed, and `railway.json`/`railway.toml` is a dead end for a new service

Railway's **Config as Code** (`railway.json` / `railway.toml`) is deprecated. Per Railway's docs: existing config files "continue to work for services that already use them until 2026-12-01 (hard cutoff)," but critically, **"new services cannot opt into Config as Code."** Since the Railway service for `apps/express` doesn't exist yet (this is a fresh migration off Kubernetes), creating a `railway.json` with `build.dockerfilePath` is not an available option — skip it.

There's also a sharp edge worth knowing even if that weren't true: "The Railway Config File does not follow the Root Directory path. You have to specify the absolute path for the `railway.json` or `railway.toml` file, for example: `/backend/railway.toml`" — another reason the dashboard-settings route is simpler here.

The forward-looking replacement is **Infrastructure as Code** (`.railway/railway.ts`, TypeScript, GA). Its `service()`/`github()` source config takes a `rootDirectory` option, and — per Railway's IaC reference — when both `rootDirectory` and a Dockerfile path are used, "the `dockerfilePath` is resolved relative to the `rootDirectory`." Since our recommendation is to keep `rootDirectory` at the repo root (i.e. omit it), the Dockerfile path set via `RAILWAY_DOCKERFILE_PATH` would be `apps/express/Dockerfile` unchanged. IaC is not required to get this service building, though — plain dashboard settings (Root Directory left default + Dockerfile Path field, or the `RAILWAY_DOCKERFILE_PATH` variable) are sufficient and are what's recommended for now.

**Concrete settings for the `apps/express` Railway service:**
- Root Directory: `/` (leave default/unset)
- Dockerfile Path (dashboard Build settings) or `RAILWAY_DOCKERFILE_PATH` service variable: `apps/express/Dockerfile`
- Builder: Dockerfile (auto-detected once the path resolves)
- Recommended, optional: a Watch Pattern of `/apps/express/**`, `/packages/**`, `/pnpm-lock.yaml` so pushes touching only `apps/web` or docs don't trigger an express rebuild — mirroring the `rules: changes:` block this repo's `.gitlab-ci.yml` already uses for `build_backend`. (Watch Patterns "still operate from `/`" regardless of Root Directory, per Railway's build-configuration doc, so these paths don't need adjusting even though Root Directory stays at `/`.)

## pnpm workspace: nothing beyond what the Dockerfile already does

The Dockerfile already runs `RUN corepack enable` before `pnpm install --frozen-lockfile`, and — because Root Directory stays at the repo root — `pnpm-lock.yaml` and `pnpm-workspace.yaml` are copied from their real location at the repo root (`COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./`). No Railway-specific handling (e.g. a build-time `corepack prepare` variable, or relocating the lockfile) is needed; this is a plain Docker build once the context is right, not a Railpack/Nixpacks build, so Railway does not try to auto-detect a package manager or Node version — it just executes the Dockerfile as written.

One unrelated, minor finding while reading the workspace shape: `pnpm-workspace.yaml` lists `domain` as a workspace glob (`packages: ['apps/*', 'packages/*', 'domain']`), but there is no top-level `domain/` directory in the repo — the actual `@ccpilot/domain` package lives at `packages/domain`, already covered by the `packages/*` glob. This looks like a stale/redundant entry, not a Railway build blocker (pnpm silently ignores a workspace glob that matches nothing), but worth cleaning up separately.

## Sources

- [Deploying a Monorepo — Railway Docs](https://docs.railway.com/guides/monorepo)
- [Dockerfiles — Railway Docs](https://docs.railway.com/builds/dockerfiles)
- [Build Configuration — Railway Docs](https://docs.railway.com/builds/build-configuration)
- [Using Config as Code — Railway Docs](https://docs.railway.com/config-as-code)
- [Config as Code Reference — Railway Docs](https://docs.railway.com/config-as-code/reference)
- [Infrastructure as Code — Railway Docs](https://docs.railway.com/infrastructure-as-code)
- [Infrastructure as Code Reference — Railway Docs](https://docs.railway.com/infrastructure-as-code/reference)
- [shared monorepo dockerfile — Railway Help Station](https://station.railway.com/questions/shared-monorepo-dockerfile-76867578)

## Repo files consulted

- `apps/express/Dockerfile`
- `pnpm-workspace.yaml`
- `package.json` (root)
- `turbo.json`
- `.gitlab-ci.yml` (existing `docker build -f apps/express/Dockerfile .` invocation, confirming the current root-context assumption and giving a working reference point)
