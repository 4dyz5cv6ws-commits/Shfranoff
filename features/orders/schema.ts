import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.string(),
  quantity: z.number().int().positive()
});

const contactFields = {
  customerName: z.string().trim().min(2, 'Укажите имя').max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{10,18}$/, 'Проверьте номер телефона'),
  deliveryType: z.enum(['delivery', 'pickup']),
  address: z.string().trim().max(200).optional(),
  comment: z.string().trim().max(300).optional()
};

function requireAddressForDelivery(data: { deliveryType: string; address?: string }) {
  return data.deliveryType === 'pickup' || Boolean(data.address && data.address.length > 4);
}

// Используется на клиенте в форме чекаута (без items — они берутся из стора корзины)
export const checkoutFormSchema = z.object(contactFields).refine(requireAddressForDelivery, {
  message: 'Укажите адрес доставки',
  path: ['address']
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Полная схема заказа — используется на сервере (API route), включает состав корзины
export const orderSchema = z
  .object({ ...contactFields, items: z.array(orderItemSchema).min(1, 'Корзина пуста') })
  .refine(requireAddressForDelivery, {
    message: 'Укажите адрес доставки',
    path: ['address']
  });

export type OrderInput = z.infer<typeof orderSchema>;

