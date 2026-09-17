import { useAuthStore } from '@/store/auth.store';
import { Role } from '@/core/types/plenx.types';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, logout, loginSuccess } = useAuthStore();

  const hasRole = (allowedRoles: Role[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  const isCreator = user?.role === 'CREATOR' || user?.role === 'VIP_CREATOR' || user?.role === 'ADMIN';
  const isAdmin = user?.role === 'ADMIN';

  return {
    user,
    isAuthenticated,
    isLoading,
    hasRole,
    isCreator,
    isAdmin,
    logout,
    loginSuccess,
  };
};
