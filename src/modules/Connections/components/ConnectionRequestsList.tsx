import { Separator } from "@/components/ui/separator";
import { getConnectionRequests } from "@/modules/Profile/apis/user.api";
import { ConnectionRequest } from "@/modules/Profile/models/user.models";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import ConnectionRequestCard from "./ConnectionRequestCard";
import { useTranslation } from "react-i18next";

interface ConnectionRequestsListProps {
  userId: number;
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

  const connectionRequests = connectionRequestsResponse.data
    .map((connection: ConnectionRequest) => (
      <ConnectionRequestCard
        key={connection.userId}
        connection={connection}
      ></ConnectionRequestCard>
    ));

  return (
    <>
      <span className='font-bold text-xl p-4'>{t('Pages.ConnectionsPage.ConnectionsTab.ConnectionRequestList.Title')}</span>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-fit mb-5'>
        {connectionRequests}
      </div>
      <Separator />
    </>
  );
}

export default ConnectionRequestsList;
