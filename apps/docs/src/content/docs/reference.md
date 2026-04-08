---
title: CCPILOT Monorepo
---

Welcome to the **CCPilot** core repository. This is a modular monorepo designed for high parallelization, clear boundaries, and "Executive Function as a Service."

## Philosophy

Instead of one giant "blob" of code, we use a **Modular Architecture**. Each package is a "Thinking Cell" with a clear contract, managed by **Turborepo** and **pnpm**.

- **Domain-First:** Business logic lives in `@ccp/domain` and doesn't care about the database.
- **Infrastructure-Agnostic:** The database and external APIs are "plugins" to the domain.
- **Type-Safe:** We use TypeScript and Zod to ensure data is valid as it moves between cells.

* * *

## Directory Map

### Apps (`/apps`)

- **`web`**: The React frontend
- **`express`**: The API Orchestrator
- **`docs`**: Starlight-powered documentation 
- **`sandbox`**: A safe space for prototyping new ideas

### Packages (`/packages`)

- **`domain`**: Core types, business rules, and repository interfaces
- **`persistence`**: Drizzle ORM, Postgres schemas, and repo implementations.
- **`lms-canvas`**: Integration and mapping for the Canvas API.
- **`llm-client`**: Integration with LLM model for Step generation. 
- **`ts-fetch`**: Type-safe fetch utility returning `Result` types.
- **`cdd-monitor`**: Custom typescript compiler interface

* * *

## Getting Started

### 1\. Prerequisites

Ensure you have **Node.js (v24+)** and **pnpm** installed.

### 2\. Installation

Bash

```
pnpm install

```

### 3\. Development

Run the dev script to start the whole ecosystem:

Bash

```
pnpm dev

```

_This uses `scripts/dev.mjs` to orchestrate the startup of Express, Web, and the DB._

We compiled a list of [common
issues]([https://ccpilot-docs.netlify.app/research/dev-env-checklist/#possible-issues-with-local-development](https://ccpilot-docs.netlify.app/research/dev-env-checklist/#possible-issues-with-local-development))
that might trip you up when getting set up.

* * *

## Project Standards

### Documentation

Every package in `packages/` must maintain its own local `README.md` explaining its **Input**, **Output**, and **Rules**.
