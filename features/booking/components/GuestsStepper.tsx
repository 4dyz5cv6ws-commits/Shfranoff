'use client';

import { Minus, Plus } from 'lucide-react';

export function GuestsStepper({
  value,
  onChange
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3">
      <span className="text-sm text-cream">
        {value} {pluralGuests(value)}
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          aria-label="Меньше гостей"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-cream/80 hover:border-saffron/60 hover:text-saffron"
        >
          <Minus size={14} />
        </button>
        <button
          type="button"
          onClick={() => onChange(Math.min(12, value + 1))}
          aria-label="Больше гостей"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-cream/80 hover:border-saffron/60 hover:text-saffron"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

function pluralGuests(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'гость';
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'гостя';
  return 'гостей';
}
