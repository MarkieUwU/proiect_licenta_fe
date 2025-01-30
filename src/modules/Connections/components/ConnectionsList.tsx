import { getConnections } from '@/modules/Profile/apis/user.api';
import { UserConnection } from '@/modules/Profile/models/user.models';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ConnectionCard from './ConnectionCard';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import NoRecordsFound from '@/components/ui/NoRecordsFound';

interface ConnectionsListProps {
  userId: number;
}

const schema = yup.object({
  search: yup.string(),
});

const ConnectionsList: React.FC<ConnectionsListProps> = ({ userId }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.ConnectionsPage.ConnectionsTab.ConnectionsList' });
  const { register, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const searchString = watch('search');
  let debounceTimer: Timer;

  const userConnections = useQuery({
    queryKey: ['connections'],
    queryFn: () => getConnections({ id: userId, searchString }),
  });

  const handleSearching = () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      userConnections.refetch();
    }, 300);
  };

  if (!userConnections.data) {
    return (
      <NoRecordsFound
        title={t('NoRecords.Title')}
        text={t('NoRecords.Text')}
      />
    );
  }

  const connections = userConnections.data
    .filter((connection: UserConnection) => !connection.pending)
    .map((connection: UserConnection) => (
      <ConnectionCard
        key={connection.userId}
        user={connection.user}
      ></ConnectionCard>
    ));

  return (
    <div className='flex flex-col'>
      <Input
        {...register('search')}
        placeholder={t('SearchPlaceholder')}
        className='max-w-[500px] mx-auto mt-5 mb-5 rounded-lg'
        onInput={handleSearching}
      />
      {userConnections.isPending ? (
        <LoaderCircle className='animate-spin' />
      ) : (
        <div className='w-screen lg:max-w-[1270px]'>
          {!userConnections.data.length ? (
            <NoRecordsFound title={t('NoRecords.Title')} />
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-1 overflow-y-auto'>
              {connections}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ConnectionsList;
