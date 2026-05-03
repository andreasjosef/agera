import type { Requirement, Step } from "../requirements/definitions.ts";

export interface EFEngineContext {
  realityFactor: number;
  horizonHours: number;
  userEnergy: number;
  now?: Date;
}

export interface ScoredStep extends Step {
  priorityScore: number;
  effectiveDeadline: Date;
}

export function calculatePriority(
  requirement: Requirement,
  steps: Step[],
  ctx: EFEngineContext,
) {
  const { realityFactor, userEnergy, horizonHours, now = new Date() } = ctx;

  const targetFinishDate = new Date(requirement.due);

  const stepsSorted = [...steps].sort(
    (a, b) => a.dependencyOrder - b.dependencyOrder,
  );

  const scored: ScoredStep[] = [];
  let timeAccumulated = 0;

  for (let i = stepsSorted.length - 1; i >= 0; i--) {
    const step = stepsSorted[i];

    // update time duration with users reality factor
    const adjustedDuration = step.estimatedMinutes * realityFactor * 60 * 1000;

    // calculate effective deadline for the current step
    const effectiveDeadline = new Date(
      targetFinishDate.getTime() - timeAccumulated,
    );

    // calculate the pressure
    const msToDeadline = effectiveDeadline.getTime() - now.getTime();
    const hoursToDeadline = msToDeadline / (1000 * 60 * 60);
    const pressure = Math.max(
      0,
      Math.min(1, 1 - hoursToDeadline / horizonHours),
    );

    // calcute the utility ie intereste vs. complexity
    const interest = 5; // hard coded for now .. need to fix that with llm
    const utility = interest * 0.7 - step.complexity * 0.3;

    // apply energy gate
    const energyGate = step.complexity <= userEnergy + 2 ? 1.0 : 0.2;

    // final score
    const priorityScoreFinal = (pressure * 0.8 + utility * 0.2) * energyGate;

    scored.unshift({
      ...step,
      priorityScore: priorityScoreFinal,
      effectiveDeadline,
    });

    timeAccumulated += adjustedDuration;
  }

  return scored.sort((a, b) => b.priorityScore - a.priorityScore);
}
