import { createFileRoute } from '@tanstack/react-router';
import { RegistrationPage } from '../../core/auth/pages/SignUnPage';

export const Route = createFileRoute('/_auth/signup')({
  component: RegistrationPage,
});
