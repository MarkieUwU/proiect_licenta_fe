import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import ConnectionsTab from '../components/ConnectionsTab';
import { SuggestionsTab } from '../components/SuggestionsTab';

const ConnectionsPage: React.FC = () => {
  return (
    <Tabs defaultValue="connections" className="w-fit mx-auto">
      <TabsList>
        <TabsTrigger value="connections">Connections</TabsTrigger>
        <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
      </TabsList>
      <TabsContent value="connections"><ConnectionsTab /></TabsContent>
      <TabsContent value="suggestions"><SuggestionsTab /></TabsContent>
    </Tabs>
  );
};

export default ConnectionsPage;
