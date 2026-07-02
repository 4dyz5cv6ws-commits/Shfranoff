'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AvailabilityToggle({
  itemId,
  isAvailable
}: {
  itemId: string;
  isAvailable: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(isAvailable);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    const next = !value;
    setLoading(true);

    const res = await fetch(`/api/admin/menu/items/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAvailable: next })
    });

    setLoading(false);
    if (res.ok) {
      setValue(next);
      router.refresh();
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`rounded-full px-2.5 py-1 text-xs transition-colors disabled:opacity-50 ${
        value ? 'bg-saffron/15 text-saffron' : 'bg-ember/15 text-ember'
      }`}
    >
      {value ? 'Да' : 'Нет'}
    </button>
  );
}
