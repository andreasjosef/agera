import { z } from "zod";

/**
 * The Integration Domain is responsible for managing the lifecycle of external
 * connections like Canvas.
 * */

//======================================================================
// Constants
// =====================================================================
export const PROVIDER_VALUES = ["CANVAS"] as const;
export const INTEGRATION_STATUS_VALUES = [
  "CONNECT",
  "SYNCING",
  "STABLE",
  "ERROR",
  "NOT_FOUND",
] as const;

//=======================================================================
// Enums
// ======================================================================
export const IntegrationStatusSchema = z.enum(INTEGRATION_STATUS_VALUES);
export const TokenProviderSchema = z.enum(PROVIDER_VALUES);

//=======================================================================
// Schemas
// ======================================================================
export const TokenPayloadSchema = z.object({
  token: z.string(),
  provider: TokenProviderSchema,
});

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
