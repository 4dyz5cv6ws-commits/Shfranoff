'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore, selectItemCount } from '../store/useCartStore';

export function CartButton() {
  const [mounted, setMounted] = useState(false);
  const count = useCartStore(selectItemCount);
  const toggle = useCartStore((s) => s.toggle);

  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={toggle}
      aria-label="Открыть корзину"
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-saffron/60 hover:text-saffron"
    >
      <ShoppingBag size={18} strokeWidth={1.75} />
      {mounted && count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-saffron px-1 text-[11px] font-semibold text-bg">
          {count}
        </span>
      )}
    </button>
  );
}
