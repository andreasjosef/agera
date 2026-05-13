import { type Result, fail, ok } from "../../shared/result.ts";
import { type AppContext } from "../../shared/context.ts";
import { type ScoredStep } from "../definitions.ts";
import {
  calculatePriority,
  type EFEngineCandidate,
} from "../../services/ef-engine.ts";

export const getNextStepAction = async (
  ctx: AppContext,
): Promise<Result<ScoredStep | null>> => {
  // get the reqs for the user
  const userReqsResult = await ctx.repos.requirements.getAll(ctx.userId);
  if (!userReqsResult.ok) return fail("Could not not load requirements!");

  // pass each reqs next dep order step to calculatePriority
  const canditateBundles: EFEngineCandidate[] = userReqsResult.value
    .map((req) => ({
      req: req,
      remainingSteps: req.steps.filter((step) => !step.complete), // TODO: again here I am passing all steps but that should be .filter(step => remaining)
    }))
    .filter((candidate) => candidate.remainingSteps.length > 0);

  if (canditateBundles.length === 0) return ok(null);

  // TODO: whole context is currently hardcoded and should in the end come from userSettings
  const winners = calculatePriority(canditateBundles, {
    realityFactor: 1,
    userEnergy: 9,
    horizonHours: 72,
  });

  return ok(winners[0] || null);
};
