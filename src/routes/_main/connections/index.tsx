import ConnectionsPage from '@/modules/Connections/pages/ConnectionsPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/connections/')({
  component: () => {
    const hash = window.location.hash.slice(1);

    return <ConnectionsPage showSuggestions={hash === 'suggestions'} />;
  },
});