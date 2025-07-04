import { ConnectionUser } from '../models/user.models';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { UserCard } from './UserCard';
import { Button } from '@/components/ui/button';
import NoRecordsFound from '@/components/ui/NoRecordsFound';

interface UserConnectionsProps {
  userId: string;
  userConnections: ConnectionUser[];
  ownConnections: boolean;
}

const UserConnections: React.FC<UserConnectionsProps> = ({
  userId,
  userConnections,
  ownConnections
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.ProfilePage.UserConnections' });

  const navigateToFriendsPage = () => {
    navigate({
      to: '/friends/$userId',
      params: { userId }
    });
  };

  const navigateToSuggestions = () => {
    navigate({
      to: '/friends',
      hash: 'suggestions'
    });
  };

  const friendsContent = () => {
    if (userConnections.length) {
      const friendsList = userConnections
        .slice(0, 6)
        .map((connection: ConnectionUser) => (
          <UserCard key={connection.id} user={connection} />
        ));

      return (
        <div className='flex flex-wrap lg:flex-col gap-2'>{friendsList}</div>
      );
    }

    const text = ownConnections ? t('NoRecords.Text') : null;

    return (
      <div className='text-center'>
        <NoRecordsFound title={t('NoRecords.Title')} text={text} />
        {ownConnections && (
          <Button
            variant='outline'
            className='mt-4'
            onClick={navigateToSuggestions}
          >
            {t('ConnectionSuggestions')}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-2'>
      {friendsContent()}
      {userConnections.length > 6 && (
        <Button
          variant='outline'
          className='w-full'
          onClick={navigateToFriendsPage}
        >
          {t('ViewMore')}
        </Button>
      )}
    </div>
  );
};

export default UserConnections;
