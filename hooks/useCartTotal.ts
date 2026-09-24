import { useCartStore } from "@/store/cartStore";

export const useCartTotal = () =>
  useCartStore((s) =>
    s.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );