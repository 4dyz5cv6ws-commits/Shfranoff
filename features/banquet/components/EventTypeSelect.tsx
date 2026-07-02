'use client';

import { EVENT_TYPE_LABELS, EventType } from '../types';

const OPTIONS = Object.keys(EVENT_TYPE_LABELS) as EventType[];

export function EventTypeSelect({
  value,
  onChange
}: {
  value: EventType;
  onChange: (value: EventType) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            value === option
              ? 'border-saffron bg-saffron text-bg'
              : 'border-line text-cream/80 hover:border-saffron/50 hover:text-saffron'
          }`}
        >
          {EVENT_TYPE_LABELS[option]}
        </button>
      ))}
    </div>
  );
}
