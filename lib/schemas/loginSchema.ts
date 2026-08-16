import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid Email Address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 Characters long' }),
});

export default loginSchema;
