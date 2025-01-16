import AuthenticationLayout from '@/core/auth/layout/AuthenticationLayout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  component: AuthenticationLayout,
});
