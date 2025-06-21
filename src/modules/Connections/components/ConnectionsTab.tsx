import ConnectionRequestsList from './ConnectionRequestsList';
import ConnectionsList from './ConnectionsList';
import { useAuth } from '@/core/auth/AuthContext';

const ConnectionsTab: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className='flex flex-col gap-3'>
      <ConnectionRequestsList userId={user!.id} />
      <ConnectionsList userId={user!.id} />
    </div>
  );
};
export default ConnectionsTab;

