import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/core/auth/AuthContext';
import { Role } from '@/modules/Profile/models/role.enum';

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== Role.ADMIN) {
      navigate({ to: '/' });
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== Role.ADMIN) {
    return null;
  }

  return <>{children}</>;
};
