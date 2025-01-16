import NoRecordsFound from '@/core/components/NoRecordsFound';
import { getConnections } from '@/modules/Profile/apis/user.api';
import { UserConnection } from '@/modules/Profile/models/user.models';
import { LoggedUserContext } from '@/shared/hooks/userContext';
import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useContext, useState } from 'react';
import ConnectionCard from './ConnectionCard';
import ConnectionRequestCard from './CoonectionRequestCard';
import { Separator } from '@/shared/ui/separator';
import { Input } from '@/shared/ui/input';

const ConnectionsTab: React.FC = () => {
  const loggedUser = useContext(LoggedUserContext);
  const [searchString, setSearchString] = useState('');
  let debounceTimer: Timer;

  const userConnections = useQuery({
    queryKey: ['connections'],
    queryFn: () => getConnections({ id: loggedUser.id, searchString }),
  });

  const handleSearching = (value: string) => {
    console.log(value);
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      setSearchString(value);
    }, 200)
  }

  if (userConnections.isPending) {
    return <LoaderCircle className='animate-spin' />;
  }

  if (!userConnections.data) {
    return <NoRecordsFound title='No connections found' />;
  }

  const connections = userConnections.data  
    .filter((connection: UserConnection) => !connection.pending)
    .map((connection: UserConnection) => (
      <ConnectionCard
        key={connection.userId}
        user={connection.user}
      ></ConnectionCard>
    ));

  const connectionRequests = userConnections.data
    .filter((connection: UserConnection) => connection.pending && connection.connection.followingId === loggedUser.id)
    .map((connection: UserConnection) => (
      <ConnectionRequestCard
        key={connection.userId}
        connection={connection.connection}
      ></ConnectionRequestCard>
    ));

  return (
    <div className='flex flex-col'>
      {!!connectionRequests.length && (
        <>
          <span className='font-bold text-xl p-3'>Connection Request</span>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-fit mb-5'>
            {connectionRequests}
          </div>
          <Separator />
        </>
      )}
      {!!connections.length ? (
        <div className='flex flex-col'>
          <Input
            placeholder='Search...'
            className='w-[500px] mx-auto mt-2 mb-5 bg-white rounded-lg'
            onInput={(e) => handleSearching(e.currentTarget.value)}
          />
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-1 h-[670px] overflow-y-auto w-fit'>
            {connections}
          </div>
        </div>
      ) : (
        <NoRecordsFound title='No connections found' text='Go to sugestions to make some connections' />
      )}
    </div>
  );
};

export default ConnectionsTab;
