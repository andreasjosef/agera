import * as z from 'zod'

export const signUpformSchema = z.object({

    name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(40, 'Too long! Name must be 40 characters or less')
    .regex(/^[A-Za-z]+$/, 'Name can only contain letters'),

    email: z
    .email()
    .trim(),

    password: z
    .string()
    .min(8, 'Password must be 8 or more characters')
    .max(30, 'Too long! Password must be 30 characters or less')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
})


export type SignUpForm = z.infer<typeof signUpformSchema>