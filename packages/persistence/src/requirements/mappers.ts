import {
  type Step,
  type NewStep,
  type Requirement,
  StepSchema,
} from "@ccpilot/domain";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { requirementsTable } from "../db/schema.ts";
import { stepsTable } from "../db/schema.ts";

type RequirementRow = InferSelectModel<typeof requirementsTable>;
type StepsRow = InferSelectModel<typeof stepsTable>;

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

export const toDomainStep = (row: StepsRow): Step => {
  return StepSchema.parse({
    id: row.id,
    stepKey: row.stepKey,
    action: row.action,
    outcomeDefinition: row.outcomeDefinition,
    curiosityTrigger: row.curiosityTrigger,
    theWin: row.theWin,
    category: row.category,
    complexity: row.complexity.toString(),
    // TODO: figure out why these are optional they should not
    estimatedMinutes: row.estimatedMinutes ? Number(row.estimatedMinutes) : 0,
    dependencyOrder: row.dependencyOrder ? Number(row.dependencyOrder) : 0,
    quickStartLinkHint: row.quickStartLinkHint ?? "",
  });
};

export const toDbStep = (
  step: NewStep,
  reqId: string,
): InferInsertModel<typeof stepsTable> => {
  return {
    stepKey: step.stepKey,
    requirement_id: reqId,
    action: step.action,
    outcomeDefinition: step.outcomeDefinition,
    curiosityTrigger: step.curiosityTrigger,
    theWin: step.theWin,
    category: step.category,
    complexity: step.complexity.toString(),
    // TODO: figure out why these are optional they should not
    estimatedMinutes: step.estimatedMinutes?.toString() ?? "0",
    dependencyOrder: step.dependencyOrder?.toString() ?? "0",
    quickStartLinkHint: step.quickStartLinkHint,
  };
};
