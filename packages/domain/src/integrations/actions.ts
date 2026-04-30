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

import type {
  IntegrationStatusResponse,
  Integration,
  TokenProvider,
} from "./types.ts";
import type { IIntegrationRepository } from "./repository.ts";

/**
 * Persists a 3rd-party provider token for a specific user to the integration repository.
 * If a token for the given provider and user already exists it will be updated instead.
 */
export const saveIntegrationAction = async (
  userId: string,
  token: string,
  provider: TokenProvider,
  repo: IIntegrationRepository,
): Promise<Result<void>> => {
  return await repo.save(userId, token, provider);
};

/**
 * Searches the integration table for a given provider and returns the the status of that integration as
 * IntegrationStatusResponse
 */
export const getIntegrationStatusAction = async (
  userid: string,
  provider: TokenProvider,
  repo: IIntegrationRepository,
): Promise<Result<IntegrationStatusResponse>> => {
  const result = await repo.getForProvider(userid, provider);

  if (!result.ok) {
    return ok({ status: "NOT_FOUND" });
  }

  const integration = result.value;

  // This helper ensures that what leaves the Action is a Date object or undefined
  const ensureDate = (
    d: Date | string | null | undefined,
  ): Date | undefined => {
    if (!d) return undefined;

    const date = d instanceof Date ? d : new Date(d);

    return isNaN(date.getTime()) ? undefined : date;
  };

  switch (integration.status) {
    case "CONNECT":
      return ok({
        status: "CONNECT",
      });
    case "SYNCING":
      return ok({
        status: "SYNCING",
        lastSync: ensureDate(integration.lastSync),
      });
    case "STABLE":
      return ok({
        status: "STABLE",
        lastSync: ensureDate(integration.lastSync) ?? new Date(),
      });
    case "ERROR":
      return ok({
        status: "ERROR",
        lastSync: ensureDate(integration.lastSync),
        error: integration.error ?? "An unknown integration error occurred!",
      });

    default:
      return ok({ status: "NOT_FOUND" });
  }
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

export const loadIntegrationTokenAction = async (
  userid: string,
  provider: TokenProvider,
  repo: IIntegrationRepository,
): Promise<Result<Integration>> => {
  const result = await repo.getForProvider(userid, provider);
  if (!result.ok) return fail(result.error);

  return ok(result.value);
};
