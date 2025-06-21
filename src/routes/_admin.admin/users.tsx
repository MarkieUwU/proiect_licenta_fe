import { createFileRoute } from '@tanstack/react-router';
import { UsersManagement } from '@/core/admin/pages/UsersManagement';

export const Route = createFileRoute('/_admin/admin/users')({
  component: UsersManagement
}); 