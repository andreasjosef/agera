---
title: Backend Service Architecture
description: Breakdown of ccpilot modular services and data flow.
---

## Service Topology

The backend is organized into three distinct layers to ensure scalability and maintain cognitive clarity for developers.

### Layer 1: Ingestion (The Collectors)
- **canvas.service**: Ingests LMS data.
- **ics.service**: Processes calendar feeds.
- **slack.service**: (Planned) Ingests async communication.

### Layer 2: Processing (The Refiner)
- **llm.service**: Interfaces with OpenAI/Anthropic to transform Requirements into Atomic Steps. It handles prompt engineering and JSON schema enforcement.

### Layer 3: Logic (The Engine)
- **ccpilot.service**: The central weighting engine. It calculates Step Priority ($P_i$) and handles the "Reverse Zoom" logic for the frontend.
- **auth.service**: Manages user identity and session-based context.

## The Data Lifecycle
1. **Collector** fetches raw data $\rightarrow$ **DB Requirement**.
2. **Refiner** processes Requirement $\rightarrow$ **DB Steps**.
3. **Engine** weighs Steps $\rightarrow$ **Frontend JSON**.

