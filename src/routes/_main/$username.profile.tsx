import { createFileRoute } from '@tanstack/react-router';
import ProfilePage from '../../modules/Profile/pages/ProfilePage/ProfilePage';

export const Route = createFileRoute('/_main/$username/profile')({
  component: ProfilePage,
});
