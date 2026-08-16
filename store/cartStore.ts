import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (food: CartItem) => void;
  removeFromCart: (foodId: number) => void;
  increaseQuantity: (foodId: number) => void;
  decreaseQuantity: (foodId: number) => void;
  clearCart: () => void;
  isInCart: (foodId: number) => boolean;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (food) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === food.id);

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === food.id
                  ? {
                      ...item,
                      quantity: item.quantity + food.quantity,
                    }
                  : item,
              ),
            };
          }

          return {
            cart: [...state.cart, food],
          };
        });
      },
      removeFromCart: (foodId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== foodId),
        }));
      },
      increaseQuantity: (foodId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === foodId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }));
      },
      decreaseQuantity: (foodId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === foodId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        }));
      },
      clearCart: () => {
        set({ cart: [] });
      },

      isInCart: (foodId) => {
        return get().cart.some((item) => item.id === foodId);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
