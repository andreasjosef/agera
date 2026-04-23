import z from "zod";

import { TokenPayloadSchema, TokenProviderSchema } from "./schema.ts";

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;
export type TokenProvider = z.infer<typeof TokenProviderSchema>;
