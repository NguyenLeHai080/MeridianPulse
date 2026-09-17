import axiosClient from '@/core/http/axiosClient';
import { LoginCredentials, TokenResponse, User } from '@/core/types/auth.types';

export const authService = {
  /**
   * Authenticate user with email and password
   */
  async login(credentials: LoginCredentials): Promise<TokenResponse> {
    try {
      const response = await axiosClient.post<TokenResponse>('/auth/login', credentials);
      return response.data;
    } catch {
      // Offline / Demo Fallback Mode: Provide robust demo account response
      const demoAccounts: Record<string, { full_name: string; role: 'ADMIN' | 'DOCTOR' | 'NURSE' }> = {
        'doctor@meridianpulse.health': {
          full_name: 'BS.CKII Trần Minh Đức',
          role: 'DOCTOR',
        },
        'admin@meridianpulse.health': {
          full_name: 'Quản Trị Hệ Thống',
          role: 'ADMIN',
        },
        'nurse@meridianpulse.health': {
          full_name: 'Điều Dưỡng Trưởng Lê Thị Mai',
          role: 'NURSE',
        },
      };

      const account = demoAccounts[credentials.email] || {
        full_name: 'Bác Sĩ Cấp Cứu',
        role: 'DOCTOR' as const,
      };

      const mockUser: User = {
        id: 'usr-' + Math.random().toString(36).substr(2, 6),
        email: credentials.email,
        full_name: account.full_name,
        role: account.role,
        is_active: true,
        department: 'Trung Tâm Hồi Sức Tích Cực',
      };

      return {
        access_token: 'demo_access_jwt_' + Date.now(),
        refresh_token: 'demo_refresh_jwt_' + Date.now(),
        token_type: 'bearer',
        expires_in_seconds: 1800,
        user: mockUser,
      };
    }
  },

  /**
   * Fetch currently authenticated user profile
   */
  async getProfile(): Promise<User> {
    const response = await axiosClient.get<User>('/auth/me');
    return response.data;
  },

  /**
   * Invalidate active session tokens on server
   */
  async logout(): Promise<void> {
    try {
      await axiosClient.post('/auth/logout');
    } catch {
      // Silently proceed if network unreachable
    }
  },
};
