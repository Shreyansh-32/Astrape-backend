import z from "zod";

export enum Status{
    success = 200,
    internal_server_error = 500,
    unauthorized = 403,
    not_found = 404,
    invalid_input_types = 411
};

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string()
    .min(8, { message: 'Minimum length 8' })
    .max(20, { message: 'Maximum length 20' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Must contain one uppercase alphabet',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Must contain one lowercase alphabet',
    })
    .refine((password) => /[0-9]/.test(password), { message: 'Must contain one digit' })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: 'Must contain one special character',
    }),
    firstname: z.string(),
    lastname: z.string(),
});

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
    .min(8, { message: 'Minimum length 8' })
    .max(20, { message: 'Maximum length 20' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Must contain one uppercase alphabet',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Must contain one lowercase alphabet',
    })
    .refine((password) => /[0-9]/.test(password), { message: 'Must contain one digit' })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: 'Must contain one special character',
    })
});