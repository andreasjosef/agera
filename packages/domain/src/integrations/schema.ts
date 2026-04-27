import { z } from "zod";

export const PROVIDER_VALUES = ["CANVAS"] as const;

export const TokenProviderSchema = z.enum(PROVIDER_VALUES);
export const INTEGRATION_STATUS_VALUES = [
  "CONNECT",
  "SYNCING",
  "STABLE",
  "ERROR",
  "NOT_FOUND",
] as const;

export const TokenPayloadSchema = z.object({
  token: z.string(),
  provider: TokenProviderSchema,
});

export const IntegrationStatusResponseSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("NOT_FOUND"),
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
