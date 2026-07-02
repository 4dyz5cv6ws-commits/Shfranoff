'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onCancel = async () => {
    if (!confirm('Отменить эту бронь?')) return;
    setLoading(true);

    const res = await fetch(`/api/admin/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'CANCELLED' })
    });

    setLoading(false);
    if (res.ok) router.refresh();
  };

  return (
    <button
      onClick={onCancel}
      disabled={loading}
      className="text-xs text-ember hover:underline disabled:opacity-50"
    >
      {loading ? 'Отменяем…' : 'Отменить'}
    </button>
  );
}
