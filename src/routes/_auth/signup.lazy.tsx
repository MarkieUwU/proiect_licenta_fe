import { createLazyFileRoute } from '@tanstack/react-router';
import { RegistrationPage } from '../../core/auth/pages/SignUnPage';

export const Route = createLazyFileRoute('/_auth/signup')({
  component: RegistrationPage,
});
