---
title: System Architecture & Weighting Logic
---

## 1. The High-Level Flow

The system operates as a data-refinery pipeline, moving from high-volume external data to a singular focus point.

1.  **Ingestion:** Systems (e.g., Canvas/Instructure) are polled for new assignments, files, or announcements.
2.  **Crystallization:** Raw API responses are mapped to a **Requirement** entity in the database.
3.  **Atomization (LLM):** Requirements are sent to an LLM to be shattered into **Atomic Steps** (Actionable, verb-first micro-tasks).
4.  **Weighting:** The engine applies a multi-variable formula to every available Step based on current user intent.
5.  **Surfacing:** The frontend renders the **Single Logical Next Step** as the primary "Offramp."

## 2. The Data Model (One-to-Many)

To reduce executive overhead, we distinguish between the "Why" (Requirement) and the "What" (Step).

### The Requirement (The Goal)
* **Source ID:** Mapping to the external API (e.g., Canvas Assignment ID).
* **Deadline:** `due_at` or `end_at`.
* **Weight:** Importance based on total points or grade impact.
* **Raw Content:** The original instructions for reference.

### The Step (The Action)
* **Action:** A concise, verb-first instruction (e.g., "Install Drizzle ORM").
* **Category:** Context labels (e.g., `coding`, `admin`, `reading`).
* **Cognitive Load:** 1–5 scale of estimated friction.
* **Dependency:** Order in which steps must be completed.

## 3. The Weighting Engine (The Formula)

The priority of a **Step ($P_i$)** is calculated at runtime. The goal is to surface the step that is most urgent, most important, and best fits the user's current capacity.

```latex
P_i = \left( \frac{Importance \times EnergyMatch}{Friction \times TimeRemaining} \right) + \text{ContextBonus}
```

### Variables
* **Importance:** Derived from the Requirement's point value.
* **EnergyMatch:** How well the Step's `category` matches the user's declared energy state (e.g., High Energy = Deep Work).
* **Friction:** The cognitive load required to initiate the step.
* **TimeRemaining:** Hours/Days until the Requirement is due.
* **ContextBonus:** A "stickiness" score added if the Step's category matches the *previous* completed step, minimizing the cost of context switching.

## 4. Reverse Zoom: The UI Philosophy

ccpilot operates on a "Reverse Zoom" principle to protect the user from information overload.

* **Zoom 0 (The Step):** The default view. Only one action is visible.
* **Zoom 1 (The Why):** Revealing the parent Requirement and the reason this step was chosen.
* **Zoom 2 (The Horizon):** Revealing the next 3–5 high-scoring steps to allow for planning if the user has the cognitive space.

## 5. Technical Implementation Details

* **Enrichment:** Use LLM prompts to ensure Steps include a "Quick Start Link" whenever possible (e.g., direct URL to a specific Canvas page).
* **State Management:** The "Context" of the user is tracked across sessions to maintain the **ContextBonus** efficiency.
* **Validation:** All incoming API data and LLM-generated JSON must pass **Zod** schema validation before entering the database.

