# @ccpilot/web
UI Orchestration Layer

## Purpose
This is the frontend for ccpilot. It composes domain logic from `@ccpilot/domain` into high-performance, interactive user experiences. Built with React 19, Vite 8, TanStack Router, TanStack Query, and Zustand.

## Structure

### Entry Point — `src/app/main.tsx`
Creates the `QueryClient`, instantiates the TanStack Router with the auto-generated `routeTree`, provides the router context (`{ queryClient }`), and wraps the app in `<QueryClientProvider>` and `<RouterProvider>`.

### Routing — `src/routes/`
File-based routing via **TanStack Router** with dot-notation paths. Route files are generated into `routeTree.gen.ts` by `@tanstack/router-plugin/vite`. Routes are auto-code-split and preloaded on intent.

```
routes/
├── __root.tsx                 Layout root (devtools, Outlet)
├── index.tsx                  / (landing page)
├── login.tsx                  /login
├── signup.tsx                 /signup
├── app.tsx                    /app (authenticated layout, sidebar, auth guard)
│   ├── app.cockpit.tsx        /app/cockpit (dashboard)
│   ├── app.now.tsx            /app/now (focused study view)
│   ├── app.onboarding.tsx     /app/onboarding
│   ├── app.help.tsx           /app/help
│   ├── app.requirements.tsx   /app/requirements (parent layout)
│   │   ├── app.requirements.index.tsx
│   │   └── app.requirements.$id.tsx
│   ├── app.settings.tsx       /app/settings (parent layout)
│   │   ├── app.settings.user.tsx
│   │   └── app.settings.integrations.tsx
│   ├── app.step.$id.tsx       /app/step/$id
│   └── app.guides.canvas.tsx  /app/guides/canvas
```

Each route file exports a route created by `createFileRoute` with inline options:
- **`beforeLoad`** — Auth guards (checks session, redirects to `/login`)
- **`loader`** — Data priming via `queryClient.ensureQueryData(...)` — blocks navigation until cached
- **`component`** — The page component
- **`validateSearch`** — Zod validation of search params (used in `/app/now` for `bodyDoublingEnabled`)

The `/app` layout route applies the auth guard to all child routes. Dynamic segments use `$param` syntax (e.g. `$id`).

### Modules — `src/modules/`
Each module represents a domain entity and follows a three-file pattern:

| File | Role | Tool |
|---|---|---|
| `api.ts` | Defines the contract — Zod parsing for API responses, TanStack Query `queryOptions` and `mutationOptions`. All HTTP calls go through `@ccpilot/ts-fetch` (`safeFetchItem`, `safePostItem`) with Zod parsers from `@ccpilot/domain`. | TanStack Query + `@ccpilot/ts-fetch` |
| `store.ts` | UI Intent — transient UI state that does not belong on the server (filters, timers, toggles). | Zustand |
| `hooks.ts` | Projections — custom hooks that combine cached query data with store state into the final view shape. | React hooks |

**Modules and their contents:**

| Module | `api.ts` | `store.ts` | `hooks.ts` |
|---|---|---|---|
| `auth/` | Session query + signIn/signUp/signOut mutations | — | `useSession`, `useSignOut` |
| `cockpit/` | Active status queries + toggle mutation | `useTimer`, `useBodyDoubling`, `useEnergy` | `useToggleAcitve` |
| `integrations/` | Canvas connection query + mutation, sync polling | — | `useCanvasConnect`, `useSyncPolling` |
| `requirement/` | CRUD query options + finishStep mutation | `useRequirementStore` (stepFilter) | `useNextStep`, `useFinishStep`, `useInitiateSync` |

A cross-cutting `modules/store.ts` manages global UI state (sidebar toggle).

### Components — `src/components/`
Two tiers of components:

**Managers** (`*Manager.tsx`, `*Widget.tsx`) — Wire Zustand stores and TanStack Query data to pure UI components from `@ccpilot/ui`. These are our "smart" components:
- `PomodoroTimerManager` — binds timer store + active-status mutation to `<PomodoroTimer>`
- `EnergySelectorWidget` — binds energy store to `<EnergySlider>`
- `UpcomingStepsWidget` — fetches preview requirements + energy level, renders `<UpcomingSteps>`
- `SyncStateManager` — fetches integration/sync status, renders `<SyncState>`
- `BodyDoublingDisplayManager`, `BodyDoublingSwitchManager`, `TimeSelectorManager`, `BackButtonManager`

**Pure Components** — Render JSX from props only. No hooks, no stores, no side-effects:
- `RequirementProgressBar`, `RequirementStepStatus`, `RequirementCardLink`, `RequirementNavLink`, `NavLink`, `CanvasIntegrationForm`, `NowDashboardLayout`

**Forms** — `LoginForm.tsx` and `SignupForm.tsx` use `react-hook-form` with `zodResolver`, validated against schemas from `@ccpilot/domain`.

## State Management

| State Type | Ownership | Tool | Usage |
|---|---|---|---|
| **The Truth** | Server State | TanStack Query | Raw data, caching, invalidation |
| **The Intent** | UI State | Zustand | Filters, timers, toggles, energy level, sidebar state |
| **The Projection** | Computed View | Custom hooks | Combining Query data with Store state via memoised transformations |

## Request Flow

```
[Page Load]
     │
     ▼
beforeLoad ──► Auth guard (session check, redirect if unauthenticated)
     │
     ▼
loader ──► queryClient.ensureQueryData(...) — primes cache, blocks render
     │
     ▼
Component ──► useSuspenseQuery / useQuery — reads cached data
     │          Hooks combine with Zustand state
     │          Passes props to @ccpilot/ui components
     ▼
[UI Rendered]
```

## Build & Deployment
- **Dev:** Vite 8 dev server on port `3000`, proxies `/api` to the Express server at `localhost:4000`.
- **Build:** `vite build` produces static assets in `dist/`.
- **Docker:** Multi-stage build — Node 24 Alpine (pnpm build) → nginx:alpine (serves `dist/` with SPA fallback). Exposes port `5173`.
- **Styles:** Tailwind CSS v4 via `@tailwindcss/vite`. Sources classes from `@ccpilot/ui`, `routes/`, and `components/`.

## Constraints
- **No `useEffect` for data fetching** — use route loaders and TanStack Query.
- **No raw API data in Zustand** — server state lives in the Query cache; stores hold only UI intent.
- **Pure components are props-only** — they do not import stores, queries, or hooks.
- **Validation at the boundary** — all API responses are parsed with Zod in `api.ts` before reaching any component.