'use client';

import { useEffect, useState } from 'react';
import { TimeSlot } from '../types';

export function TimeSlotPicker({
  date,
  guests,
  value,
  onChange
}: {
  date: string;
  guests: number;
  value: string | null;
  onChange: (time: string) => void;
}) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`/api/booking?date=${date}&guests=${guests}`)
      .then((res) => res.json())
      .then((data: { slots: TimeSlot[] }) => {
        if (cancelled) return;
        setSlots(data.slots);
        // если ранее выбранный слот больше не доступен — сбрасываем
        if (value && !data.slots.find((s) => s.time === value && s.available)) {
          onChange('');
        }
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, guests]);

  if (loading) {
    return <p className="text-sm text-muted">Проверяем свободные столы…</p>;
  }

  if (slots.length === 0) {
    return <p className="text-sm text-muted">На эту дату мест не осталось — попробуйте другой день.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {slots.map((slot) => (
        <button
          key={slot.time}
          type="button"
          disabled={!slot.available}
          onClick={() => onChange(slot.time)}
          className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
            value === slot.time
              ? 'border-saffron bg-saffron text-bg'
              : slot.available
                ? 'border-line text-cream/80 hover:border-saffron/50 hover:text-saffron'
                : 'cursor-not-allowed border-line/50 text-muted/40 line-through'
          }`}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
}
