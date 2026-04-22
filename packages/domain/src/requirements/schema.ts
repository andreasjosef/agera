import { z } from "zod";

import {
  RequirementTypeValues,
  RequirementSourceValues,
  StepGenerationStatusValues,
  SyncStatusValues,
} from "../shared/constants.ts";

export const RequirementTypeSchema = z.enum(RequirementTypeValues);
export const RequirementSourceSchema = z.enum(RequirementSourceValues);

export const StepSchema = z.object({
  id: z.string(),
  action: z.string(),
  outcomeDefinition: z.string(),
  curiosityTrigger: z.string(),
  theWin: z.string(),
  category: z.string(),
  complexity: z.coerce.number(),
  estimatedMinutes: z.coerce.number(),
  dependencyOrder: z.coerce.number(),
  quickStartLinkHint: z.string(),
});

export const RequirementSchema = z.object({
  id: z.string(),
  title: z.string(),
  due: z.string(),
  type: RequirementTypeSchema,
  source: RequirementSourceSchema,
  steps: z.array(StepSchema),
});

export const StepsLLMResponseSchema = z.object({
  requirement_summary: z.string(),
  steps: z.array(StepSchema),
});

export const StepGenerationStatusSchema = z.enum(StepGenerationStatusValues);
export const SyncStatusSchema = z.enum(SyncStatusValues);

export const SyncStatusResponseSchema = z.object({
  status: SyncStatusSchema,
  payload: z.array(RequirementSchema),
});
