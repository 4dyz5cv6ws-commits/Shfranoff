'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { PartyPopper } from 'lucide-react';
import { banquetSchema, BanquetInput } from '../schema';
import { EventTypeSelect } from './EventTypeSelect';
import { BudgetSelect } from './BudgetSelect';
import { Button } from '@/shared/ui/Button';

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function BanquetForm() {
  const today = useMemo(() => toISODate(new Date()), []);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ id: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<BanquetInput>({
    resolver: zodResolver(banquetSchema),
    defaultValues: { eventType: 'birthday', date: today, guests: 15 }
  });

  const onSubmit = async (values: BanquetInput) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/banquet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error ?? 'Не получилось отправить заявку. Попробуйте ещё раз.');
        return;
      }

      setSuccess({ id: data.requestId });
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
        <PartyPopper size={40} className="text-saffron" strokeWidth={1.5} />
        <h2 className="mt-5 font-display text-2xl text-cream">Заявка отправлена</h2>
        <p className="mt-2 text-sm text-muted">
          Менеджер свяжется с вами в течение дня, чтобы обсудить детали и провести
          по банкетному залу.
        </p>
        <p className="mt-1 text-xs text-muted">Номер заявки: {success.id}</p>
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
      <div>
        <label className="mb-2 block text-sm text-muted">Тип мероприятия</label>
        <Controller
          name="eventType"
          control={control}
          render={({ field }) => <EventTypeSelect value={field.value} onChange={field.onChange} />}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-muted">Дата</label>
          <input
            type="date"
            min={today}
            {...register('date')}
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream focus:border-saffron focus:outline-none"
          />
          {errors.date && <p className="mt-1.5 text-xs text-ember">{errors.date.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted">Число гостей</label>
          <input
            type="number"
            min={10}
            max={200}
            {...register('guests', { valueAsNumber: true })}
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream focus:border-saffron focus:outline-none"
          />
          {errors.guests && <p className="mt-1.5 text-xs text-ember">{errors.guests.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted">Бюджет (необязательно)</label>
        <Controller
          name="budget"
          control={control}
          render={({ field }) => <BudgetSelect value={field.value} onChange={field.onChange} />}
        />
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

      <div className="grid gap-6 sm:grid-cols-2">
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
          <label className="mb-2 block text-sm text-muted">Email (необязательно)</label>
          <input
            {...register('email')}
            placeholder="you@mail.ru"
            inputMode="email"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream placeholder:text-muted/60 focus:border-saffron focus:outline-none"
          />
          {errors.email && <p className="mt-1.5 text-xs text-ember">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted">Пожелания (необязательно)</label>
        <textarea
          {...register('comment')}
          rows={3}
          placeholder="Например: живая музыка, отдельное меню, украшение зала"
          className="w-full resize-none rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream placeholder:text-muted/60 focus:border-saffron focus:outline-none"
        />
      </div>

      {submitError && <p className="text-xs text-ember">{submitError}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
      </Button>
    </form>
  );
}
