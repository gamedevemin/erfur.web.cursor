import { create } from 'zustand';
import { CartItem } from '../types/product';

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        const updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        return {
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + item.price
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + item.price
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;
      return {
        items: state.items.filter((i) => i.id !== id),
        totalItems: state.totalItems - item.quantity,
        totalPrice: state.totalPrice - (item.price * item.quantity)
      };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;
      const quantityDiff = quantity - item.quantity;
      const updatedItems = state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      );
      return {
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + (item.price * quantityDiff)
      };
    }),
  clearCart: () =>
    set({
      items: [],
      totalItems: 0,
      totalPrice: 0
    }),
  isInCart: (id) => {
    const state = get();
    return state.items.some((item) => item.id === id);
  },
})); 