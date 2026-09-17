# Research: configuring `apps/web` on Vercel in this pnpm-workspace monorepo

- Ticket: [agera#6](https://github.com/andreasjosef/agera/issues/6)
- Map: [agera#2](https://github.com/andreasjosef/agera/issues/2)
- Date: 2026-09-17

## Verdict

Vercel's built-in pnpm-workspace + Turborepo monorepo support **just works** for
`apps/web` with **no `vercel.json` required**, using these Project settings:

| Setting | Value |
|---|---|
| Root Directory | `apps/web` |
| Framework Preset | Vite (auto-detected from `apps/web/package.json` + `vite.config.ts`) |
| Install Command | auto-detected — `pnpm install`, run from the **repo root** (Vercel checks out and installs the whole workspace even though Root Directory is `apps/web`) |
| Build Command | auto-detected once Turborepo is detected at the repo root — `turbo run build` (global turbo, filter inferred from Root Directory) |
| Output Directory | framework default (`dist`, from Vite) |

`apps/web/Dockerfile` (and `nginx.conf`) become dead code once this is
confirmed working on a real Vercel project — they were only needed to build
and serve the static bundle under k8s/nginx, which Vercel's static hosting
replaces outright. Recommend deleting both once a live Vercel deployment of
`apps/web` is verified, not before (keep the safety net until the first
green deploy).

One real risk found in this repo's specifics, not covered by "just works":
**`@ccpilot/ui`'s own `build` script also builds Storybook**, and Turborepo's
default `dependsOn: ["^build"]` wiring means a `web` build may trigger that
Storybook build as a side effect (see "Repo-specific risk" below). This
needs verification with a real trial deploy, not assumed away.

## Repo shape (as read from this checkout)

- `pnpm-workspace.yaml`: packages are `apps/*`, `packages/*`, `domain` (the
  `domain` entry doesn't currently match any directory — harmless, not part
  of this ticket).
- Root `package.json`: `"packageManager": "pnpm@10.33.0+sha512..."`,
  `turbo` is a root `devDependency` (`"turbo": "latest"`), root `build`
  script is `turbo build`.
- `turbo.json` exists at the repo root, with a `build` task:
  `dependsOn: ["^build"]`, `outputs: ["dist/**", ".next/**", "!.next/cache/**"]`.
  This repo **does** use Turborepo — the Turborepo-specific Vercel guidance
  applies, not just plain pnpm-workspace guidance.
- `apps/web/package.json` (`@ccpilot/web`): depends on `@ccpilot/domain`,
  `@ccpilot/ts-fetch`, `@ccpilot/ui`, all as `workspace:*`. Its own `build`
  script is a plain `vite build`.
- `@ccpilot/domain` and `@ccpilot/ts-fetch` (`packages/domain`,
  `packages/ts-fetch`) ship **TypeScript source directly** — `"main":
  "./src/index.ts"` / `"exports": {".": "./src/index.ts"}` — with **no
  `build` script at all**. Vite/esbuild transpiles them in-place when
  bundling `apps/web`; Turborepo has no `build` task to run for them.
- `@ccpilot/ui` (`packages/ui`) also exposes `"main": "./src/index.ts"`
  (source, not a dist build) for consumption by other workspace packages,
  but it **does** define its own `build` script: `"vite build && storybook
  build"` (its own component-library bundle plus a Storybook static site).
- `apps/web/Dockerfile` is a two-stage build: `pnpm install` + `pnpm
  --filter @ccpilot/web build` in a `node:24-alpine` builder stage, then
  copies `apps/web/dist` into an `nginx:alpine` stage. This is exactly the
  kind of thing Vercel's own build + static hosting replaces; it has no
  further role once Vercel is live.

## Root Directory, install, and workspace resolution

Setting **Root Directory = `apps/web`** in the Vercel Project's Build &
Deployment settings is the standard way to point a monorepo subfolder at a
Vercel project — this is Vercel's documented flow for "Add a monorepo
through the Vercel Dashboard": import the repo once, then set Root
Directory per project/app.
[Source: Using Monorepos](https://vercel.com/docs/monorepos)

Root Directory does **not** mean Vercel only clones/installs that
subfolder. Two documented mechanics make workspace deps resolve correctly:

1. **"Include source files outside of the Root Directory in the Build
   Step"** — a Root Directory sub-setting. Docs state: *"Vercel projects
   created after August 27th 2020 23:50 UTC have this option enabled by
   default."* Since this is a new project being created now, it will be on
   by default, so files outside `apps/web` (i.e. `packages/*`,
   `pnpm-workspace.yaml`, the root lockfile) are available during the
   build.
   [Source: Monorepos FAQ — "Can I share source files between projects? Are shared packages supported?"](https://vercel.com/docs/monorepos/monorepo-faq)
2. **Install Command auto-detection runs from the workspace root, not the
   Root Directory in isolation.** Docs: *"The install path is set by the
   [root directory]"* but pnpm is detected via the workspace's
   `pnpm-lock.yaml`, and Vercel's monorepo docs describe filtered installs
   (`pnpm install --filter web...`) as an **opt-in optimization**, implying
   the default install command already sees and can install the full
   workspace graph (otherwise a filtered install wouldn't be an opt-in
   speed-up, it would be mandatory just to get things working).
   [Source: Configuring a Build — Install Command](https://vercel.com/docs/builds/configure-a-build#install-command),
   [Source: Using Monorepos — Filtered installs](https://vercel.com/docs/monorepos#filtered-installs)

Net effect: `workspace:*` deps on `@ccpilot/domain`, `@ccpilot/ts-fetch`,
`@ccpilot/ui` resolve the same way they do locally — pnpm sees the whole
`pnpm-workspace.yaml` graph and symlinks the packages into
`apps/web/node_modules` before Vite ever runs. No path rewriting or
custom install command is needed for correctness. An explicit
`installCommand` (e.g. `pnpm install --filter web...` in
`apps/web/vercel.json`) is available later purely as a **build-speed**
optimization, not a correctness requirement.

## Package manager version pinning

Vercel auto-detects pnpm from `pnpm-lock.yaml` and infers the pnpm
**major** version from the lockfile's `lockfileVersion` field (e.g.
`lockfileVersion: 9.0` → pnpm 9 or 10). The root `package.json`'s exact pin
(`pnpm@10.33.0+sha512...`) is only honored if
[Corepack](https://vercel.com/docs/builds/configure-a-build#corepack) is
turned on, via the environment variable `ENABLE_EXPERIMENTAL_COREPACK=1`
on the Vercel Project. Without it, Vercel will still pick a compatible
pnpm major version automatically from the lockfile — builds will work,
but the exact patch version won't be pinned.
[Source: Package Managers](https://vercel.com/docs/package-managers),
[Source: Configuring a Build — Corepack](https://vercel.com/docs/builds/configure-a-build#corepack)

**Recommendation:** set `ENABLE_EXPERIMENTAL_COREPACK=1` on the Vercel
project so the pinned pnpm version in `package.json` is actually what
builds run with, matching local dev.

## Does it "just work," or does it need an explicit `vercel.json`?

**It just works with zero `vercel.json`**, for both the pnpm-workspace part
and the Turborepo part, per Vercel's own framing:

> "Vercel handles all aspects of configuring your monorepo, including
> setting build commands, the Output Directory, the Root Directory, the
> correct directory for workspaces, and the Ignored Build Step."
[Source: Deploying Turborepo to Vercel — "Import your Turborepo to Vercel"](https://vercel.com/docs/monorepos/turborepo#import-your-turborepo-to-vercel)

Concretely, once Vercel detects `turbo.json` at the repo root and `turbo`
in the root `package.json`, it will auto-configure:

| Field | Vercel's automatic value |
|---|---|
| Build Command | `turbo run build` (Turborepo ≥1.8, which this repo's `"turbo": "latest"` satisfies) |
| Output Directory | Framework default (Vite → `dist`) |
| Install Command | Automatically detected (`pnpm install`) |
| Root Directory | `apps/web` (set manually once, at project creation) |
| Ignored Build Step | `npx turbo-ignore --fallback=HEAD^1` |

[Source: Deploying Turborepo to Vercel — settings table](https://vercel.com/docs/monorepos/turborepo#import-your-turborepo-to-vercel)

A `vercel.json` becomes useful only for **optional** refinements later:
a faster filtered install command, a custom Ignored Build Step (e.g.
`turbo query affected` for more precise skip logic), or Related Projects
config if `apps/express`/`apps/sandbox` ever need cross-linking. None of
these are required to get `apps/web` building and serving correctly.

## Turborepo-specific behavior: build command and Remote Caching

- **Build command:** Vercel doesn't need (and shouldn't be given) a plain
  `vite build` — the win of using Turborepo here is that `turbo run build`
  (or the equivalent `cd ../.. && turbo run build --filter=web`) respects
  the `dependsOn: ["^build"]` graph and Turborepo's local caching, and
  Vercel auto-picks this once it detects the Turborepo setup. Global
  `turbo` (available on the build image without installing it yourself)
  auto-infers the right `--filter` from the configured Root Directory, so
  the simple `turbo build` root script already works as the Vercel Build
  Command with no changes.
  [Source: Deploying Turborepo to Vercel — "Using global turbo"](https://vercel.com/docs/monorepos/turborepo#using-global-turbo)

- **Remote Caching:** Vercel is the default Remote Cache provider for
  Turborepo — no separate service needed. It's opt-in: run `turbo login` /
  `turbo link` once (from repo root) to connect this repo's Turborepo runs
  to Vercel's Remote Cache, then Vercel builds (and any external CI) share
  cached task outputs automatically. This does **not** require the project
  to be hosted on Vercel to use the cache, but since `apps/web` will be
  hosted on Vercel, Remote Caching is effectively free/zero-config once
  the project is linked — worth turning on as a fast-follow, not a
  blocker for the initial migration.
  [Source: Deploying Turborepo to Vercel — "Setup Remote Caching for Turborepo on Vercel"](https://vercel.com/docs/monorepos/turborepo#setup-remote-caching-for-turborepo-on-vercel)

- **Skipping unaffected builds:** because this is a multi-app pnpm
  workspace (`apps/web`, `apps/express`, `apps/sandbox`, `apps/docs`),
  Vercel's automatic "skip unaffected projects" feature (distinct from
  Turborepo's own caching) will avoid rebuilding/deploying `apps/web` when
  a commit only touches, say, `apps/express`. This requires unique
  `name` fields per workspace package (already true here — every
  `package.json` has a unique `@ccpilot/*` name) and explicit
  `workspace:*`-style internal dependency declarations (also already true).
  No extra setup needed beyond what the repo already has.
  [Source: Using Monorepos — "Skipping unaffected projects"](https://vercel.com/docs/monorepos#skipping-unaffected-projects)

## Repo-specific risk: `@ccpilot/ui`'s build script pulls in Storybook

`apps/web` depends on `@ccpilot/ui` (`workspace:*`). `@ccpilot/ui`'s
`package.json` defines:

```json
"scripts": {
  "build": "vite build && storybook build"
}
```

Because the root `turbo.json`'s `build` task has `dependsOn: ["^build"]`,
a `turbo run build` that includes `web` in its scope may also invoke
`ui`'s `build` script as an upstream dependency task — which means a
`storybook build` (pulling in Storybook's dev-only toolchain: multiple
`@storybook/*` packages, `playwright`, etc., all already present in
`ui`'s `devDependencies` and thus installed anyway) runs as part of every
`apps/web` deploy on Vercel. This is unnecessary work at best (slower,
more fragile builds) since `@ccpilot/ui`'s `exports` field points straight
at `./src/index.ts` — Vite already consumes `ui` from source when bundling
`apps/web`, so `ui`'s own `build` script output isn't actually needed to
build `web` at all.

I could not fully confirm from Turborepo's public docs whether
`turbo run build --filter=web` (no `...`) would still execute `ui`'s
`^build` task, or whether filtering to a single package short-circuits
dependency build tasks entirely — this level of filter-semantics detail
isn't documented on either `vercel.com/docs` or `turborepo.dev/docs` at
the page I checked. **Action before relying on this in prod:** do one real
trial deploy (or run `turbo run build` locally) and check the build log —
if `ui`'s Storybook build does run, either split `ui`'s `build` script
(e.g. `"build": "vite build"`, moved Storybook to `"build:storybook"`), or
add a `ui#build` task override in `turbo.json` that skips the Storybook
step for the deploy path.
[Turborepo filtering reference checked: turborepo.dev/docs/core-concepts/monorepos/filtering — does not resolve this specific interaction]

## Recommendation summary

1. Create the Vercel project with Root Directory = `apps/web`, no other
   manual overrides needed — Framework Preset, Build Command, Install
   Command, and Output Directory all auto-detect correctly.
2. Set `ENABLE_EXPERIMENTAL_COREPACK=1` so the pinned pnpm version in root
   `package.json` is honored.
3. After the first successful deploy, verify in the build log whether
   `@ccpilot/ui`'s Storybook build ran; if so, split `ui`'s `build` script
   so Storybook isn't built on every `web` deploy.
4. Once a live Vercel deployment of `apps/web` is confirmed working,
   delete `apps/web/Dockerfile` and `apps/web/nginx.conf` — they have no
   further purpose post-migration.
5. Optional fast-follow: run `turbo link` to connect this repo to Vercel's
   Turborepo Remote Cache for faster CI/local builds.

## Sources

- [Using Monorepos](https://vercel.com/docs/monorepos) — vercel.com/docs
- [Monorepos FAQ](https://vercel.com/docs/monorepos/monorepo-faq) — vercel.com/docs
- [Deploying Turborepo to Vercel](https://vercel.com/docs/monorepos/turborepo) — vercel.com/docs
- [Configuring a Build](https://vercel.com/docs/builds/configure-a-build) — vercel.com/docs
- [Package Managers](https://vercel.com/docs/package-managers) — vercel.com/docs
- [Turborepo: Filtering](https://turborepo.dev/docs/core-concepts/monorepos/filtering) — turborepo.dev/docs (checked, inconclusive on the specific `--filter=web` + `^build` interaction noted above)
