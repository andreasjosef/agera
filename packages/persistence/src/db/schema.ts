import { pgEnum, pgTable, varchar, text, integer } from "drizzle-orm/pg-core";

export const requirementType = pgEnum("requirementType", [
  "assignment",
  "lecture",
]);

export const requirementSource = pgEnum("requirementSource", ["canvas"]);

export const requirementsTable = pgTable("requirements", {
  id: text().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  due: varchar({ length: 255 }).notNull(),
  type: requirementType().default("assignment").notNull(),
  source: requirementSource().default("canvas").notNull(),
});

export const stepsTable = pgTable("steps", {
  id: text().primaryKey(),
  requirment_id: text().references(() => requirementsTable.id),
  title: varchar({ length: 255 }).notNull(),
  outcome: text().notNull(),
  complexity: integer().notNull(),
});
