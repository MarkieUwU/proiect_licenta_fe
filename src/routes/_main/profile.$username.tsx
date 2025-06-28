import { createFileRoute } from '@tanstack/react-router';
import ProfilePage from '../../modules/Profile/pages/ProfilePage/ProfilePage';
import { getUserDetails } from '@/modules/Profile/apis/user.api';
import { UserProfile } from '@/modules/Profile/models/user.models';

export const Route = createFileRoute('/_main/profile/$username')({
  loader: async ({ params: { username }, context: { queryClient }}) => {
    await queryClient.ensureQueryData<UserProfile>({
      queryKey: ['userDetails', { username }],
      queryFn: () => getUserDetails(username),
    });
  },
  component: ProfilePage,
}); 