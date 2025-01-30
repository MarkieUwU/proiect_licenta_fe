import LogOutPage from '@/core/auth/pages/LogOutPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/logout')({
  component: LogOutPage,
});
