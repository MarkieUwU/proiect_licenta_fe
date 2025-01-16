import { createLazyFileRoute } from '@tanstack/react-router';
import { LogInPage } from '../../core/auth/pages/LogInPage';

export const Route = createLazyFileRoute('/_auth/login')({
  component: LogInPage,
});
