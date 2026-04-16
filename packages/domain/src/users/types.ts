import { z } from "zod";
import { UserIdentitySchema, NewUserSchema, SafeUserSchema } from "./schema.ts";

export type UserIdentity = z.infer<typeof UserIdentitySchema>;
export type NewUser = z.infer<typeof NewUserSchema>;
export type SafeUser = z.infer<typeof SafeUserSchema>;