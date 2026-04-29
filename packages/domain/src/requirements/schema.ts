import { z } from "zod";

import {
  RequirementTypeValues,
  RequirementSourceValues,
  StepGenerationStatusValues,
  SyncStatusValues,
} from "../shared/constants.ts";
import { TokenProviderSchema } from "../integrations/schema.ts";

export const RequirementTypeSchema = z.enum(RequirementTypeValues);
export const RequirementSourceSchema = z.enum(RequirementSourceValues);
export const StepTypeSchema = z.enum([
  "admin",
  "deepwork",
  "planning",
  "polish",
  "decisions",
]);

export const SyncStatusSchema = z.enum(SyncStatusValues);
export const StepGenerationStatusSchema = z.enum(StepGenerationStatusValues);

export const StepSchema = z.object({
  id: z.uuid(),
  stepKey: z.string(),
  action: z.string(),
  outcomeDefinition: z.string(),
  curiosityTrigger: z.string(),
  theWin: z.string(),
  category: StepTypeSchema,
  complexity: z.coerce.number(),
  estimatedMinutes: z.coerce.number(),
  dependencyOrder: z.coerce.number(),
  quickStartLinkHint: z.string(),
});

export const NewStepSchema = StepSchema.omit({
  id: true,
});

export const RequirementSchema = z.object({
  id: z.string(),
  title: z.string(),
  due: z.string(),
  type: RequirementTypeSchema,
  source: TokenProviderSchema,
  steps: z.array(StepSchema),
  status: StepGenerationStatusSchema,
  updatedAt: z.coerce.date(),
});

export const StepsLLMResponseSchema = z.object({
  requirement_summary: z.string(),
  steps: z.array(NewStepSchema),
});

export const SyncStatusResponseSchema = z.object({
  status: SyncStatusSchema,
  stats: z.object({
    active: z.number(),
    total: z.number(),
  }),
});

export const NewRequirementSchema = RequirementSchema.omit({
  id: true,
  status: true,
  updatedAt: true
})

