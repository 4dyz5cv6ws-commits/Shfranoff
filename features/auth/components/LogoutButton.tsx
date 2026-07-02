'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();

  const onLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={onLogout}
      className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-ember"
    >
      <LogOut size={15} />
      Выйти
    </button>
  );
}
