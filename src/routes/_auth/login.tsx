import { createFileRoute } from '@tanstack/react-router';
import { LogInPage } from '../../core/auth/pages/LogInPage';

export const Route = createFileRoute('/_auth/login')({
  component: LogInPage,
});
