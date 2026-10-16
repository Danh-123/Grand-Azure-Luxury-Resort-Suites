/**
 * 🏛️ ZUSTAND STORE: useAuthStore
 * Scope: Client authentication session and VIP credentials.
 * Structured cleanly so swapping to real JWT / NextAuth / Supabase
 * only requires updating this store without touching UI components.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserProfileDTO } from '@/types/dto/user.dto';
import { authService, LoginPayload, RegisterPayload } from '@/services/auth.service';

export interface AuthState {
  user: UserProfileDTO | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (payload: LoginPayload) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => void;
  setUser: (user: UserProfileDTO | null) => void;
  clearError: () => void;
}

export type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(payload);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return true;
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : 'Login failed';
          set({ isLoading: false, error: errorMessage });
          return false;
        }
      },

      register: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(payload);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return true;
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : 'Registration failed';
          set({ isLoading: false, error: errorMessage });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'grand-azure-auth-session',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

