import { type AppContext } from "../../shared/context.ts";
import { type Result } from "../../shared/result.ts";
import type {
  NewRequirement,
  Requirement,
  RequirementType,
} from "../definitions.ts";
import { saveRequirement } from "./saveRequirement.ts";
import { generateSteps } from "./generateSteps.ts";

export type EnrichContext = Pick<AppContext, "userId"> & {
  repos: Pick<AppContext["repos"], "requirements">;
  services: Pick<AppContext["services"], "llm">;
};

/**
 * High-level orchestrator that persists a requirement and initiates
 * the asynchronous AI enrichment pipeline.
 */
export const createEnrichedRequirement = async (
  ctx: EnrichContext,
  req: NewRequirement,
  description: string,
): Promise<Result<Requirement>> => {
  const result = await saveRequirement(ctx, req);
  if (!result.ok) return result;

  // Send Requirements with an error status to the LLM again
  if (
    result.value.status === "COMPLETE" ||
    result.value.status === "GENERATING"
  )
    return result;

  // Start pipleine and move on. This keeps the AI lifecycle sync/save responsive
  processReqLLM(ctx, result.value.id, description, req.type);

  return result;
};

/**
 * Helper that manages the requirment state during AI step generation.
 * Handles transitions: RAW -> GENERATING -> [COMPLETE | ERROR]
 */
async function processReqLLM(
  ctx: EnrichContext,
  id: string,
  description: string,
  type: RequirementType,
) {
  await ctx.repos.requirements.updateStatus(id, "GENERATING");

  console.log("[DOMAIN ACTTION] initiate step generation for: ", id);
  const llmResult = await generateSteps(ctx.services.llm, description, type);

  if (llmResult.ok) {
    await ctx.repos.requirements.updateSteps(
      id,
      llmResult.value.steps,
      "COMPLETE",
      llmResult.value.requirement_summary,
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
