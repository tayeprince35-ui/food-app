import { z } from 'zod';

const signupSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters long'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters long'),
  email: z.email('Invalid email address'),
  country: z.string().min(1, 'Please select a country'),
  phoneNumber: z.string().min(7, 'Enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  referralCode: z.string().optional(),
});

export default signupSchema;