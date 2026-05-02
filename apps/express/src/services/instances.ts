import {
  createIntegrationsRepository,
  createRequirementRepo,
  db,
} from "@ccpilot/persistence";
import { createLLMClient } from "@ccpilot/llm-client";

export const reqRepo = createRequirementRepo();
export const integrationsRepo = createIntegrationsRepository(db);
export const openrouterClient = createLLMClient();
