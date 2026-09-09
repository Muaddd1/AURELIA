import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  name: string | null;
  email: string | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      name: null,
      email: null,
      login: (name, email) => set({ isAuthenticated: true, name, email }),
      logout: () => set({ isAuthenticated: false, name: null, email: null }),
    }),
    { name: "aurelia-auth" }
  )
);
