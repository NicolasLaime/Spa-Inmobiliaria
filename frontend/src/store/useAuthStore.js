import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/api";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      initialized: false, 

      login: async (email, password) => {
        set({ loading: true });
        try {
          await api.post("/api/admin/login", { email, password }, { withCredentials: true });
          set({ user: { email }, loading: false });
          return { success: true };
        } catch (error) {
          console.log(error);
          set({ loading: false });
          return { success: false, error: "Credenciales incorrectas" };
        }
      },

      logout: async () => {
        try {
          await api.post("/api/admin/logout", {}, { withCredentials: true });
        } catch (error) {
          console.log(error);
        }
        set({ user: null });
      },

      checkAuth: async () => {
        if (get().initialized) return get().user !== null;

        const savedUser = get().user;
        if (!savedUser) {
          set({ initialized: true });
          return false;
        }

        set({ loading: true });
        try {
          const res = await api.get("/api/admin/me", { withCredentials: true });
          if (res.status === 200) {
            set({ user: res.data, loading: false, initialized: true });
            return true;
          }
        } catch (err) {
          console.log("❌ Error al verificar sesión:", err);
          set({ user: null, loading: false, initialized: true });
        }
        return false;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
