'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUS_OPTIONS = [
  ['NEW', 'Новая'],
  ['CONTACTED', 'Связались'],
  ['CONFIRMED', 'Подтверждена'],
  ['DECLINED', 'Отклонена']
] as const;

export function BanquetStatusSelect({ requestId, status }: { requestId: string; status: string }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = async (next: string) => {
    const previous = value;
    setValue(next);
    setError(null);
    setLoading(true);

    const res = await fetch(`/api/admin/banquets/${requestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next })
    });

    setLoading(false);

    if (!res.ok) {
      setValue(previous);
      setError('Не удалось обновить');
      return;
    }

    router.refresh();
  };

  return (
    <div>
      <select
        value={value}
        disabled={loading}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-line bg-bg px-2 py-1.5 text-xs text-cream focus:border-saffron focus:outline-none disabled:opacity-50"
      >
        {STATUS_OPTIONS.map(([val, label]) => (
          <option key={val} value={val}>
            {label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-[11px] text-ember">{error}</p>}
    </div>
  );
}
