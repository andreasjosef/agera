---
title: "@ccpilot/llm-client"
---

**Structured AI Generation for Reverse Planning*

## Purpose

This package is the bridge between ccpilot and an LLM. It is responsible for taking a **Requirement** and with the help of generative AI it creates a logical, NPF-friendly breakdown of **Steps**.

## Core Logic

We don't chat with an AI. We use **Structured Outputs** (JSON) to ensure the LLM returns data that perfectly fits our `@ccpilot/domain` schemas. This package ensures that the AI's "creativity" is constrained by our own technical "contracts."

## Key Functions -> needs more thinking

- **`generateSteps(requirement)`**: The primary "Reverse Planning" prompt. It asks the AI to break a goal into 3–7 atomic steps, specifically optimized for low cognitive load.
- **`refineSteps(steps, feedback)`**: Allows the user to provide feedback and get a different version for a step ← no chat should be fixed feedback options I think. Like more this less that or so

## The Contract

- **Inputs:** Consumes `Requirement` types from `@ccpilot/domain`.
- **Outputs:** Returns a list of `Step` entities (without IDs, as the ID is generated upon persistence).
- **Environment:** Requires an `API_KEY` provided by the `apps/express` orchestrator.

## Constraints

- Does not know about the database.
- Each call is an isolated request/response.
- The internal implementation should be easy to swap from OpenAI to Anthropic or a local Llama model without changing the function signatures.

---

_Note: This is the most "expensive" package in the system. Every call should be
intentional and results cached_