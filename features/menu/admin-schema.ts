import { z } from 'zod';

export const menuItemAdminSchema = z.object({
  categoryId: z.string().min(1, 'Выберите категорию'),
  name: z.string().trim().min(2, 'Укажите название').max(120),
  description: z.string().trim().min(2, 'Укажите описание').max(300),
  price: z.number({ invalid_type_error: 'Укажите цену' }).int().positive('Цена должна быть больше 0'),
  weightGrams: z.number({ invalid_type_error: 'Укажите вес' }).int().positive(),
  image: z.string().trim().min(1, 'Укажите путь к фото'),
  spiceLevel: z.number().int().min(0).max(3),
  tags: z.array(z.enum(['хит', 'новинка', 'на углях'])).optional()
});

export type MenuItemAdminInput = z.infer<typeof menuItemAdminSchema>;

// Частичное обновление — все поля необязательны
export const menuItemPatchSchema = menuItemAdminSchema.partial().extend({
  isAvailable: z.boolean().optional()
});

export type MenuItemPatchInput = z.infer<typeof menuItemPatchSchema>;
