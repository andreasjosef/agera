import * as t from "drizzle-orm/pg-core";
import { user } from "../db/schema.ts";

export const userStatusTable = t.pgTable("status", {
  user_id: t
    .text("user_id")
    .primaryKey()
    .references(() => user.id),
  timer_active: t.boolean("timer_active").notNull().default(false),
});
