'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '../schema';
import { Button } from '@/shared/ui/Button';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginInput) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error ?? 'Не получилось войти. Попробуйте ещё раз.');
        return;
      }

      const from = searchParams.get('from');
      router.push(from && from.startsWith('/admin') ? from : '/admin');
      router.refresh();
    } catch {
      setSubmitError('Нет связи с сервером. Проверьте интернет и попробуйте снова.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-5">
      <div>
        <label className="mb-2 block text-sm text-muted">Email</label>
        <input
          {...register('email')}
          type="email"
          autoComplete="username"
          placeholder="admin@shafranoff.ru"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream placeholder:text-muted/60 focus:border-saffron focus:outline-none"
        />
        {errors.email && <p className="mt-1.5 text-xs text-ember">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted">Пароль</label>
        <input
          {...register('password')}
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-cream placeholder:text-muted/60 focus:border-saffron focus:outline-none"
        />
        {errors.password && <p className="mt-1.5 text-xs text-ember">{errors.password.message}</p>}
      </div>

      {submitError && <p className="text-xs text-ember">{submitError}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Входим…' : 'Войти'}
      </Button>
    </form>
  );
}
