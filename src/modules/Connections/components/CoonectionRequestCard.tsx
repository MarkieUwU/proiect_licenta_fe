import { getInitials } from '@/core/utils/utils';
import { AvatarComponent } from '@/layout/components/Avatar';
import {
  acceptConnection,
  removeConnection,
} from '@/modules/Profile/apis/user.api';
import { Connection } from '@/modules/Profile/models/user.models';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ConnectionRequestCardProps {
  connection: Connection;
}

const ConnectionRequestCard: React.FC<ConnectionRequestCardProps> = ({
  connection,
}) => {
  const user = connection.following;
  const initials = getInitials(user.username);
  const queryClient = useQueryClient();

  const acceptConnectionMutation = useMutation({
    mutationFn: acceptConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] });
    },
  });

  const declineConnectionMutation = useMutation({
    mutationFn: removeConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] });
    },
  });

  const handleAcceptConnection = () => {
    acceptConnectionMutation.mutate({
      id: connection.followingId,
      connectionId: connection.followerId,
    });
  };

  const handleDeclineConnection = () => {
    declineConnectionMutation.mutate({
      id: connection.followerId,
      connectionId: connection.followingId,
    });
  };

  return (
    <Card className='p-4'>
      <CardContent className='p-0'>
        <div className='flex gap-5 items-center'>
          <div className='flex items-center gap-6 md:text-lg lg:text-2xl'>
            <AvatarComponent initials={initials} size={80}></AvatarComponent>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='font-bold text-2xl'>{user.fullName}</span>
            <div className='flex gap-3'>
              <Button onClick={handleAcceptConnection}>
                Accept
              </Button>
              <Button
                variant='destructive'
                onClick={handleDeclineConnection}
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionRequestCard;
