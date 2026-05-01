import { type Result } from "../../shared/result.ts";
import { type LLMClientInterface } from "../../services/llm.ts";
import { StepsLLMResponseSchema } from "../../requirements/schema.ts";
import { type StepsLLMResponse } from "../../requirements/types.ts";
import { STEP_GEN_SYS_PROMPT_REASON_SE_V1 } from "../../requirements/prompts.ts";

/**
 * Utilizes the LLM service to generate structured steps and summaries
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
