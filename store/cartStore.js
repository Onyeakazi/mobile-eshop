import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (item) => 
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);
      if (existing) {
        // if already in cart, increase quantity
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),

  updateQuantity: (id, qty) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.id === id ? { ...i, quantity: qty > 0 ? qty : 1 } : i
      ),
    })),

  getTotal: () => {
    const cart = get().cart;
    return cart.reduce((acc, i) => acc + Number(i.price) * i.quantity, 0);
  },
}));