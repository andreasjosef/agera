import z from "zod";

import {
  TokenPayloadSchema,
  TokenProviderSchema,
  IntegrationStatusResponseSchema,
  IntegrationStatusSchema,
} from "./schema.ts";

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;
export type TokenProvider = z.infer<typeof TokenProviderSchema>;
export type IntegrationStatus = z.infer<typeof IntegrationStatusSchema>;

export type IntegrationStatusResponse = z.infer<
  typeof IntegrationStatusResponseSchema
>;

export type Integration = {
  provider: TokenProvider;
  token: string;
  lastSync?: string;
  status: IntegrationStatus;
  error?: string;
};

