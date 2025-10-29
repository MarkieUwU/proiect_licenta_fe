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
  userId: string;
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

  const renderConnections = () => {
    if (userConnections.isPending) {
      return <LoaderCircle className='animate-spin' />;
    }

    if (!userConnections.data?.length) {
      return <NoRecordsFound title={t('NoRecords.Title')} />;
    }

    return (
      <div className='flex flex-wrap justify-center gap-2 md:gap-5 pb-1 overflow-y-auto'>
        {userConnections.data.map((connection: UserConnection) => (
          <ConnectionCard
            key={connection.userId}
            user={connection.user}
            type={UserCardType.connection}
            queryKey="connections"
          />
        ))}
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center py-2 px-4 md:px-2 w-full lg:max-w-[1320px] h-full'>
      <Input
        {...register('search')}
        placeholder={t('SearchPlaceholder')}
        className='w-[400px] min-w-[300px] mx-3 my-5 rounded-lg'
        onInput={handleSearching}
      />
      {renderConnections()}
    </div>
  );
};

export default ConnectionsList;
