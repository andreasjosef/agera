import { fail, ok, type Result } from "../shared/result.ts";

import type {
  Requirement,
  NewRequirement,
  SyncStatusResponse,
} from "./types.ts";

import type { IRequirementRepository } from "./repository.ts";
import { generateSteps } from "../integrations/actions.ts";
import { type TokenProvider } from "../integrations/types.ts";
import { type AppContext } from "../shared/context.ts";

/**
 * Retrieves the full collection of requirements for a specific user.
 */
export const getRequirements = async (
  repo: IRequirementRepository,
  userId: string,
): Promise<Result<Requirement[]>> => {
  return repo.getAll(userId);
};

/**
 * Atomic primitive to persist a requirement to the database.
 */
export type SaveRequirementContext = Pick<AppContext, "userId"> & {
  repos: Pick<AppContext["repos"], "requirements">;
};

export const saveRequirement = async (
  ctx: SaveRequirementContext,
  req: NewRequirement,
): Promise<Result<Requirement>> => {
  // TODO: some validation will have to happen here like
  //  - does this already exist in the db
  return ctx.repos.requirements.save(req, ctx.userId);
};

/**
 * High-level orchestrator that persists a requirement and initiates
 * the asynchronous AI enrichment pipeline.
 */
export type EnrichContext = Pick<AppContext, "userId"> & {
  repos: Pick<AppContext["repos"], "requirements">;
  services: Pick<AppContext["services"], "llm">;
};

export const createEnrichedRequirement = async (
  ctx: EnrichContext,
  req: NewRequirement,
  description: string,
): Promise<Result<Requirement>> => {
  const result = await saveRequirement(ctx, req);
  if (!result.ok) return result;

  // Start pipleine and move on. This keeps the AI lifecycle sync/save responsive
  processReqLLM(ctx, result.value.id, description);

  return result;
};

/**
 * Fetch the user's requirements that are not yet in a terminal state
 * and derive aggregate sync status
 * */
export const getSyncStatusAction = async (
  repo: IRequirementRepository,
  userId: string,
  provider: TokenProvider,
): Promise<Result<SyncStatusResponse>> => {
  const activeStatsResult = await repo.getCountsByStatuses(userId, provider, [
    "RAW",
    "GENERATING",
  ]);

  if (!activeStatsResult.ok) {
    console.log("No active stats!");
    return fail("No Requirements found for this user!");
  }
  const activeStats = activeStatsResult.value;

  const totalCountResult = await repo.getTotalCount(userId, provider);
  if (!totalCountResult.ok) return fail(`Failed to load count for ${provider}`);

  const totalCount = totalCountResult.value;

  const raw = activeStats.RAW ?? 0;
  const generating = activeStats.GENERATING ?? 0;

  console.log("[REQ DB COUNTS] raw", raw);
  console.log("[REQ DB COUNTS] generating", generating);

  if (generating > 0)
    return ok({
      status: "PROCESSING",
      stats: { active: generating + raw, total: totalCount },
    });

  if (raw > 0)
    return ok({
      status: "INITIALIZED",
      stats: { active: raw, total: totalCount },
    });

  if (totalCount > 0)
    return ok({
      status: "COMPLETE",
      stats: { active: 0, total: totalCount },
    });

  return ok({ status: "INITIALIZED", stats: { active: 0, total: 0 } });
};

/**
 * Internal helper that manages the state for AI step generation.
 * Handles transitions: RAW -> GENERATING -> [COMPLETE | ERROR]
 */
async function processReqLLM(
  ctx: EnrichContext,
  id: string,
  description: string,
) {
  await ctx.repos.requirements.updateStatus(id, "GENERATING");

  console.log("[DOMAIN ACTTION] initiate step generation for: ", id);
  const llmResult = await generateSteps(ctx.services.llm, description);

  if (llmResult.ok) {
    await ctx.repos.requirements.updateSteps(
      id,
      llmResult.value.steps,
      "COMPLETE",
    );
    console.log(
      "[STEP GEN] completed for: ",
      llmResult.value.requirement_summary,
    );
  } else {
    await ctx.repos.requirements.updateStatus(id, "ERROR");
    console.log("[STEP GEN] error: ", llmResult.error);
  }
}
