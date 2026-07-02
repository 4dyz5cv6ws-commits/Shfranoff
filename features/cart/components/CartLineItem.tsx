'use client';

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { CartLine } from '../types';
import { useCartStore } from '../store/useCartStore';

export function CartLineItem({ line }: { line: CartLine }) {
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-3 py-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
        <Image src={line.image} alt={line.name} fill sizes="64px" className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm text-cream leading-snug">{line.name}</h4>
          <button
            onClick={() => removeItem(line.id)}
            aria-label={`Убрать ${line.name} из корзины`}
            className="shrink-0 text-muted transition-colors hover:text-ember"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-full border border-line px-1 py-1">
            <button
              onClick={() => setQuantity(line.id, line.quantity - 1)}
              aria-label="Уменьшить количество"
              className="flex h-6 w-6 items-center justify-center rounded-full text-cream/80 hover:text-saffron"
            >
              <Minus size={12} />
            </button>
            <span className="w-4 text-center text-sm text-cream">{line.quantity}</span>
            <button
              onClick={() => setQuantity(line.id, line.quantity + 1)}
              aria-label="Увеличить количество"
              className="flex h-6 w-6 items-center justify-center rounded-full text-cream/80 hover:text-saffron"
            >
              <Plus size={12} />
            </button>
          </div>

          <span className="text-sm text-saffron">{line.price * line.quantity} ₽</span>
        </div>
      </div>
    </div>
  );
}
