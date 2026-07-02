import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Некорректный email'),
  password: z.string().min(6, 'Минимум 6 символов')
});

export type LoginInput = z.infer<typeof loginSchema>;
