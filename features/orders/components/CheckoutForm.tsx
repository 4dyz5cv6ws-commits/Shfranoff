'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { checkoutFormSchema, CheckoutFormValues } from '../schema';
import { useCartStore, selectSubtotal } from '@/features/cart/store/useCartStore';
import { DeliveryToggle } from './DeliveryToggle';
import { Button } from '@/shared/ui/Button';

const FREE_DELIVERY_FROM = 2000;
const DELIVERY_FEE = 250;

export function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);
  const clearCart = useCartStore((s) => s.clear);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ orderId: string; total: number; minutes: number } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: { deliveryType: 'delivery' }
  });

  const deliveryType = watch('deliveryType');
  const deliveryFee = deliveryType === 'pickup' || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;

  const onSubmit = async (values: CheckoutFormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          items: items.map((line) => ({ id: line.id, quantity: line.quantity }))
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error ?? 'Не получилось оформить заказ. Попробуйте ещё раз.');
        return;
      }

      setSuccess({ orderId: data.orderId, total: data.total, minutes: data.estimatedMinutes });
      clearCart();
    } catch {
      setSubmitError('Нет связи с сервером. Проверьте интернет и попробуйте снова.');
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-2xl border border-line bg-surface px-6 py-14 text-center"
      >
        <CheckCircle2 size={40} className="text-saffron" strokeWidth={1.5} />
        <h2 className="mt-5 font-display text-2xl text-cream">Заказ №{success.orderId} принят</h2>
        <p className="mt-2 max-w-sm text-sm text-muted">
          {deliveryType === 'delivery'
            ? `Ожидайте доставку в течение ${success.minutes} минут.`
            : `Заберите заказ через ${success.minutes} минут.`}{' '}
          Мы позвоним для подтверждения.
        </p>
        <p className="mt-4 font-display text-xl text-saffron">{success.total} ₽</p>
        <Link
          href="/menu"
          className="mt-8 rounded-full border border-cream/25 px-6 py-3 text-sm text-cream hover:border-saffron/60 hover:text-saffron"
        >
          Вернуться в меню
        </Link>
      </motion.div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-line bg-surface px-6 py-14 text-center">
        <p className="text-sm text-muted">Корзина пуста — сначала выберите блюда в меню.</p>
        <Link
          href="/menu"
          className="mt-6 rounded-full bg-saffron px-6 py-3 text-sm font-medium text-bg hover:bg-saffron/90"
        >
          Перейти в меню
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm text-muted">Имя</label>
          <input
            {...register('customerName')}
            placeholder="Как к вам обращаться"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream placeholder:text-muted/60 focus:border-saffron focus:outline-none"
          />
          {errors.customerName && (
            <p className="mt-1.5 text-xs text-ember">{errors.customerName.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted">Телефон</label>
          <input
            {...register('phone')}
            placeholder="+7 914 000-00-00"
            inputMode="tel"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream placeholder:text-muted/60 focus:border-saffron focus:outline-none"
          />
          {errors.phone && <p className="mt-1.5 text-xs text-ember">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted">Способ получения</label>
          <Controller
            name="deliveryType"
            control={control}
            render={({ field }) => (
              <DeliveryToggle value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <AnimatePresence initial={false}>
          {deliveryType === 'delivery' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <label className="mb-2 block text-sm text-muted">Адрес доставки</label>
              <input
                {...register('address')}
                placeholder="Улица, дом, квартира"
                className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream placeholder:text-muted/60 focus:border-saffron focus:outline-none"
              />
              {errors.address && (
                <p className="mt-1.5 text-xs text-ember">{errors.address.message}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label className="mb-2 block text-sm text-muted">Комментарий (необязательно)</label>
          <textarea
            {...register('comment')}
            rows={3}
            placeholder="Например: без острого, позвонить за 10 минут"
            className="w-full resize-none rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream placeholder:text-muted/60 focus:border-saffron focus:outline-none"
          />
        </div>
      </div>

      <div className="h-fit rounded-2xl border border-line bg-surface p-6">
        <h3 className="font-display text-lg text-cream">Ваш заказ</h3>
        <div className="mt-4 space-y-2">
          {items.map((line) => (
            <div key={line.id} className="flex justify-between text-sm">
              <span className="text-cream/80">
                {line.name} × {line.quantity}
              </span>
              <span className="text-muted">{line.price * line.quantity} ₽</span>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-muted">
            <span>Сумма</span>
            <span>{subtotal} ₽</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Доставка</span>
            <span>{deliveryFee === 0 ? 'бесплатно' : `${deliveryFee} ₽`}</span>
          </div>
          <div className="flex justify-between pt-1 font-display text-lg text-cream">
            <span>Итого</span>
            <span className="text-saffron">{subtotal + deliveryFee} ₽</span>
          </div>
        </div>

        {submitError && <p className="mt-4 text-xs text-ember">{submitError}</p>}

        <Button type="submit" disabled={isSubmitting} className="mt-6 w-full">
          {isSubmitting ? 'Оформляем…' : 'Подтвердить заказ'}
        </Button>
      </div>
    </form>
  );
}
