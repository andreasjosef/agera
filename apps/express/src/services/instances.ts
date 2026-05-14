import {
  createIntegrationsRepository,
  createRequirementRepo,
  createUserStatusRepository,
} from "@ccpilot/persistence";
import { createLLMClient } from "@ccpilot/llm-client";

export const reqRepo = createRequirementRepo();
export const integrationsRepo = createIntegrationsRepository();
export const userStatusRepo = createUserStatusRepository();
export const openrouterClient = createLLMClient();
