'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { bookingSchema, BookingInput } from '../schema';
import { GuestsStepper } from './GuestsStepper';
import { TimeSlotPicker } from './TimeSlotPicker';
import { Button } from '@/shared/ui/Button';

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function BookingForm() {
  const today = useMemo(() => toISODate(new Date()), []);
  const maxDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return toISODate(d);
  }, []);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ date: string; time: string; guests: number; id: string } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { date: today, time: '', guests: 2 }
  });

  const date = watch('date');
  const guests = watch('guests');

  const onSubmit = async (values: BookingInput) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error ?? 'Не получилось забронировать стол. Попробуйте ещё раз.');
        return;
      }

      setSuccess({ date: values.date, time: values.time, guests: values.guests, id: data.bookingId });
    } catch {
      setSubmitError('Нет связи с сервером. Проверьте интернет и попробуйте снова.');
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-line bg-surface px-6 py-14 text-center"
      >
        <CalendarCheck size={40} className="text-saffron" strokeWidth={1.5} />
        <h2 className="mt-5 font-display text-2xl text-cream">Стол забронирован</h2>
        <p className="mt-2 text-sm text-muted">
          {formatDateRu(success.date)}, {success.time} · {success.guests}{' '}
          {success.guests === 1 ? 'гость' : 'гостей'}
        </p>
        <p className="mt-1 text-xs text-muted">Номер брони: {success.id}</p>
        <Link
          href="/"
          className="mt-8 rounded-full border border-cream/25 px-6 py-3 text-sm text-cream hover:border-saffron/60 hover:text-saffron"
        >
          На главную
        </Link>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-muted">Дата</label>
          <input
            type="date"
            min={today}
            max={maxDate}
            {...register('date')}
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream focus:border-saffron focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted">Гости</label>
          <Controller
            name="guests"
            control={control}
            render={({ field }) => <GuestsStepper value={field.value} onChange={field.onChange} />}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted">Время</label>
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <TimeSlotPicker date={date} guests={guests} value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.time && <p className="mt-1.5 text-xs text-ember">{errors.time.message}</p>}
      </div>

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
        <label className="mb-2 block text-sm text-muted">Комментарий (необязательно)</label>
        <textarea
          {...register('comment')}
          rows={3}
          placeholder="Например: столик у окна, детский стул"
          className="w-full resize-none rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream placeholder:text-muted/60 focus:border-saffron focus:outline-none"
        />
      </div>

      {submitError && <p className="text-xs text-ember">{submitError}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Бронируем…' : 'Забронировать стол'}
      </Button>
    </form>
  );
}

function formatDateRu(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}
