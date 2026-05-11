# @ccpilot/ui

**Visual Identity & Design System**

## Purpose

This package centralizes all visual elements, ensuring that the student's **Cockpit** remains consistent, distraction-free, and optimized for low cognitive load (NPF-friendly).

## Methodology: The Monastic Hierarchy

We do not build pages here; we build a **System of Composition**. Every file follows a strict hierarchy to prevent "Visual Drift":

1. **Primitives (`/src/primitives`):** The smalles unit of meaning. Stateless, brand-heavy, and reusable.
* *Examples:* `Button`, `StatusBadge`, `SidebarLink`, `NowItem`.


2. **Features (`/src/features`):** Domain-specific UI clusters. They handle visual states (Loading/Error) but remain ignorant of the API.
* *Examples:* `NowCard`, `SettingsCard`, `LoginForm`.


3. **Layouts (`/src/layouts`):** Slot-based templates that define the grid and structural relationships without logic leaks.
* *Examples:* `AppLayout`, `FocusLayout`.



## Design Principles (NPF Optimized)

* **Lexend Identity:** We use **Lexend Deca** for commands/headers and **Lexend Light** for body text.
* **Tactile Feedback:** Every interaction includes subtle physical cues (e.g., `active:scale-95`) to provide dopamine-friendly confirmation.
* **The Hard Shadow:** Interactive surfaces use a high-contrast hard shadow (`3px 3px 0px`) to clearly separate the workspace from the background.

## The Contract

* **Inputs:** Only consumes data via props. Uses `@ccpilot/domain` types for strict data contracts.
* **Outputs:** Returns pure JSX.
* **Side Effects:** **ZERO.** This package is strictly prohibited from containing:
* API calls
* Global State stores
* Routing logic (TanStack Router `Link` components—use the Orchestrator pattern instead).



## Workbench (Storybook)

The development of this package is **Storybook-First**.

* Every component must have a corresponding `.stories.tsx` file.
* Components must be verified in **Isolation** before being consumed by the web app.
* Mock data should be pulled from `src/mocks` to ensure visual consistency.

## Usage

```bash
# In the root of the monorepo
pnpm add @ccpilot/ui --filter @ccpilot/web

```

---

*Note: This package is the "Silence" of the system. If a component feels noisy or complex, it must be refactored into simpler primitives.*
