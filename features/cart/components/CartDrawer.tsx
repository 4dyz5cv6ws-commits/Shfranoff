'use client';

import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { useCartStore, selectSubtotal } from '../store/useCartStore';
import { CartLineItem } from './CartLineItem';

export function CartDrawer() {
  const router = useRouter();
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);
  const close = useCartStore((s) => s.close);

  const goToCheckout = () => {
    close();
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-bg/70 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-line bg-surface"
            role="dialog"
            aria-label="Корзина"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-lg text-cream">Корзина</h2>
              <button
                onClick={close}
                aria-label="Закрыть корзину"
                className="text-muted hover:text-saffron"
              >
                <X size={18} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={28} className="text-muted" strokeWidth={1.5} />
                <p className="text-sm text-muted">
                  Пока пусто. Выберите блюда в меню — они появятся здесь.
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 divide-y divide-line">
                  {items.map((line) => (
                    <CartLineItem key={line.id} line={line} />
                  ))}
                </div>

                <div className="border-t border-line px-6 py-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-muted">Сумма заказа</span>
                    <span className="font-display text-lg text-cream">{subtotal} ₽</span>
                  </div>
                  <button
                    onClick={goToCheckout}
                    className="w-full rounded-full bg-saffron py-3 text-sm font-medium text-bg transition-colors hover:bg-saffron/90"
                  >
                    Оформить заказ
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
