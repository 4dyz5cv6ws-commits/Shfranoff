'use client';

import { MenuCategory, MenuCategorySlug } from '../types';

interface Props {
  categories: MenuCategory[];
  active: MenuCategorySlug | 'all';
  onChange: (value: MenuCategorySlug | 'all') => void;
}

export function CategoryFilters({ categories, active, onChange }: Props) {
  return (
    <div className="sticky top-0 z-30 -mx-5 border-b border-line bg-bg/90 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <Pill label="Всё меню" isActive={active === 'all'} onClick={() => onChange('all')} />
        {categories.map((category) => (
          <Pill
            key={category.slug}
            label={category.title}
            isActive={active === category.slug}
            onClick={() => onChange(category.slug)}
          />
        ))}
      </div>
    </div>
  );
}

function Pill({
  label,
  isActive,
  onClick
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
        isActive
          ? 'border-saffron bg-saffron text-bg'
          : 'border-line text-cream/80 hover:border-saffron/50 hover:text-saffron'
      }`}
    >
      {label}
    </button>
  );
}
