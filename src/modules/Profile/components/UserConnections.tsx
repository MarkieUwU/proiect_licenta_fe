import { Button } from '@/components/ui/button';
import { ConnectionUser } from '../models/user.models';
import { UserCard } from './UserCard';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import NoRecordsFound from '@/components/ui/NoRecordsFound';

interface UserConnectionsProps {
  userConnections: ConnectionUser[];
  ownConnections: boolean;
}

const UserConnections: React.FC<UserConnectionsProps> = ({
  userConnections,
  ownConnections
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.ProfilePage.UserConnections' });

  const navigateToConnectionsPage = () => {
    navigate({ to: '/connections' });
  };

  const navigateToSuggestions = () => {
    navigate({
      to: '/connections',
      hash: 'suggestions',
    });
  };

  let connectionsContent;

  if (userConnections.length) {
    const connectionsList = userConnections
      .slice(0, 6)
      .map((connection: ConnectionUser) => (
        <UserCard key={connection.id} user={connection} />
      ));
    connectionsContent = (
      <div className='flex flex-wrap lg:flex-col gap-2'>
        {connectionsList}
      </div>
    );
  } else {
    const text = ownConnections ? t('NoRecords.Text') : null;
    connectionsContent = (
      <div className='flex flex-col w-full items-center'>
        <NoRecordsFound
          title={t('NoRecords.Title')}
          text={text}
        />
        {ownConnections && (
          <Button
            variant='ghost'
            className='w-fit'
            onClick={navigateToSuggestions}
          >
            {t('ConnectionSuggestions')}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2'>
    {connectionsContent}
    {userConnections.length > 6 && (
      <Button
        variant='ghost'
        className='mx-auto'
        onClick={navigateToConnectionsPage}
      >
        {t('ViewMore')}
      </Button>
    )}
  </div>
  );
};

export default UserConnections;
