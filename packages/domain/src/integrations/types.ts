import z from "zod";

import {
  IntegrationTokenSchema,
  TokenProviderSchema,
  IntegrationStatusResponseSchema,
  IntegrationStatusSchema,
} from "./schema.ts";

export type IntegrationToken = z.infer<typeof IntegrationTokenSchema>;
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
