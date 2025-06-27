import FriendsTab from '../components/ConnectionsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import SuggestionsTab from '../components/SuggestionsTab';
import BackButton from '@/components/ui/BackButton';

interface FriendsPageProps {
  showSuggestions?: boolean;
}

const FriendsPage: React.FC<FriendsPageProps> = ({ showSuggestions }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.ConnectionsPage' });

  return (
    <div className='overflow-y-auto pt-6 pb-3' style={{ maxHeight: 'var(--app-height)' }}>
      <div className='flex flex-col gap-5 w-full lg:max-w-[1400px] px-2 mx-auto'>
        <div>
          <BackButton
            variant='outline'
            size='sm'
            className='text-muted-foreground hover:text-foreground'
          />
        </div>
        <Tabs
          defaultValue={showSuggestions ? 'suggestions' : 'friends'}
          className='w-fit mx-auto flex flex-col items-center h-full'
        >
          <TabsList>
            <TabsTrigger value='friends'>{t('Connections')}</TabsTrigger>
            <TabsTrigger value='suggestions'>{t('Suggestions')}</TabsTrigger>
          </TabsList>
          <TabsContent value='friends'>
            <FriendsTab />
          </TabsContent>
          <TabsContent value='suggestions'>
            <SuggestionsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FriendsPage;
