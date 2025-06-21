import { UserConnectionsPage } from '@/modules/Connections/pages/user-connections-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/connections/$userId')({
  component: () => {
    const userId = +Route.useParams().userId;
    console.log(userId);
    return <UserConnectionsPage userId={userId}></UserConnectionsPage>;
  }
})