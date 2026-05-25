import { type Result } from "../shared/result.ts";
import { z } from "zod";

// Schemas & Types
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
});

export const signUpFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Namnet måste vara minst 2 tecken")
    .max(40, "För långt! Namnet får vara max 40 tecken")
    .regex(/^[A-Za-zÅÄÖåäöé -]+$/, "Namnet får endast innehålla bokstäver"),

  email: z.email("Ogiltig e-postadress").trim(),

  password: z
    .string()
    .min(8, "Lösenordet måste vara minst 8 tecken")
    .max(30, "För långt! Lösenordet får vara max 30 tecken")
    .regex(/[A-ZÅÄÖ]/, "Lösenordet måste innehålla minst en stor bokstav")
    .regex(/[0-9]/, "Lösenordet måste innehålla minst en siffra"),
});

export const loginInFormSchema = z.object({
  email: z.email("Ogiltig e-postadress").trim(),
  password: z.string().min(1, "Lösenordet är obligatoriskt"),
});

export const UserStatusSchema = z.object({
  active: z.boolean(),
});

export const ActiveTimerCountSchema = z.object({
  count: z.number(),
});

export const ToggleActiveStatusSchema = z.object({
  isActive: z.boolean(),
});

export type UserStatus = z.infer<typeof UserStatusSchema>;
export type ActiveUserCount = z.infer<typeof ActiveTimerCountSchema>;
export type SignUpForm = z.infer<typeof signUpFormSchema>;
export type LoginInForm = z.infer<typeof loginInFormSchema>;
export type UserIdentity = z.infer<typeof UserIdentitySchema>;
export type NewUser = z.infer<typeof NewUserSchema>;
export type SafeUser = z.infer<typeof SafeUserSchema>;

// Respository

// TODO: Write proper docs, this doesn't help !
/**
 * Repository responsable for managing user status
 * @group Definitions
 */
export interface IUserStatusRepository {
  toggleActive: (
    userId: string,
    isActive: boolean,
  ) => Promise<Result<UserStatus>>;
  getIsActive: (userId: string) => Promise<Result<UserStatus>>;
  getActiveCount: () => Promise<Result<ActiveUserCount>>;
}
