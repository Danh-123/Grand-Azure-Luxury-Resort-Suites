import { z } from 'zod';

/**
 * 🏛️ ZOD SCHEMA: GUEST INFORMATION (BOOKING STEP 2)
 */
export const guestInfoSchema = z.object({
  fullName: z
    .string({ required_error: 'Lead guest name is required.' })
    .min(2, 'Name must be at least 2 characters.')
    .max(70, 'Name cannot exceed 70 characters.')
    .regex(/^[a-zA-ZÀ-ỹ\s.'-]+$/, 'Name contains invalid characters.'),
  email: z
    .string({ required_error: 'Contact email is required.' })
    .min(1, 'Contact email is required.')
    .email('Please provide a valid email address for booking confirmation.'),
  phone: z
    .string({ required_error: 'Contact phone number is required.' })
    .min(8, 'Phone number must be at least 8 digits.')
    .max(20, 'Phone number cannot exceed 20 characters.')
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Please enter a valid international phone format.'),
  specialRequests: z
    .string()
    .max(500, 'Special requests cannot exceed 500 characters.')
    .optional(),
  estimatedArrival: z
    .string()
    .optional(),
});

export type GuestInfoFormData = z.infer<typeof guestInfoSchema>;

