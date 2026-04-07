# @ccpilot/ef-engine

**Prioritization & Reverse Planning Logic**

## Purpose

This package is responsible for reducing cognitive load for the user. It takes
Requirements and transforms them into manageable "Next Logical Steps" based on the user's real-time state.

## Core Logic: Priority Score

The engine calculates a **Pscore** for every step in the system. The Pscore is a dynamic value derived from:

- **Base Weight:** The inherent importance of the Requirement.
- **Sequence:** Where the step sits in the "Reverse Plan."
- **User Context:** Real-time energy levels, environment, and time availability.

## Key Functions - _this is just a rough sketch for now need think more about it_

- **`generateSteps(requirement)`**: Uses the LLM contract to break a big goal into atomic, NPF-friendly pieces.
- **`calculatePscore(step, userContext)`**: Determines what matters _right now_.
- **`findNextAction(requirements[])`**: Looks across all aggregates to find the single best step for the user to take.

## Contract

- **Inputs:** It consumes `Requirement` and `Step` entities from `@ccpilot/domain`.
- **Outputs:** It provides sorted lists and specific step IDs to `apps/express` .

## Constraints

- The engine should not save anything to the database. It is a pure "Calculation Layer."
- It only speaks the language defined in `@ccpilot/domain`.
- Every algorithm must prioritize "Low Friction" and "Clarity"

* * *

_Note: This package is the bridge between UX Research and Engineering. If the "Next Step" feels wrong to a student, the logic lives here._
