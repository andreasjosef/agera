import { z } from "zod";
import { type Result } from "../shared/result.ts";

/**
 * The Integration Domain is responsible for managing the lifecycle of external
 * connections like Canvas.
 * */

//======================================================================
// Constants & Enums
// =====================================================================
export const PROVIDER_VALUES = ["CANVAS", "MANUAL"] as const;
export const INTEGRATION_STATUS_VALUES = [
  "CONNECT",
  "SYNCING",
  "STABLE",
  "ERROR",
  "NOT_FOUND",
] as const;

export const IntegrationStatusSchema = z.enum(INTEGRATION_STATUS_VALUES);
export type IntegrationStatus = z.infer<typeof IntegrationStatusSchema>;

export const TokenProviderSchema = z.enum(PROVIDER_VALUES);
export type TokenProvider = z.infer<typeof TokenProviderSchema>;

//=======================================================================
// Schemas & Types
// ======================================================================
export type Integration = {
  provider: TokenProvider;
  token: string;
  lastSync?: string;
  status: IntegrationStatus;
  error?: string;
};

export const IntegrationTokenSchema = z.object({
  token: z.string(),
  provider: TokenProviderSchema,
});

export type IntegrationToken = z.infer<typeof IntegrationTokenSchema>;

export const IntegrationStatusResponseSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("NOT_FOUND"),
  }),

  z.object({
    status: z.literal("CONNECT"),
  }),

  z.object({
    status: z.literal("SYNCING"),
    lastSync: z.coerce.date().optional(),
  }),

  z.object({
    status: z.literal("STABLE"),
    lastSync: z.coerce.date(),
  }),
  z.object({
    status: z.literal("ERROR"),
    lastSync: z.coerce.date().optional(),
    error: z.string(),
  }),
]);

export type IntegrationStatusResponse = z.infer<
  typeof IntegrationStatusResponseSchema
>;

//=======================================================================
// Respository
// ======================================================================
export interface IIntegrationRepository {
  save: (
    userId: string,
    token: string,
    provider: TokenProvider,
  ) => Promise<Result<void>>;

  getForProvider: (
    user: string,
    provider: TokenProvider,
  ) => Promise<Result<Integration>>;

  getAll: (user: string) => Promise<Result<IntegrationToken[]>>;
}
