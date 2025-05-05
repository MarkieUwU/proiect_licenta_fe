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
import { UserCardType } from '../models/enums/user-card-type.enum';

interface ConnectionsListProps {
  userId: number;
}

const schema = yup.object({
  search: yup.string(),
});

const ConnectionsList: React.FC<ConnectionsListProps> = ({ userId }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Pages.ConnectionsPage.ConnectionsTab.ConnectionsList',
  });
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

  let connections;

  if (userConnections.isPending) {
    connections = <LoaderCircle className='animate-spin' />;
  } else if (!userConnections.data) {
    connections = (
      <NoRecordsFound title={t('NoRecords.Title')} text={t('NoRecords.Text')} />
    );
  } else if (!userConnections.data.length) {
    connections = <NoRecordsFound title={t('NoRecords.Title')} />;
  } else {
    connections = (
      <div className='flex flex-wrap justify-center gap-2 md:gap-5 pb-1 overflow-y-auto'>
        {userConnections.data
          .filter((connection: UserConnection) => !connection.pending)
          .map((connection: UserConnection) => (
            <ConnectionCard
              key={connection.userId}
              user={connection.user}
              type={UserCardType.connection}
            ></ConnectionCard>
          ))}
      </div>
    );
  }

  return (
    <div className='w-screen flex flex-col items-center py-2 px-4 md:px-2 lg:max-w-[1270px]'>
      <Input
        {...register('search')}
        placeholder={t('SearchPlaceholder')}
        className='max-w-[500px] mb-5 rounded-lg'
        onInput={handleSearching}
      />
      {connections}
    </div>
  );
};

export default ConnectionsList;
