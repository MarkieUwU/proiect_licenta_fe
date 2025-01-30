import { getInitials } from '@/core/utils/utils';
import { AvatarComponent } from '@/layout/components/Avatar';
import { User } from '@/modules/Profile/models/user.models';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

interface ConnectionCardProps {
  user: User;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ user }) => {
  const initials = getInitials(user.username);
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.ConnectionsPage.ConnectionsTab.ConnectionsList.ConnectionCard'});
  const connections = [
    ...user.following,
    ...user.follower
  ];

  const navigateToProfile = () => {
    navigate({ to: `/${user.username}/profile` });
  };

  return (
    <Card
      className='p-5 w-[400px] h-fit'
      hover={true}
      onClick={navigateToProfile}
    >
      <CardContent className='p-0'>
        <div className='flex gap-5'>
          <div className='text-3xl'>
            <AvatarComponent initials={initials} image={user.profileImage} className='w-[110px] h-[110px]'></AvatarComponent>
          </div>
          <div className='flex flex-col gap-4 justify-center'>
            <span className='font-bold text-3xl'>{user.fullName}</span>
            <div className='flex gap-4'>
              <Badge className='border-2 px-2 py-1 font-bold text-sm'>
                {connections.length === 1
                  ? t('Connection', { count: connections.length })
                  : t('Connections', { count: connections.length })}
              </Badge>
              <Badge className='border-2 px-2 py-1 font-bold text-sm'>
                {user.posts.length === 1
                  ? t('Post', { count: user.posts.length })
                  : t('Posts', { count: user.posts.length })}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;
