import {
  PROVIDER_VALUES,
  RequirementTypeValues,
  StepGenerationStatusValues,
  StepTypeValues,
} from "@ccpilot/domain";
import * as t from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "../db/schema.ts";
import { integrationsTable } from "../db/schema.ts";

/**
 * Requirement Tables
 * */
export const requirementType = t.pgEnum(
  "requirementType",
  RequirementTypeValues,
);
export const syncStatus = t.pgEnum("syncStatus", StepGenerationStatusValues);
export const stepType = t.pgEnum("stepType", StepTypeValues);
export const requirementSource = t.pgEnum("requirementSource", PROVIDER_VALUES);

export const requirementsTable = t.pgTable(
  "requirements",
  {
    id: t.uuid("id").primaryKey().defaultRandom(),
    user_id: t.text().references(() => user.id),
    integrationId: t
      .uuid()
      .references(() => integrationsTable.id, { onDelete: "cascade" }),
    externalId: t.varchar("external_id", { length: 255 }),
    title: t.varchar({ length: 255 }).notNull(),
    due: t.varchar({ length: 255 }).notNull(),
    type: requirementType().default("assignment").notNull(),
    source: requirementSource().default("CANVAS").notNull(),
    status: syncStatus().default("RAW").notNull(),
    requirementSummary: t.text("requirement_summary"),
    updatedAt: t
      .timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },

  (table) => [
    t.index("req_integration_idx").on(table.integrationId),
    t
      .unique("uq_integration_external_id")
      .on(table.integrationId, table.externalId),
  ],
);

export const stepsTable = t.pgTable("steps", {
  id: t.uuid("id").primaryKey().defaultRandom(),
  stepKey: t.varchar("step_key", { length: 255 }).notNull(),
  requirement_id: t
    .uuid("requirement_id")
    .references(() => requirementsTable.id, { onDelete: "cascade" }),
  action: t.text().notNull(),
  completed: t.boolean().default(false),
  outcomeDefinition: t.text("outcome_definition").notNull(),
  curiosityTrigger: t.text("curiosity_trigger").notNull(),
  theWin: t.text("win").notNull(),
  category: stepType().notNull(),
  complexity: t.numeric().notNull(),
  estimatedMinutes: t.numeric("est_minutes"),
  dependencyOrder: t.numeric("dependency_order"),
  quickStartLinkHint: t.text(),
});

// Requirement and Steps relationships
export const requirementsRelations = relations(
  requirementsTable,
  ({ many }) => ({
    steps: many(stepsTable),
  }),
);

export const stepsRelations = relations(stepsTable, ({ one }) => ({
  requirement: one(requirementsTable, {
    fields: [stepsTable.requirement_id],
    references: [requirementsTable.id],
  }),
}));
