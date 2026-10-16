import { z } from 'zod';

/**
 * 🏛️ ZOD SCHEMA: LOGIN
 */
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email address is required.' })
    .min(1, 'Email address is required.')
    .email('Please enter a valid email address.'),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(6, 'Password must be at least 6 characters.'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * 🏛️ ZOD SCHEMA: REGISTRATION
 */
export const registerSchema = z
  .object({
    name: z
      .string({ required_error: 'Full name is required.' })
      .min(2, 'Name must be at least 2 characters.')
      .max(60, 'Name cannot exceed 60 characters.'),
    email: z
      .string({ required_error: 'Email address is required.' })
      .min(1, 'Email address is required.')
      .email('Please enter a valid email address.'),
    phone: z
      .string({ required_error: 'Phone number is required.' })
      .min(8, 'Phone number must be at least 8 digits.')
      .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Please enter a valid phone number format.'),
    password: z
      .string({ required_error: 'Password is required.' })
      .min(8, 'Password must be at least 8 characters.')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .regex(/[0-9]/, 'Password must contain at least one number.'),
    confirmPassword: z
      .string({ required_error: 'Please confirm your password.' })
      .min(1, 'Please confirm your password.'),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions.' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * 🏛️ ZOD SCHEMA: FORGOT PASSWORD
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email address is required.' })
    .min(1, 'Email address is required.')
    .email('Please enter a valid email address.'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

