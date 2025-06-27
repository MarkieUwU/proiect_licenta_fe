import { createFileRoute } from '@tanstack/react-router';
import NotificationsPage from '@/core/pages/NotificationsPage';

export const Route = createFileRoute('/_main/notifications')({
  component: NotificationsPage,
}); 