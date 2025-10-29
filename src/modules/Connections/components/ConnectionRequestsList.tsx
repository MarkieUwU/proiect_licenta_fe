import { Separator } from "@/components/ui/separator";
import { getConnectionRequests } from "@/modules/Profile/apis/user.api";
import { ConnectionRequest } from "@/modules/Profile/models/user.models";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import ConnectionRequestCard from "./ConnectionRequestCard";
import { useTranslation } from "react-i18next";

interface ConnectionRequestsListProps {
  userId: string;
}

const ConnectionRequestsList: React.FC<ConnectionRequestsListProps> = ({ userId }) => {
  const { t } = useTranslation();
  const connectionRequestsResponse = useQuery({
    queryKey: ['connectionRequests'],
    queryFn: () => getConnectionRequests(userId)
  });

  if (!connectionRequestsResponse.data?.length) {
    return null;
  }

  if (connectionRequestsResponse.isPending) {
    return <LoaderCircle className='animate-spin' />;
  }

  const connectionRequestsContent = () => connectionRequestsResponse.data
    .map((connection: ConnectionRequest) => (
      <ConnectionRequestCard
        key={connection.userId}
        connection={connection}
      ></ConnectionRequestCard>
    ));

  return (
    <div className="flex flex-col">
      <span className='font-bold text-xl p-4'>{t('Pages.ConnectionsPage.ConnectionsTab.ConnectionRequestList.Title')}</span>
      <div className='flex flex-wrap gap-5 mb-5'>
        {connectionRequestsContent()}
      </div>
      <Separator />
    </div>
  );
}

export default ConnectionRequestsList;
