'use client';

import { BUDGET_LABELS, BudgetRange } from '../types';

const OPTIONS = Object.keys(BUDGET_LABELS) as BudgetRange[];

export function BudgetSelect({
  value,
  onChange
}: {
  value?: BudgetRange;
  onChange: (value: BudgetRange | undefined) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(value === option ? undefined : option)}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            value === option
              ? 'border-saffron bg-saffron text-bg'
              : 'border-line text-cream/80 hover:border-saffron/50 hover:text-saffron'
          }`}
        >
          {BUDGET_LABELS[option]}
        </button>
      ))}
    </div>
  );
}
