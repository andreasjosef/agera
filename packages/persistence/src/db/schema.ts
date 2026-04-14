import { pgEnum, pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";


export const requirementType = pgEnum("requirementType", [
  "assignment",
  "lecture",
]);

export const requirementSource = pgEnum("requirementSource", [
  "canvas",
]);

export const requirementsTable = pgTable("requirements", {
  id: text("cuid").primaryKey(),
  type: requirementType("type").notNull(),
  title: text("title").notNull(),
  due: timestamp("due", { mode: "date" }).notNull(),
  source: requirementSource("source").notNull(),
});

export const stepsTable = pgTable("steps", {
  id: text("cuid").primaryKey(),
  requirementId: text("requirement_id")
    .notNull()
    .references(() => requirementsTable.id),
  title: text("title").notNull(),
  outcome: text("outcome").notNull(),
  complexity: integer("complexity").notNull(),
});