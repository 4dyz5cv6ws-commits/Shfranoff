'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { menuItemAdminSchema, MenuItemAdminInput } from '../../admin-schema';

interface CategoryOption {
  id: string;
  title: string;
}

const inputClass =
  'w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm text-cream placeholder:text-muted/60 focus:border-saffron focus:outline-none';

export function AddMenuItemForm({ categories }: { categories: CategoryOption[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<MenuItemAdminInput>({
    resolver: zodResolver(menuItemAdminSchema),
    defaultValues: { categoryId: categories[0]?.id ?? '', spiceLevel: 0 }
  });

  const onSubmit = async (values: MenuItemAdminInput) => {
    setSubmitError(null);
    const res = await fetch('/api/admin/menu/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setSubmitError(data.error ?? 'Не удалось добавить блюдо');
      return;
    }

    reset();
    setOpen(false);
    router.refresh();
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mb-8 flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-cream/80 transition-colors hover:border-saffron/60 hover:text-saffron"
      >
        <Plus size={15} /> Добавить блюдо
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 rounded-2xl border border-line bg-surface p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-display text-lg text-cream">Новое блюдо</h3>
        <button type="button" onClick={() => setOpen(false)} className="text-muted hover:text-ember">
          <X size={16} />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs text-muted">Категория</label>
          <select {...register('categoryId')} className={inputClass}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">Острота (0–3)</label>
          <input
            type="number"
            min={0}
            max={3}
            {...register('spiceLevel', { valueAsNumber: true })}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs text-muted">Название</label>
          <input {...register('name')} className={inputClass} />
          {errors.name && <p className="mt-1 text-xs text-ember">{errors.name.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs text-muted">Описание</label>
          <input {...register('description')} className={inputClass} />
          {errors.description && (
            <p className="mt-1 text-xs text-ember">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">Цена, ₽</label>
          <input type="number" {...register('price', { valueAsNumber: true })} className={inputClass} />
          {errors.price && <p className="mt-1 text-xs text-ember">{errors.price.message}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">Вес, г</label>
          <input
            type="number"
            {...register('weightGrams', { valueAsNumber: true })}
            className={inputClass}
          />
          {errors.weightGrams && (
            <p className="mt-1 text-xs text-ember">{errors.weightGrams.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs text-muted">Путь к фото</label>
          <input
            {...register('image')}
            placeholder="/images/dish-example.jpg"
            className={inputClass}
          />
          {errors.image && <p className="mt-1 text-xs text-ember">{errors.image.message}</p>}
        </div>
      </div>

      {submitError && <p className="mt-3 text-xs text-ember">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-saffron/90 disabled:opacity-50"
      >
        {isSubmitting ? 'Добавляем…' : 'Добавить'}
      </button>
    </form>
  );
}
