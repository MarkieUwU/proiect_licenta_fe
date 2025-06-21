import React from 'react';
import { UserCard } from '../../modules/Profile/components/UserCard';
import { useQuery } from '@tanstack/react-query';
import { getSuggestions } from '@/modules/Profile/apis/user.api';
import { Suggestion } from '@/modules/Profile/models/user.models';
import { LoaderCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NoRecordsFound from '@/components/ui/NoRecordsFound';
import { useAuth } from '@/core/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

const SuggestionsSidebar: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation('translation', {
    keyPrefix: 'Components.SuggestionsSidebar',
  });
  const navigate = useNavigate();

  const { data: suggestions, isPending } = useQuery({
    queryKey: ['suggestions'],
    queryFn: () => getSuggestions({ id: user!.id }),
  });

  const suggestionsContent = () => {
    if (isPending) {
      return (
        <div className='flex justify-center p-4'>
          <LoaderCircle className='animate-spin' />
        </div>
      );
    }
    if (!suggestions?.length) {
      return <NoRecordsFound title={t('NoRecords')} />;
    }
    const suggestionsList = suggestions
      .slice(0, 6)
      .map((suggestion: Suggestion) => (
        <UserCard key={suggestion.user.id} user={suggestion.user} />
      ));
    return (
      <div className='flex flex-col gap-2'>
        {suggestionsList}
        {suggestions.length > 6 && (
          <Button
            variant='ghost'
            className='mx-auto'
            onClick={() =>
              navigate({ to: '/connections', hash: 'suggestions' })
            }
          >
            {t('ViewMore')}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className='w-1/3 justify-end px-3 hidden lg:flex'>
      <div className='w-[320px] min-w-[240px] max-h-[97%] overflow-y-auto flex flex-col gap-5 pt-4'>
        <span className='text-xl font-bold ps-4'>{t('Title')}</span>
        {suggestionsContent()}
      </div>
    </div>
  );
};
export default SuggestionsSidebar;
