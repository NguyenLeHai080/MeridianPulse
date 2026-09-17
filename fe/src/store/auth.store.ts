import { create } from 'zustand';
import { User, TokenResponse, Role } from '@/core/types/auth.types';
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
}

export const useAuthStore = create<AuthStoreState>((set) => ({
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
        // Seed initial default authenticated session in demo mode for effortless test
        const defaultDoctor: User = {
          id: 'doc-001',
          email: 'doctor@meridianpulse.health',
          full_name: 'BS.CKII Trần Minh Đức',
          role: 'DOCTOR' as Role,
          is_active: true,
          department: 'Khoa Hồi Sức Cấp Cứu (ICU)',
        };
        localStorage.setItem(`${ENV_CONFIG.STORAGE_PREFIX}access_token`, 'demo_jwt_token');
        localStorage.setItem(`${ENV_CONFIG.STORAGE_PREFIX}user`, JSON.stringify(defaultDoctor));
        set({
          accessToken: 'demo_jwt_token',
          user: defaultDoctor,
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
}));
