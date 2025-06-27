import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '@/core/admin/layout/AdminLayout';
import { AdminGuard } from '@/core/admin/guards/AdminGuard';
import { ProtectedRoute } from '@/core/auth/ProtectedRoute';
import { Role } from '@/modules/Profile/models/role.enum';

export const Route = createFileRoute('/admin')({
  component: () => (
    <ProtectedRoute requiredRole={Role.ADMIN}>
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    </ProtectedRoute>
  ),
});
