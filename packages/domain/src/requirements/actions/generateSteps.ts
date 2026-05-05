import { type Result } from "../../shared/result.ts";
import { type LLMClientInterface } from "../../services/llm.ts";
import {
  type StepsLLMResponse,
  type RequirementType,
  StepsLLMResponseSchema,
} from "../../requirements/definitions.ts";
import { assembleSystemPrompt } from "../prompts/loader.ts";

/**
 * Utilizes the LLM service to generate structured steps and summaries
 * from a raw requirement description.
 */
export const generateSteps = async (
  llm: LLMClientInterface,
  description: string,
  type: RequirementType,
): Promise<Result<StepsLLMResponse>> => {
  const template =
    type === "message" ? "templates/message-triage" : "templates/initial-sync";

  const systemPrompt = assembleSystemPrompt([
    "core/identity",
    "core/npf-logic",
    template,
    "templates/fallback",
    "core/output-rules",
    "json/schema.v1",
    "core/style",
  ]);

  return llm.complete(
    systemPrompt,
    `Here is the description: ${description}`,
    StepsLLMResponseSchema,
  );
};
