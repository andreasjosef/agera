import { z } from "zod";

import {
  RequirementSchema,
  StepGenerationStatusSchema,
  StepSchema,
  StepsLLMResponseSchema,
  SyncStatusResponseSchema,
} from "./schema.ts";

import { type IRequirementRepository } from "./repository.ts";
import { type CanvasClientInterface } from "../services/canvas.ts";
import { type LLMClientInterface } from "../services/llm.ts";

export type Requirement = z.infer<typeof RequirementSchema>;
export type NewRequirement = Omit<Requirement, "id">;

export type Step = z.infer<typeof StepSchema>;
export type StepsLLMResponse = z.infer<typeof StepsLLMResponseSchema>;

export type StepGenerationStatus = z.infer<typeof StepGenerationStatusSchema>;
export type SyncStatusResponse = z.infer<typeof SyncStatusResponseSchema>;

export interface RequirementContext {
  repo: IRequirementRepository;
  canvas: CanvasClientInterface;
  llm: LLMClientInterface;
  userId: string;
}
