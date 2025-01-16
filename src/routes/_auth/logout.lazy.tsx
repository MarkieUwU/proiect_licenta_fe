import LogOutPage from '@/core/auth/pages/LogOutPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/logout')({
  component: LogOutPage,
});
