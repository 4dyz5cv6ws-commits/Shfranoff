import { z } from 'zod';

export const banquetSchema = z.object({
  eventType: z.enum(['birthday', 'corporate', 'wedding', 'anniversary', 'other']),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Укажите дату мероприятия'),
  guests: z
    .number({ invalid_type_error: 'Укажите число гостей' })
    .int()
    .min(10, 'От 10 гостей — банкет, для меньшей компании оформите обычную бронь')
    .max(200, 'Для мероприятий больше 200 гостей свяжитесь с нами по телефону'),
  budget: z.enum(['up_50', '50_100', '100_200', 'from_200']).optional(),
  customerName: z.string().trim().min(2, 'Укажите имя').max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{10,18}$/, 'Проверьте номер телефона'),
  email: z.union([z.string().trim().email('Некорректный email'), z.literal('')]).optional(),
  comment: z.string().trim().max(500).optional()
});

export type BanquetInput = z.infer<typeof banquetSchema>;
