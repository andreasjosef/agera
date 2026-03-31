# 🛡️ CCPilot: Technical & Team Operations

This document defines how we build, communicate, and ship. **Read this before your first commit.**

---

## 🛠️ Infrastructure & Requirements

To run the "Walking Skeleton," you must have a container engine installed.

### 1. Install Container Engine

We support both **Docker** and **Podman**.

- **Windows/Mac:** Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) or [OrbStack](https://orbstack.dev/).
- **Linux (Fedora):** `sudo dnf install moby-engine docker-compose` or use Podman.
- **Linux (Ubuntu):** [Official Docker Install Guide](https://docs.docker.com/engine/install/ubuntu/).

### 2. Node & Package Manager

- **Node.js:** v24+ (LTS)
- **pnpm:** v9+ (`corepack enable pnpm`)

---

## 🚀 Getting Started

The repo uses an automated bootstrap script to handle database initialization and schema syncing.

```bash
# 1. Clone and Install
git clone <repo-url>
cd ccpilot
pnpm install

# 2. Launch the Development Environment
# This starts Postgres, syncs Drizzle schemas, and runs Vite + Express
pnpm dev
```

---

## 📂 Project Structure (Monorepo)

We use **Turborepo** to manage our apps and shared packages.

```text
.
├── apps/
│   ├── web/          # Frontend: Vite + TanStack Router/Query + Tailwind
│   └── express/      # Backend: Node.js API + External Services
├── packages/         # Tools + Internal Scripts
├── domain/           # Zod Schemas + Drizzle Table Definitions + DB transactions
│   └── db/      
├── scripts/
│   └── dev.mjs       # Cross-platform Bootstrap Script
├── docker-compose.yml # Infrastructure
└── turbo.json        # Monorepo dev server
```

---

## 📡 Communication & Workflow Hub

Our stack is integrated to minimize "status check" meetings.

### 1. Linear (The Source of Truth)

- **Role:** All tasks, bugs, and "Bets" live here.
- **Process:** Move issues to **"In Progress"** when you start.
- **GitHub/GitLab Link:** Every issue has an ID (e.g., `CCP-12`). Use this in your branch names.

### 2. GitLab (The Forge)

- **Branching:** `feat/CCP-12-description` or `fix/CCP-44-bug-name`.
- **Merge Requests (MR):** All code enters `main` via an MR.
- **CI/CD:** Automated lints and builds trigger on every push.

### 3. Discord (The Pulse)

- **#announcements:** High-level project updates.
- **#dev-chat:** Technical deep-dives and "I'm blocked" pings.
- **#linear-feed:** Automated alerts when issues are completed or moved.
- **Voice Channels:** For "Body Doubling" (working together in silence) or quick ad-hoc syncs.

---

## 🛰️ Commit Convention

We use a stripped-down version of [Conventional Commits](https://www.conventionalcommits.org/). Use **lowercase**, **present tense** (e.g., "add" not "added"), and always include a **scope**.

**Structure:** `type(scope): subject`

| Type           | Description                 | Example                                       |
| :------------- | :-------------------------- | :-------------------------------------------- |
| **`feat`**     | A new feature or logic      | `feat(web): add now-card focus component`     |
| **`fix`**      | A bug fix                   | `fix(domain): correct user validation schema` |
| **`chore`**    | Maintenance, infra, or deps | `chore(root): update postgres image to v18`   |
| **`refactor`** | Code cleanup/optimization   | `refactor(express): simplify auth middleware` |
| **`docs`**     | Documentation only          | `docs(root): add commit guidelines to readme` |

> **Note:** Scopes should be `web`, `express`, `domain`, or `root`.

## 🔄 The Linear -> Git Workflow

1.  **Pick an Issue** in Linear (from the current Cycle).
2.  **Create a Branch:** `git checkout -b feat/CCP-[ID]-task-name`.
3.  **Code & Commit:** Use descriptive messages. Check out:
4.  **Push & MR:** GitLab will link the MR to the Linear issue automatically.
5.  **Review & Merge:** Once approved, Linear will move the task to **"Done"**.

---

## 🛑 Critical Rules

- **No "Ghost" Work:** If it's not in Linear, don't build it.
- **Schema First:** Changes to data models _must_ happen in `packages/domain` first.
- **Keep it Clean:** Run `pnpm lint` before you push.
