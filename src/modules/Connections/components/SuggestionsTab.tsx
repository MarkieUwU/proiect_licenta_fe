import { getSuggestions } from '@/modules/Profile/apis/user.api';
import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { Input } from '@/components/ui/input';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import NoRecordsFound from '@/components/ui/NoRecordsFound';
import ConnectionCard from './ConnectionCard';
import { UserCardType } from '../models/enums/user-card-type.enum';
import { useAuth } from '@/core/auth/AuthContext';

const schema = yup.object({
  search: yup.string(),
});

const SuggestionsTab: React.FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Pages.ConnectionsPage.SuggestionsTab',
  });
  const { register, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const searchString = watch('search');
  const { user } = useAuth();
  let debounceTimer: Timer;

  const suggestionsResponse = useQuery({
    queryKey: ['suggestions'],
    queryFn: () => getSuggestions({ id: user!.id, searchString }),
  });

  const handleSearching = () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      suggestionsResponse.refetch();
    }, 300);
  };

  const renderSuggestions = () => {
    if (suggestionsResponse.isPending) {
      return <LoaderCircle className='animate-spin' />;
    }

    if (!suggestionsResponse.data?.length) {
      return (
        <NoRecordsFound
          title={t('NoRecords.Title')}
        />
      );
    }

    return (
      <div className='flex flex-wrap justify-center gap-2 md:gap-5 pb-1 overflow-y-auto h-full'>
        {suggestionsResponse.data.map((suggestion) => {
          return (
            <ConnectionCard
              key={suggestion.user.id}
              user={suggestion.user}
              connection={suggestion.connection}
              connectionState={suggestion.connectionState}
              type={UserCardType.suggestion}
            ></ConnectionCard>
          );
        })}
      </div>
    );
  };

  return (
    <div className='flex flex-col items-center py-2 px-4 md:px-2 w-full lg:max-w-[1270px] h-full'>
      <Input
        {...register('search')}
        placeholder={t('SearchPlaceholder')}
        className='w-[400px] min-w-[300px] mx-3 my-5 rounded-lg'
        onInput={handleSearching}
      />
      {renderSuggestions()}
    </div>
  );
};
export default SuggestionsTab;

