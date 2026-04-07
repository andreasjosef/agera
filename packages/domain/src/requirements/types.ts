import { z } from "zod";

import { RequirementSchema, StepSchema } from "./schema.ts";

export type Requirement = z.infer<typeof RequirementSchema>;
export type Step = z.infer<typeof StepSchema>;
