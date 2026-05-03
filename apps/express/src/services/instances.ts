import {
  createIntegrationsRepository,
  createRequirementRepo,
} from "@ccpilot/persistence";
import { createLLMClient } from "@ccpilot/llm-client";

export const reqRepo = createRequirementRepo();
export const integrationsRepo = createIntegrationsRepository();
export const openrouterClient = createLLMClient();
