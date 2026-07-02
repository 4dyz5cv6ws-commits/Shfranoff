import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartLine } from '../types';

interface CartState {
  items: CartLine[];
  isOpen: boolean;
  addItem: (item: Omit<CartLine, 'quantity'>) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((line) => line.id === item.id);
          if (existing) {
            return {
              items: state.items.map((line) =>
                line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line
              ),
              isOpen: true
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }], isOpen: true };
        }),

      setQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((line) => line.id !== id)
              : state.items.map((line) => (line.id === id ? { ...line, quantity } : line))
        })),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((line) => line.id !== id) })),

      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen }))
    }),
    {
      name: 'shafranoff-cart',
      partialize: (state) => ({ items: state.items }) // isOpen не персистим
    }
  )
);

export const selectItemCount = (state: CartState) =>
  state.items.reduce((sum, line) => sum + line.quantity, 0);

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((sum, line) => sum + line.quantity * line.price, 0);
