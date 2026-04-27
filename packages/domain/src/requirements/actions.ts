import { fail, ok, type Result } from "../shared/result.ts";

import type {
  Requirement,
  NewRequirement,
  RequirementContext,
  SyncStatusResponse,
  SyncStatus,
} from "./types.ts";

import type { IRequirementRepository } from "./repository.ts";
import { generateSteps } from "../integrations/actions.ts";

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
export const saveRequirement = async (
  ctx: Pick<RequirementContext, "repo" | "userId">,
  req: NewRequirement,
): Promise<Result<Requirement>> => {
  // TODO: some validation will have to happen here like
  //  - does this already exist in the db
  return ctx.repo.save(req, ctx.userId);
};

/**
 * High-level orchestrator that persists a requirement and initiates
 * the asynchronous AI enrichment pipeline.
 */
export const createEnrichedRequirement = async (
  ctx: RequirementContext,
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
): Promise<Result<SyncStatusResponse>> => {
  const recentResult = await repo.getRecent(userId, 10);
  if (!recentResult.ok) return fail(recentResult.error);

  const recent = recentResult.value;

  if (recent.length === 0) {
    return ok({ status: "IDLE", payload: [] });
  }

  const isGenerating = recent.some((req) => req.status === "GENERATING");
  const isRaw = recent.some((req) => req.status === "RAW");

  let aggregateStatus: SyncStatus = "COMPLETE";

  if (isGenerating) aggregateStatus = "PROCESSING";
  else if (isRaw) aggregateStatus = "INITIALIZED";

  return ok({ status: aggregateStatus, payload: recent });
};

/**
 * Internal helper that manages the state for AI step generation.
 * Handles transitions: RAW -> GENERATING -> [COMPLETE | ERROR]
 */
async function processReqLLM(
  ctx: RequirementContext,
  id: string,
  description: string,
) {
  await ctx.repo.updateStatus(id, "GENERATING");

  console.log("[DOMAIN ACTTION] initiate step generation for: ", id);
  const llmResult = await generateSteps(ctx.llm, description);

  if (llmResult.ok) {
    await ctx.repo.updateSteps(id, llmResult.value.steps, "COMPLETE");
    console.log(
      "[STEP GEN] completed for: ",
      llmResult.value.requirement_summary,
    );
  } else {
    await ctx.repo.updateStatus(id, "ERROR");
    console.log("[STEP GEN] error: ", llmResult.error);
  }
}
