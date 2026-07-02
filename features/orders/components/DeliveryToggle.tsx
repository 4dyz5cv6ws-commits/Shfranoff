'use client';

export function DeliveryToggle({
  value,
  onChange
}: {
  value: 'delivery' | 'pickup';
  onChange: (value: 'delivery' | 'pickup') => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-full border border-line bg-surface p-1">
      {(
        [
          ['delivery', 'Доставка'],
          ['pickup', 'Самовывоз']
        ] as const
      ).map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`rounded-full py-2.5 text-sm transition-colors ${
            value === key ? 'bg-saffron text-bg' : 'text-cream/70 hover:text-saffron'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
