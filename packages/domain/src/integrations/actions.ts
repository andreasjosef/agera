import { isAfter } from "date-fns";

import { type Result, ok, fail } from "../shared/result.ts";
import { StepsLLMResponseSchema } from "../requirements/schema.ts";
import { createEnrichedRequirement } from "../requirements/actions.ts";

import { STEP_GEN_SYS_PROMPT_REASON_SE_V1 } from "../requirements/prompts.ts";

import type {
  RequirementContext,
  NewRequirement,
  StepsLLMResponse,
} from "../requirements/types.ts";

import { type LLMClientInterface } from "../services/llm.ts";

import type { IntegrationStatusResponse, IntegrationToken, TokenProvider } from "./types.ts";
import type { IIntegrationRepository } from "./repository.ts";



/**
 * Persists a 3rd-party provider token for a specific user to the integration repository.
 * If a token for the given provider and user already exists it will be updated instead.
 */
export const saveIntegrationAction = async <T>(
  userId: string,
  token: string,
  provider: TokenProvider,
  repo: IIntegrationRepository<T>,
): Promise<Result<void>> => {
  return await repo.save(userId, token, provider);
};

/**
 * Searches the integration table for a given provider and returns the the status of that integration as
 * IntegrationStatusResponse
 */
export const getIntegrationStatusAction = async <T>(
  userid: string,
  provider: TokenProvider,
  repo: IIntegrationRepository<T>,
  mapper: (row: T | null) => IntegrationStatusResponse,
): Promise<Result<IntegrationStatusResponse>> => {
  const result = await repo.getForProvider(userid, provider);

  if (!result.ok) {
    return ok({ status: "NOT_FOUND" });
  }

  return ok(mapper(result.value));
};

/**
 * Utilizes the LLM service to derive structured steps and summaries
 * from a raw requirement description.
 */
export const generateSteps = async (
  llm: LLMClientInterface,
  description: string,
): Promise<Result<StepsLLMResponse>> => {
  return llm.complete(
    STEP_GEN_SYS_PROMPT_REASON_SE_V1,
    `Here is the description: ${description}`,
    StepsLLMResponseSchema,
  );
};

/**
 * Orchestrates the retrieval of Canvas assignments and delegates
 * their creation to the internal llm enrichment requirement pipeline.
 */
export const syncCanvasReqsAction = async (
  ctx: RequirementContext,
): Promise<Result<void>> => {
  // TODO: this should eventually return SyncStatus result
  const courseResult = await ctx.canvas.fetchCourses();
  if (!courseResult.ok) return fail(courseResult.error);

  const assignmentResults = await Promise.all(
    courseResult.value.map((course) => ctx.canvas.fetchAssignments(course.id)),
  );

  const now = new Date();

  const assignements = assignmentResults.flatMap((res) => {
    if (!res.ok) return [];
    return res.value.filter((assignment) => isAfter(assignment.due, now));
  });

  for (const assignement of assignements) {
    // REFACTOR: Move this into a mapper function
    const requirement: NewRequirement = {
      title: assignement.title.trim(),
      source: "CANVAS",
      due: assignement.due,
      steps: [],
      type: "assignment",
    };

    await createEnrichedRequirement(ctx, requirement, assignement.description);
  }

  return ok(undefined);
};

export const loadIntegrationTokenAction = async <T>(
  userid: string,
  provider: TokenProvider,
  repo: IIntegrationRepository<T>,
  mapper: (row: T | null) => IntegrationToken
): Promise<Result<IntegrationToken>> => {
  const result = await repo.getForProvider(userid, provider)
  if(!result.ok) return fail(result.error)

  return ok(mapper(result.value));
};
