import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Role } from '@/core/types/plenx.types';

interface RoleGuardProps {
  allowedRoles: Role[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles }) => {
  const { user } = useAuthStore();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/studio" replace />;
  }

  return <Outlet />;
};
