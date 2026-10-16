import { z } from 'zod';

/**
 * 🏛️ ZOD SCHEMA: PROFILE EDIT
 */
export const profileEditSchema = z.object({
  name: z
    .string({ required_error: 'Full name is required.' })
    .min(2, 'Name must be at least 2 characters.')
    .max(60, 'Name cannot exceed 60 characters.'),
  email: z
    .string({ required_error: 'Email address is required.' })
    .min(1, 'Email address is required.')
    .email('Please enter a valid email address.'),
  phone: z
    .string()
    .min(8, 'Phone number must be at least 8 digits.')
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Please enter a valid phone number format.')
    .optional()
    .or(z.literal('')),
  avatarUrl: z
    .string()
    .url('Avatar must be a valid URL.')
    .optional()
    .or(z.literal('')),
});

export type ProfileEditFormData = z.infer<typeof profileEditSchema>;

