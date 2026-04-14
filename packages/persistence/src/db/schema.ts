import {
  pgEnum,
  pgTable,
  varchar,
  text,
  integer,
  uuid,
} from "drizzle-orm/pg-core";

export const requirementType = pgEnum("requirementType", [
  "assignment",
  "lecture",
]);

export const requirementSource = pgEnum("requirementSource", ["canvas"]);

export const requirementsTable = pgTable("requirements", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  due: varchar({ length: 255 }).notNull(),
  type: requirementType().default("assignment").notNull(),
  source: requirementSource().default("canvas").notNull(),
});

export const stepsTable = pgTable("steps", {
  id: uuid("id").primaryKey().defaultRandom(),
  stepKey: varchar("step_key", { length: 255 }).notNull(),
  requirement_id: uuid("requirement_id").references(
    () => requirementsTable.id,
    { onDelete: "cascade" },
  ),
  title: varchar({ length: 255 }).notNull(),
  outcome: text().notNull(),
  complexity: integer().notNull(),
});
