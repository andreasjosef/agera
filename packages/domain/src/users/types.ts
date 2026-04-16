import { z } from "zod";
import { UserIdentitySchema, NewUserSchema } from "./schema.ts";

export type UserIdentity = z.infer<typeof UserIdentitySchema>;
export type NewUser = z.infer<typeof NewUserSchema>;
