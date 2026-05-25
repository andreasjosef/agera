import { type Result, fail, ok } from "../../shared/result.ts";
import { type AppContext } from "../../shared/context.ts";
import { type ScoredStep } from "../definitions.ts";
import {
  calculatePriority,
  type EFEngineCandidate,
} from "../../services/ef-engine.ts";

export const getPreviewAction = async (
  ctx: AppContext,
  limit: number = 3,
  energyLevel: number = 9,
): Promise<Result<ScoredStep[]>> => {
  const userReqsResult = await ctx.repos.requirements.getAll(ctx.userId);
  if (!userReqsResult.ok) return fail("Could not load requirements!");

  let candidateBundles: EFEngineCandidate[] = userReqsResult.value
    .map((req) => ({
      req: req,
      remainingSteps: [...req.steps]
        .filter((step) => !step.complete)
        .sort((a, b) => a.dependencyOrder - b.dependencyOrder),
    }))
    .filter((bundle) => bundle.remainingSteps.length > 0);

  const runway: ScoredStep[] = [];

  for (let i = 0; i < limit; i++) {
    if (candidateBundles.length === 0) break;

    const winners = calculatePriority(candidateBundles, {
      realityFactor: 1,
      userEnergy: energyLevel,
      horizonHours: 72,
    });

    const topWinner = winners[0];
    if (!topWinner) break;

    runway.push(topWinner);

    candidateBundles = candidateBundles
      .map((bundle) => {
        if (bundle.req.title === topWinner.requirementTitle) {
          return {
            ...bundle,
            remainingSteps: bundle.remainingSteps.slice(1),
          };
        }
        return bundle;
      })
      .filter((bundle) => bundle.remainingSteps.length > 0);
  }

  return ok(runway);
};
