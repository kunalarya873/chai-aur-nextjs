import { z } from 'zod';

export const usernameValidation = z.string().min(2, "Username must be atleast 2 character").max(20, "Username must be no more than 20").regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be atleast 6 character").max(20, "Password must be no more than 20 character")
})
export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be atleast 6 character").max(20, "Password must be no more than 20 character")
})
export const resetPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email")
})