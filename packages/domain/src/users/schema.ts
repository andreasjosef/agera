import { z } from "zod";

export const UserIdentitySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

export const NewUserSchema = UserIdentitySchema.omit({
  id: true,
});

export const SafeUserSchema = UserIdentitySchema.omit({
  password: true,
  id: true
});