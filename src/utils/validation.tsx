import { z } from 'zod';

export const registerSchema = z
  .object({
    first_name: z.string().min(1, 'This field is required'),
    last_name: z.string().min(1, 'This field is required'),
    country: z.string().min(1, 'Please select a country'),
    email: z
      .string()
      .min(1, 'This field is required')
      .email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirm_password: z.string().min(1, 'This field is required'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'This field is required')
    .email('Invalid email format'),
  password: z.string().min(1, 'This field is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

export type RegisterSchemaTypes = z.infer<typeof registerSchema>;
export type LoginSchemaTypes = z.infer<typeof loginSchema>;
export type ForgotPasswordSchemaTypes = z.infer<typeof forgotPasswordSchema>;
