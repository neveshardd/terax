import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  categoria: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantidade: number) => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const existing = get().items.find(i => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map(i =>
              i.id === item.id ? { ...i, quantidade: i.quantidade + item.quantidade } : i
            )
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) });
      },

      clearCart: () => set({ items: [] }),

      updateQuantity: (id, quantidade) => {
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, quantidade } : i
          )
        });
      },

      total: () => get().items.reduce((acc, i) => acc + i.preco * i.quantidade, 0),
    }),
    {
      name: "cart-storage",
    }
  )
);
