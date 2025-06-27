import FriendsPage from '@/modules/Connections/pages/ConnectionsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/friends/')({
  component: () => {
    const hash = window.location.hash.slice(1);

    return <FriendsPage showSuggestions={hash === 'suggestions'} />;
  },
}); 