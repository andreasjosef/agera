import { z } from "zod";

import {
  RequirementSchema,
  StepSchema,
  StepsLLMResponseSchema,
} from "./schema.ts";

import { type IRequirementRepository } from "./repository.ts";
import { type CanvasClientInterface } from "../services/canvas.ts";
import { type LLMClientInterface } from "../services/llm.ts";

export type Requirement = z.infer<typeof RequirementSchema>;
export type NewRequirement = Omit<Requirement, "id">;

export type Step = z.infer<typeof StepSchema>;
export type StepsLLMResponse = z.infer<typeof StepsLLMResponseSchema>;

export interface RequirementContext {
  repo: IRequirementRepository;
  canvas: CanvasClientInterface;
  llm: LLMClientInterface;
  userId: string;
}
