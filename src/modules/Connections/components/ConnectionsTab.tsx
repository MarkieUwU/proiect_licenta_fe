import { LoggedUserStateContext } from '@/modules/Profile/hooks/logged-user-state-context';
import { useContext } from 'react';
import ConnectionRequestsList from './ConnectionRequestsList';
import ConnectionsList from './ConnectionsList';

const ConnectionsTab: React.FC = () => {
  const { loggedUser } = useContext(LoggedUserStateContext);

  return (
    <div className='flex flex-col'>
      <ConnectionRequestsList userId={loggedUser.id} />
      <ConnectionsList userId={loggedUser.id} />
    </div>
  );
};

export default ConnectionsTab;
