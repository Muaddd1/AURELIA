import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/types";

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color?: string;
  size?: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  add: (product: Product, opts?: { color?: string; size?: string; quantity?: number }) => void;
  remove: (productId: string, color?: string, size?: string) => void;
  setQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
}

function lineKey(l: { productId: string; color?: string; size?: string }) {
  return `${l.productId}__${l.color ?? ""}__${l.size ?? ""}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (product, opts) => {
        const color = opts?.color;
        const size = opts?.size;
        const quantity = opts?.quantity ?? 1;
        set((state) => {
          const key = lineKey({ productId: product.id, color, size });
          const existing = state.lines.find((l) => lineKey(l) === key);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                lineKey(l) === key ? { ...l, quantity: l.quantity + quantity } : l
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.images[0],
                price: product.price,
                color,
                size,
                quantity,
              },
            ],
          };
        });
      },
      remove: (productId, color, size) => {
        const key = lineKey({ productId, color, size });
        set((state) => ({ lines: state.lines.filter((l) => lineKey(l) !== key) }));
      },
      setQuantity: (productId, quantity, color, size) => {
        const key = lineKey({ productId, color, size });
        set((state) => ({
          lines: state.lines
            .map((l) => (lineKey(l) === key ? { ...l, quantity } : l))
            .filter((l) => l.quantity > 0),
        }));
      },
      clear: () => set({ lines: [] }),
      subtotal: () => get().lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
      count: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
    }),
    { name: "aurelia-cart" }
  )
);
