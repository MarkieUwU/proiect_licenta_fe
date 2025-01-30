import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConnectionsTab from '../components/ConnectionsTab';
import SuggestionsTab from '../components/SuggestionsTab';
import { useTranslation } from 'react-i18next';

interface ConnectionsPageProps {
  showSuggestions: boolean;
}

const ConnectionsPage: React.FC<ConnectionsPageProps> = ({ showSuggestions }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.ConnectionsPage' });

  return (
    <Tabs defaultValue={showSuggestions ? 'suggestions' : 'connections'} className="w-fit mx-auto pt-6 flex flex-col items-center">
      <TabsList className="mb-2">
        <TabsTrigger value="connections">{t('Connections')}</TabsTrigger>
        <TabsTrigger value="suggestions">{t('Suggestions')}</TabsTrigger>
      </TabsList>
      <TabsContent value="connections"><ConnectionsTab /></TabsContent>
      <TabsContent value="suggestions"><SuggestionsTab /></TabsContent>
    </Tabs>
  );
};

export default ConnectionsPage;
