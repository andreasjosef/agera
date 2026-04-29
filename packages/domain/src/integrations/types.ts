import z from "zod";

import {
  TokenPayloadSchema,
  TokenProviderSchema,
  IntegrationStatusResponseSchema,
} from "./schema.ts";

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;
export type TokenProvider = z.infer<typeof TokenProviderSchema>;

export type IntegrationStatusResponse = z.infer<
  typeof IntegrationStatusResponseSchema
>;

export type IntegrationToken = {
  token: string
  provider: TokenProvider
}