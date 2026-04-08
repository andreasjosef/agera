import { z } from "zod";

import {
  RequirementTypeValues,
  RequirementSourceValues,
} from "../shared/constants.ts";

export const RequirementTypeSchema = z.enum(RequirementTypeValues);
export const RequirementSourceSchema = z.enum(RequirementSourceValues);

export const StepSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  outcome: z.string(),
  complexity: z.number(),
});

export const RequirementSchema = z.object({
  id: z.string(),
  title: z.string(),
  due: z.string(),
  type: RequirementTypeSchema,
  source: RequirementSourceSchema,
  steps: z.array(StepSchema),
});
