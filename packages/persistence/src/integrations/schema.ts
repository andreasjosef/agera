import { PROVIDER_VALUES, INTEGRATION_STATUS_VALUES } from "@ccpilot/domain";

import * as t from "drizzle-orm/pg-core";
import { user } from "../db/schema.ts";

export const tokenProvider = t.pgEnum("tokenProvider", PROVIDER_VALUES);
export const integrationStatusEnum = t.pgEnum(
  "integrationStatus",
  INTEGRATION_STATUS_VALUES,
);

export const integrationsTable = t.pgTable(
  "integrations",
  {
    id: t.uuid("id").primaryKey().defaultRandom(),
    user_id: t
      .text("user_id")
      .references(() => user.id, { onDelete: "cascade" }),
    provider: tokenProvider().notNull(),
    // TODO: currently token is just text -> encrypt
    encryptedToken: t.text("encrypted_token").notNull(),
    // TODO: this should actually be CONNECT but need to do a whole session
    // to figure out what races what here.
    status: integrationStatusEnum().default("CONNECT").notNull(),
    updatedAt: t
      .timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    error: t.text(),
  },
  (table) => [
    t.uniqueIndex("user_provider_idx").on(table.user_id, table.provider),
  ],
);

export type IntegrationRow = typeof integrationsTable.$inferSelect;
