import { type Result, fail, ok } from "../../shared/result.ts";
import { type AppContext } from "../../shared/context.ts";
import { type ScoredStep } from "../definitions.ts";
import {
  calculatePriority,
  type EFEngineCandidate,
} from "../../services/ef-engine.ts";

export const getStepByIdAction = async (
  ctx: AppContext,
  stepId: string,
  energyLevel: number = 9,
): Promise<Result<ScoredStep>> => {
  const stepResult = await ctx.repos.requirements.findStepById(
    ctx.userId,
    stepId,
  );
  if (!stepResult.ok) return fail(stepResult.error);

  const reqResult = await ctx.repos.requirements.findById(
    ctx.userId,
    stepResult.value.requirementId,
  );
  if (!reqResult.ok) return fail("Could not load requirement for step!");

  const remainingSteps = reqResult.value.steps
    .filter((s) => !s.complete)
    .sort((a, b) => a.dependencyOrder - b.dependencyOrder);

  const targetIdx = remainingSteps.findIndex((s) => s.id === stepId);
  if (targetIdx === -1) {
    return ok({
      ...stepResult.value,
      priorityScore: 0,
      effectiveDeadline: new Date(reqResult.value.due),
      requirementTitle: reqResult.value.title,
      requirementId: stepResult.value.requirementId,
    });
  }

  const candidateBundle: EFEngineCandidate = {
    req: reqResult.value,
    remainingSteps: remainingSteps.slice(targetIdx),
  };

  const scored = calculatePriority([candidateBundle], {
    realityFactor: 1,
    userEnergy: energyLevel,
    horizonHours: 72,
  });

  const match = scored[0];
  if (!match) return fail("Could not score step");

  return ok(match);
};
