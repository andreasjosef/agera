import type {
  Requirement,
  Step,
  ScoredStep,
} from "../requirements/definitions.ts";

export interface EFEngineContext {
  realityFactor: number;
  horizonHours: number;
  userEnergy: number;
  now?: Date;
}

export interface EFEngineCandidate {
  req: Requirement;
  remainingSteps: Step[]; // TODO: currently these are simply all -> add a completeness check
}

export function calculatePriority(
  canditates: EFEngineCandidate[],
  ctx: EFEngineContext,
): ScoredStep[] {
  const { realityFactor, userEnergy, horizonHours, now = new Date() } = ctx;

  const scoredCanditates = canditates.map(({ req, remainingSteps }) => {
    const stepsSorted = [...remainingSteps].sort(
      (a, b) => a.dependencyOrder - b.dependencyOrder,
    );
    const nextStep = stepsSorted[0];

    if (!nextStep) return null;

    const stepsLeft = stepsSorted.slice(1);
    const stepsLeftDuration = stepsLeft.reduce((acc, s) => {
      return acc + s.estimatedMinutes * realityFactor * 60 * 1000;
    }, 0);

    const reqDue = new Date(req.due).getTime();
    const effectiveDeadline = new Date(reqDue - stepsLeftDuration);

    const msToDeadline = effectiveDeadline.getTime() - now.getTime();
    const hoursToDeadline = msToDeadline / (1000 * 60 * 60);

    // Continous decay function <- Thanks AI
    let pressure = 0;
    if (hoursToDeadline <= 0) {
      pressure = 1.0; // Overdue = Maximum Pressure
    } else if (hoursToDeadline <= horizonHours) {
      // Linear scaling within the active horizon
      pressure = 1 - hoursToDeadline / horizonHours;
    } else {
      // This ensures a 0.01 vs 0.001 difference to break ties in favor of the closer task
      pressure = horizonHours / (hoursToDeadline * 10);
    }

    // calcute the utility ie intereste vs. complexity and apply energy gate
    const interest = 5; // hard coded for now .. need to fix that with llm

    const utility = interest * 0.7 - nextStep.complexity * 0.3;
    const utilityWeight = hoursToDeadline > horizonHours ? 0.05 : 0.2;
    const pressureWeight = 1 - utilityWeight;

    const energyGate = nextStep.complexity <= userEnergy + 2 ? 1.0 : 0.2;

    // final score
    const priorityScoreFinal =
      (pressure * pressureWeight + utility * utilityWeight * 0.2) * energyGate;

    console.log(
      `[EF ENGINE] next step: ${req.title} - ${nextStep.stepKey} - Deff: ${effectiveDeadline}`,
    );
    return {
      ...nextStep,
      priorityScore: priorityScoreFinal,
      effectiveDeadline,
      requirementTitle: req.title,
      requirementId: req.id,
    } as ScoredStep;
  });

  return (scoredCanditates.filter(Boolean) as ScoredStep[]).sort(
    (a, b) => b.priorityScore - a.priorityScore,
  );
}
