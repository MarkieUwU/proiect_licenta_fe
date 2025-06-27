import { createFileRoute } from '@tanstack/react-router';
import { UsersManagement } from '@/core/admin/pages/UsersManagement';

export const Route = createFileRoute('/admin/users')({
  component: UsersManagement
}); 