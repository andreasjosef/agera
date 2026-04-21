import { type Result } from "../shared/result.ts";

import type {
  Requirement,
  NewRequirement,
  Step,
  StepsLLMResponse,
} from "./types.ts";

import type { IRequirementRepository } from "./repository.ts";
import { type LLMClientInterface } from "../services/llm.ts";
import { StepSchema, StepsLLMResponseSchema } from "./schema.ts";

import { STEP_GEN_SYS_PROMPT } from "./prompts.ts";

export const getRequirements = async (
  repo: IRequirementRepository,
  userId: string,
): Promise<Result<Requirement[]>> => {
  return repo.getAll(userId);
};

export const saveRequirement = async (
  repo: IRequirementRepository,
  req: NewRequirement,
  userId: string,
): Promise<Result<Requirement>> => {
  // TODO: some validation will have to happen here like
  //  - does this already exist in the db
  return repo.save(req, userId);
};

export const generateSteps = async (
  llm: LLMClientInterface,
  description: string,
): Promise<Result<StepsLLMResponse>> => {
  return llm.complete(
    STEP_GEN_SYS_PROMPT,
    `Here is the description: ${description}`,
    StepsLLMResponseSchema,
  );
};
