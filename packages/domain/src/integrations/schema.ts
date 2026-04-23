import { z } from "zod";

const PROVIDER_VALUES = ["CANVAS"] as const;

const TokenProviderSchema = z.enum(PROVIDER_VALUES);

export const TokenPayloadSchema = z.object({
  token: z.string(),
  provider: TokenProviderSchema,
});
