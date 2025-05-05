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
    )
  } else {
    connectionsContent = (
      <div className='flex flex-col items-center'>
        <NoRecordsFound
          title={t('NoRecords.Title')}
          text={t('NoRecords.Text')}
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
    <div className='flex flex-col gap-5 max-h-[500px]'>
      <span className='text-xl font-bold ps-4'>{t('Title')}</span>
      <div>
        {connectionsContent}
      </div>
      {userConnections.length > 6 && (
        <Button
          variant='outline'
          className='mx-auto text-blue-500'
          onClick={navigateToConnectionsPage}
        >
          {t('ViewMore')}
        </Button>
      )}
    </div>
  );
};

export default UserConnections;
