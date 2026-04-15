import { z } from "zod";

import {
  RequirementSchema,
  StepSchema,
  StepsLLMResponseSchema,
} from "./schema.ts";

export type Requirement = z.infer<typeof RequirementSchema>;
export type NewRequirement = Omit<Requirement, "id">;

export type Step = z.infer<typeof StepSchema>;
export type StepsLLMResponse = z.infer<typeof StepsLLMResponseSchema>;
