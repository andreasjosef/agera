import { pgEnum, pgTable, serial } from "drizzle-orm/pg-core";

export const requirementType = pgEnum("requirementType", [
  "assignment",
  "lecture",
  "examn",
  "admin",
]);

export const requirementsTable = pgTable("requirements", {
  id: serial("requirement_id").primaryKey(),
  type: requirementType(),
});
