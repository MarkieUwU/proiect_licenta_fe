import { UserFriendsPage } from '@/modules/Connections/pages/user-connections-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/friends/$userId')({
  component: () => {
    const userId = Route.useParams().userId;
    return <UserFriendsPage userId={userId}></UserFriendsPage>;
  }
}) 