import { ProtectedRoute } from '@/core/auth/ProtectedRoute';
import MainLayout from '@/layout/MainLayout/MainLayout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main')({
  component: () => (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
});
