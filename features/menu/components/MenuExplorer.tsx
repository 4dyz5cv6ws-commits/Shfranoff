'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MenuData } from '../lib/get-menu';
import { MenuCategorySlug } from '../types';
import { CategoryFilters } from './CategoryFilters';
import { MenuCard } from './MenuCard';
import { SaffronThreadDivider } from '@/shared/ui/SaffronThread';

export function MenuExplorer({ categories, items }: MenuData) {
  const [active, setActive] = useState<MenuCategorySlug | 'all'>('all');

  const visibleCategories = useMemo(
    () => (active === 'all' ? categories : categories.filter((c) => c.slug === active)),
    [active, categories]
  );

  return (
    <div>
      <CategoryFilters categories={categories} active={active} onChange={setActive} />

      <div className="space-y-16 py-10 md:py-14">
        {visibleCategories.map((category) => {
          const categoryItems = items.filter((item) => item.categorySlug === category.slug);
          if (categoryItems.length === 0) return null;

          return (
            <section key={category.slug} id={category.slug}>
              <div className="mb-6">
                <h2 className="font-display text-2xl text-cream">{category.title}</h2>
                <p className="mt-1 text-sm text-muted">{category.description}</p>
                <SaffronThreadDivider className="mt-4 h-2 w-28" />
              </div>

              <AnimatePresence mode="popLayout">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryItems.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </AnimatePresence>
            </section>
          );
        })}
      </div>
    </div>
  );
}
