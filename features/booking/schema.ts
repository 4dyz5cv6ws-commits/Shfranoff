import { z } from 'zod';

export const bookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Некорректная дата'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Выберите время'),
  guests: z.number().int().min(1, 'Минимум 1 гость').max(12, 'Для банкета от 12 гостей — отдельная заявка'),
  customerName: z.string().trim().min(2, 'Укажите имя').max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{10,18}$/, 'Проверьте номер телефона'),
  comment: z.string().trim().max(300).optional()
});

export type BookingInput = z.infer<typeof bookingSchema>;
