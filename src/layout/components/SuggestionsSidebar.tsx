import React, { useContext } from 'react';
import { UserCard } from '../../modules/Profile/components/UserCard';
import { useQuery } from '@tanstack/react-query';
import { getSuggestions } from '@/modules/Profile/apis/user.api';
import { User } from '@/modules/Profile/models/user.models';
import { LoggedUserStateContext } from '@/modules/Profile/hooks/logged-user-state-context';
import { LoaderCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NoRecordsFound from '@/components/ui/NoRecordsFound';

const SuggestionsSidebar: React.FC = () => {
  const { loggedUser } = useContext(LoggedUserStateContext);
  const { t } = useTranslation('translation', { keyPrefix: 'Components.SuggestionsSidebar' });

  const suggestionsResponse = useQuery({
    queryKey: ['suggestions'],
    queryFn: () => getSuggestions({ id: loggedUser.id }),
  });

  let usersContent;

  if (!suggestionsResponse.data?.length) {
    usersContent = <NoRecordsFound title={t('NoRecords')} />;
  } else {
    usersContent = suggestionsResponse.data?.map((user: User) => (
      <UserCard key={user.id} user={user} />
    ));
  }

  return (
    <div className='w-1/3 justify-end px-3 hidden lg:flex'>
      <div className='w-[320px] min-w-[240px] max-h-[97%] overflow-y-auto flex flex-col gap-5 pt-4'>
        <span className='text-xl font-bold ps-4'>{t('Title')}</span>
        {suggestionsResponse.isPending ? (
          <div className='flex justify-center p-4'>
            <LoaderCircle className='animate-spin' />
          </div>
        ) : (
          <div className='flex flex-col gap-2'>{usersContent}</div>
        )}
      </div>
    </div>
  );
};

export default SuggestionsSidebar;
