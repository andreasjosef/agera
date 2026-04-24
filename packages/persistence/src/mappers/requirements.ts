import { type Step, type Requirement } from "@ccpilot/domain";
import { type InferSelectModel } from "drizzle-orm";
import { requirementsTable } from "../db/schema.ts";

type RequirementRow = InferSelectModel<typeof requirementsTable>;

export const toDomainRequirement = (
  dbRow: RequirementRow,
  steps: Step[] = [],
): Requirement => {
  return {
    id: dbRow.id,
    title: dbRow.title,
    due: dbRow.due,
    type: dbRow.type,
    steps: steps,
    source: dbRow.source,
    status: dbRow.status,
    updatedAt: dbRow.updatedAt,
  };
};
