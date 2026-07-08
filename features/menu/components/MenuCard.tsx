'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { MenuItem } from '../types';
import { SpiceIndicator } from './SpiceIndicator';
import { useCartStore } from '@/features/cart/store/useCartStore';

const TAG_STYLES: Record<NonNullable<MenuItem['tags']>[number], string> = {
  хит: 'bg-saffron text-bg',
  новинка: 'bg-cream text-bg',
  'на углях': 'bg-ember text-cream'
};

export function MenuCard({ item }: { item: MenuItem }) {
  const [imageError, setImageError] = useState(false);
  const quantity = useCartStore(
    (s) => s.items.find((line) => line.id === item.id)?.quantity ?? 0
  );
  const addItem = useCartStore((s) => s.addItem);
  const setQuantity = useCartStore((s) => s.setQuantity);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group overflow-hidden rounded-2xl border border-line bg-surface"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-surface2 to-bg">
        {!imageError && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${TAG_STYLES[tag]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base leading-snug text-cream">{item.name}</h3>
          <SpiceIndicator level={item.spiceLevel} />
        </div>

        <p className="mt-1.5 line-clamp-1 text-sm text-muted">{item.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted">
            <span className="text-cream">{item.price} ₽</span>
            <span className="mx-1.5">·</span>
            {item.weightGrams} г
          </div>

          {quantity === 0 ? (
            <button
              onClick={() =>
                addItem({ id: item.id, name: item.name, price: item.price, image: item.image })
              }
              className="rounded-full bg-saffron px-4 py-2 text-xs font-medium text-bg transition-colors hover:bg-saffron/90"
            >
              В корзину
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-full bg-surface2 px-1 py-1">
              <button
                onClick={() => setQuantity(item.id, quantity - 1)}
                aria-label="Уменьшить количество"
                className="flex h-7 w-7 items-center justify-center rounded-full text-cream/80 hover:text-saffron"
              >
                <Minus size={13} />
              </button>
              <span className="w-4 text-center text-sm text-saffron">{quantity}</span>
              <button
                onClick={() => setQuantity(item.id, quantity + 1)}
                aria-label="Увеличить количество"
                className="flex h-7 w-7 items-center justify-center rounded-full text-cream/80 hover:text-saffron"
              >
                <Plus size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
