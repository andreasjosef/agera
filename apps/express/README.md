# @ccpilot/express
HTTP Adapter

## Purpose
This is the web layer for ccpilot. It is an Express 5 server that acts as the **adapter** in a ports & adapters architecture. It handles HTTP concerns only — all business logic lives in `@ccpilot/domain`.

## Structure

### Entry Point — `src/index.ts`
Initialises the Express app with global middleware (`cors`, `cookie-parser`, JSON body parsing, Prometheus `/metrics`), mounts the BetterAuth handler at `/api/auth/*`, mounts four sub-routers, exposes health-check endpoints (`/api/health`, `/api/health/db`), attaches a global error handler, and starts listening on `PORT` (default `4000`).

### Middleware — `src/middleware`

#### `auth.middleware.ts` — `authenticateUser`
Validates the request session via `@ccpilot/auth-betterauth`. On success, attaches `userid` to the request. On failure, returns `401`.

#### `validate.ts` — `validateReq(schema)`
A middleware factory that takes a Zod schema and validates `req.body` against it. Returns `400` on failure; replaces `req.body` with the parsed value on success.

#### `context.ts` — `appContext`
**The bridge between ports and adapters.** This middleware runs after authentication and assembles the `AppContext` for each request:

1. Reads the authenticated `userid` from the request.
2. Loads the user's Canvas integration token (if any) via a domain action.
3. Creates a canvas client with the token, or `null` if no integration exists.
4. Wires together all repository instances from `@ccpilot/persistence` and the LLM client from `@ccpilot/llm-client`.
5. Attaches the fully assembled `AppContext` to `res.locals.ctx`.

This is where the domain's interfaces (ports) are realized with concrete implementations (adapters) and handed to route handlers. Handlers never know about databases, HTTP clients, or wiring — they just receive the context.

### Routes — `src/routes`

Four sub-routers, each mirroring a domain slice. All are guarded by `authenticateUser` + `appContext` at the router level.

| Router | Mount | Handlers |
|---|---|---|
| `requirements/` | `/api/requirements` | `getRequirements`, `getRequirement`, `createRequirement`, `getNextStep`, `getNextSteps`, `initiateSync`, `getSync` |
| `integrations/` | `/api/integrations` | `getIntegration`, `connectCanvas` |
| `steps/` | `/api/steps` | `getStepById`, `finishStep` |
| `status/` | `/api/status` | `getIsActiveStatus`, `getActiveStatusCount`, `toggleActiveStatus` |

Each router follows the same pattern:
```
router.ts           — mounts middleware and registers endpoints
handlers/           — one file per endpoint
  index.ts          — barrel re-exports all handlers
```

**Handlers are thin.** They destructure `ctx` from `res.locals`, delegate to a domain action (or repository method) from `@ccpilot/domain`, and map the `Result<T>` to an HTTP response. They contain no business logic.

### Services — `src/services/instances.ts`
Creates singleton instances of repositories and the LLM client by calling factory functions from `@ccpilot/persistence` and `@ccpilot/llm-client`. These singletons are consumed by the `appContext` middleware.

### Type Augmentation — `src/express.d.ts`
Extends Express's `Locals` interface with `ctx?: AppContext`, giving route handlers full type safety when accessing `res.locals.ctx`.

## Request Flow

```
[Incoming Request]
       │
       ▼
  authenticateUser ──► 401 if no session
       │
       ▼
  appContext ──► Assembles AppContext (repos + services)
       │            Attaches to res.locals.ctx
       ▼
  validateReq? ──► 400 if body fails Zod schema
       │
       ▼
  Handler ──► Delegates to domain action with ctx
       │       Maps Result<T> → HTTP response
       ▼
[Response]
```

## Constraints
- **Handlers contain no business logic** — they delegate to `@ccpilot/domain` actions.
- **No direct database access** — all data access goes through repository interfaces on the context.
- **Long-running operations** (Canvas sync) use fire-and-forget with `202 Accepted` — the HTTP response is sent immediately; the operation completes asynchronously.
- **No build step** — runs TypeScript directly via Node (`noEmit: true`).