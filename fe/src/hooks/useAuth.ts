import { useAuthStore } from '@/store/auth.store';
import { Role } from '@/core/types/auth.types';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, logout, loginSuccess } = useAuthStore();

  const hasRole = (allowedRoles: Role[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  const isDoctor = user?.role === 'DOCTOR' || user?.role === 'ADMIN';
  const isAdmin = user?.role === 'ADMIN';

  return {
    user,
    isAuthenticated,
    isLoading,
    hasRole,
    isDoctor,
    isAdmin,
    logout,
    loginSuccess,
  };
};
