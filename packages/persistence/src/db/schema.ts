import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { INTEGRATION_STATUS_VALUES } from "@ccpilot/domain";

import * as t from "drizzle-orm/pg-core";

/**
 * Requirement Tables
 * */
export const requirementType = pgEnum("requirementType", [
  "assignment",
  "lecture",
]);

export const syncStatus = pgEnum("syncStatus", [
  "RAW",
  "GENERATING",
  "COMPLETE",
  "ERROR",
]);

export const stepType = pgEnum("stepType", [
  "admin",
  "deepwork",
  "research",
  "decisions",
  "planning",
  "polish",
]);

export const requirementSource = pgEnum("requirementSource", ["canvas"]);

export const requirementsTable = pgTable("requirements", {
  id: t.uuid("id").primaryKey().defaultRandom(),
  user_id: t.text().references(() => user.id),
  title: t.varchar({ length: 255 }).notNull(),
  due: t.varchar({ length: 255 }).notNull(),
  type: requirementType().default("assignment").notNull(),
  source: requirementSource().default("canvas").notNull(),
  status: syncStatus().default("RAW").notNull(),
  updatedAt: t
    .timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const stepsTable = pgTable("steps", {
  id: t.uuid("id").primaryKey().defaultRandom(),
  stepKey: t.varchar("step_key", { length: 255 }).notNull(),
  requirement_id: t
    .uuid("requirement_id")
    .references(() => requirementsTable.id, { onDelete: "cascade" }),
  action: t.text().notNull(),
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

// Integration Table
export const tokenProvider = pgEnum("tokenProvider", ["CANVAS"]);
export const integrationStatusEnum = pgEnum(
  "integrationStatus",
  INTEGRATION_STATUS_VALUES,
);

export const integrationsTable = pgTable(
  "integrations",
  {
    id: t.uuid().defaultRandom(),
    user_id: t
      .text("user_id")
      .references(() => user.id, { onDelete: "cascade" }),
    provider: tokenProvider().notNull(),
    // TODO: currently token is just text -> encrypt
    encryptedToken: t.text("encrypted_token").notNull(),
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

/**
 * User Tables
 *
 * NOTE: We are using these table definitions here
 * to have the db ready for a move to better-auth as these are the required tables.
 * See: -> https://better-auth.com/docs/concepts/database
 * The tables themself are copied form the homepage which provides as drizzle schemas!
 * */
export const user = pgTable("user", {
  id: t.text("id").primaryKey(),
  name: t.text("name").notNull(),
  email: t.varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: t.boolean("email_verified").notNull(),
  image: t.text("image"),
  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", { precision: 6, withTimezone: true })
    .notNull(),
});

export const session = pgTable("session", {
  id: t.text("id").primaryKey(),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: t.varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: t
    .timestamp("expires_at", { precision: 6, withTimezone: true })
    .notNull(),
  ipAddress: t.text("ip_address"),
  userAgent: t.text("user_agent"),
  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", { precision: 6, withTimezone: true })
    .notNull(),
});

export const account = pgTable("account", {
  id: t.text("id").primaryKey(),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: t.text("account_id").notNull(),
  providerId: t.text("provider_id").notNull(),
  accessToken: t.text("access_token"),
  refreshToken: t.text("refresh_token"),
  accessTokenExpiresAt: t.timestamp("access_token_expires_at", {
    precision: 6,
    withTimezone: true,
  }),
  refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at", {
    precision: 6,
    withTimezone: true,
  }),
  scope: t.text("scope"),
  idToken: t.text("id_token"),
  password: t.text("password"),
  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", { precision: 6, withTimezone: true })
    .notNull(),
});
