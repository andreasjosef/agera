import { pgEnum, pgTable, varchar, text, integer } from "drizzle-orm/pg-core";

export const requirementType = pgEnum("requirementType", [
  "assignment",
  "lecture",
]);

export const requirementSource = pgEnum("requirementSource", ["canvas"]);

export const requirementsTable = pgTable("requirements", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  due: varchar({ length: 255 }).notNull(),
  type: requirementType().notNull(),
  source: requirementSource().notNull(),
});

export const stepsTable = pgTable("steps", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  requirment_id: integer().references(() => requirementsTable.id),
  title: varchar({ length: 255 }).notNull(),
  outcome: text().notNull(),
  complexity: integer().notNull(),
});
