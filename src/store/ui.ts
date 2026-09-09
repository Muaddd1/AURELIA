import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/types";

interface UiState {
  cartOpen: boolean;
  mobileNavOpen: boolean;
  quickViewProduct: Product | null;
  theme: "dark" | "light";
  openCart: () => void;
  closeCart: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  toggleTheme: () => void;
}

export const useUi = create<UiState>()(
  persist(
    (set) => ({
      cartOpen: false,
      mobileNavOpen: false,
      quickViewProduct: null,
      theme: "dark",
      openCart: () => set({ cartOpen: true, mobileNavOpen: false }),
      closeCart: () => set({ cartOpen: false }),
      openMobileNav: () => set({ mobileNavOpen: true }),
      closeMobileNav: () => set({ mobileNavOpen: false }),
      openQuickView: (product) => set({ quickViewProduct: product }),
      closeQuickView: () => set({ quickViewProduct: null }),
      toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
    }),
    { name: "aurelia-ui", partialize: (state) => ({ theme: state.theme }) }
  )
);
