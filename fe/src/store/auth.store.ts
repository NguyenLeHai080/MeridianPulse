import { create } from 'zustand';
import { User, TokenResponse, Role } from '@/core/types/plenx.types';
import { ENV_CONFIG } from '@/config/env.config';

interface AuthStoreState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginSuccess: (tokens: TokenResponse) => void;
  logout: () => void;
  initializeAuth: () => void;
  deductCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,

  initializeAuth: () => {
    try {
      const storedToken = localStorage.getItem(`${ENV_CONFIG.STORAGE_PREFIX}access_token`);
      const storedUser = localStorage.getItem(`${ENV_CONFIG.STORAGE_PREFIX}user`);

      if (storedToken && storedUser) {
        set({
          accessToken: storedToken,
          user: JSON.parse(storedUser),
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // Seed default Admin session for instant testing matching user account
        const defaultAdmin: User = {
          id: 'usr-admin-01',
          email: 'haiyuanhai9@gmail.com',
          full_name: 'Nguyễn Lê Hải (Plenx Super Admin)',
          role: 'ADMIN' as Role,
          is_active: true,
          credit_balance: 999999,
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          plan: 'Enterprise Sovereign VIP',
        };
        localStorage.setItem(`${ENV_CONFIG.STORAGE_PREFIX}access_token`, 'plenx_jwt_token');
        localStorage.setItem(`${ENV_CONFIG.STORAGE_PREFIX}user`, JSON.stringify(defaultAdmin));
        set({
          accessToken: 'plenx_jwt_token',
          user: defaultAdmin,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  loginSuccess: (tokens: TokenResponse) => {
    localStorage.setItem(`${ENV_CONFIG.STORAGE_PREFIX}access_token`, tokens.access_token);
    localStorage.setItem(`${ENV_CONFIG.STORAGE_PREFIX}refresh_token`, tokens.refresh_token);
    localStorage.setItem(`${ENV_CONFIG.STORAGE_PREFIX}user`, JSON.stringify(tokens.user));
    set({
      user: tokens.user,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    localStorage.removeItem(`${ENV_CONFIG.STORAGE_PREFIX}access_token`);
    localStorage.removeItem(`${ENV_CONFIG.STORAGE_PREFIX}refresh_token`);
    localStorage.removeItem(`${ENV_CONFIG.STORAGE_PREFIX}user`);
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  deductCredits: (amount: number) => {
    const currentUser = get().user;
    if (!currentUser) return false;
    if (currentUser.credit_balance < amount) return false;
    const updatedUser = { ...currentUser, credit_balance: currentUser.credit_balance - amount };
    localStorage.setItem(`${ENV_CONFIG.STORAGE_PREFIX}user`, JSON.stringify(updatedUser));
    set({ user: updatedUser });
    return true;
  },

  addCredits: (amount: number) => {
    const currentUser = get().user;
    if (!currentUser) return;
    const updatedUser = { ...currentUser, credit_balance: currentUser.credit_balance + amount };
    localStorage.setItem(`${ENV_CONFIG.STORAGE_PREFIX}user`, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
}));
