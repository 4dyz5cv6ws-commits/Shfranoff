import { Suspense } from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata = {
  title: 'Вход в админку',
  robots: { index: false, follow: false }
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="font-display text-2xl text-cream">Шафраноф</div>
          <p className="mt-1 text-sm text-muted">Панель управления</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
