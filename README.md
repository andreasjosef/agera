# Agera Monorepo

Welcome to the **Agera** core repository, built by **CodeForGood**. This is a highly parallelized, modular monorepo designed for high boundaries and specialized execution of "Executive Function as a Service."

Agera is designed to reduce cognitive load and prevent dropouts in adult education for neurodivergent individuals by automatically transforming complex Canvas LMS requirements into NPF-optimized micro-steps based on real-time focus metrics, deadlines, and user energy levels.


## Philosophy

Instead of one giant monolithic blob of code, we enforce a strict **Modular Architecture**. Each workspace asset acts as an isolated, contracts-driven ecosystem orchestrated by **Turborepo** and **pnpm**:

* **Zod-Centric Design:** Zod schemas are the absolute single source of truth for runtime validation across the entire ecosystem, strictly controlling data gates at the database layer, API endpoints, and client network states.
* **Domain-First:** Core business rules and domain logic live purely within `@ccp/domain`, staying entirely decoupled from transport layers, databases, or runtime engines.
* **Infrastructure-Agnostic:** Storage systems, third-party frameworks, and external API gateways are treated strictly as pluggable adapters adhering to explicit repository interfaces.
* **Strict Type-Safety:** Runtime validation is handled symmetrically across the network using TypeScript and Zod to guarantee data integrity between the client app and the engine.


## Directory Map

### Apps (`/apps`)

- **`web`**: The flagship React consumer application—fully architecturalized around **TanStack Router** using search-query-powered state synchronization for the user dashboard, cockpit metrics, and interactive focus engine.
- **`express`**: The API Orchestrator running the core EF-engine layout and balancing parameters.
- **`docs`**: Starlight-powered documentation portal, serving deep system architecture maps and setup checklists.
- **`sandbox`**: A safe execution layer for prototyping new system configurations and sandboxed LLM prompt test matrices.

### Packages (`/packages`)

- **`ts-fetch`**: In-house type-safe network wrapper around the native Fetch API. Engineered for validation via Zod schemas and returning functional `Result` monad types for network and database operations.
- **`ui`**: Our dedicated, Storybook-optimized component library. Completely isolated, modular visual components powered natively by Tailwind v4.
- **`auth-betterauth`**: Custom wrapper package integrating Better Auth seamlessly into our Express application environment.
- **`crypto`**: Security infrastructure layer handling high-grade encryption and decryption for sensitive user integration access tokens.
- **`domain`**: Central station for core type declarations, Zod validation schemas, and abstract database repository definitions.
- **`persistence`**: Storage boundary containing Postgres data mappings, migration profiles, and concrete Drizzle ORM query implementations.
- **`lms-canvas`**: Adapter module for interfacing with the Canvas LMS API, processing raw student assignments, data points, and schedules.
- **`llm-client`**: Our direct AI refinement engine interface, responsible for text sanitization and generating actionable micro-steps.
- **`cdd-monitor`**: Custom compiler lifecycle helper managing ongoing TypeScript environment configurations.


## Getting Started

### 1. Prerequisites

Ensure you have **Node.js (v24+)** and **pnpm** installed globally on your machine.

### 2. Installation

Install workspace dependencies from the monorepo root context:

```bash
pnpm install

```

### 3. Running Development

Boot the entire multi-app infrastructure, localized service maps, and database sync structures simultaneously:

```bash
pnpm dev

```

> *Note: This execution triggers `scripts/dev.mjs` to smoothly orchestrate concurrent startups across the Web frontend, Express API server, and structural persistence hooks.*

If you experience setup hiccups, reference our Local Dev Troubleshooting Guide for fast workarounds.

---

### Common Pitfalls & Troubleshooting

If the stack crashes or fails to spin up during pnpm dev, check these common setup issues:

- Docker is not installed or running: The persistence layer requires Docker to orchestrate containerized database environments. Make sure Docker Desktop or your local daemon is active.

- Local Postgres instance conflict: If you have a native PostgreSQL server running directly on your host machine in the background, it will hijack port 5432 and interfere with the container database. Stop your local service (brew services stop postgresql or equivalent) before starting development.

## Monorepo Standards

### Package Autonomy

Every modular package contained within `/packages` **must** manage its own independent `README.md` explicitly mapping out its incoming context variables (Input), resolved parameters (Output), and core architectural scope (Rules).

---

## License

Project developed under the during **ChasChallenge TechForGood 2026** initiative. All rights reserved.
