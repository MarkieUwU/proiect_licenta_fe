import { getInitials } from '@/core/utils/utils';
import { AvatarComponent } from '@/layout/components/Avatar';
import {
  acceptConnection,
  removeConnection,
} from '@/modules/Profile/apis/user.api';
import { ConnectionRequest } from '@/modules/Profile/models/user.models';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';

interface ConnectionRequestCardProps {
  connection: ConnectionRequest;
}

const ConnectionRequestCard: React.FC<ConnectionRequestCardProps> = ({
  connection,
}) => {
  const user = connection.user;
  const initials = getInitials(user.username);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const acceptConnectionMutation = useMutation({
    mutationFn: acceptConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectionRequests'] });
      queryClient.invalidateQueries({ queryKey: ['connections']});
    },
  });

  const declineConnectionMutation = useMutation({
    mutationFn: removeConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectionRequests'] });
    },
  });

  const handleAcceptConnection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    acceptConnectionMutation.mutate({
      id: connection.userId,
      connectionId: connection.connectionId,
    });
  };

  const handleDeclineConnection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    declineConnectionMutation.mutate({
      id: connection.userId,
      connectionId: connection.connectionId,
    });
  };

  const navigateToProfile = () => {
    navigate({ to: '/profile/$username', params: { username: user.username } });
  };

  return (
    <Card className='p-4' hover={true} onClick={navigateToProfile}>
      <CardContent className='p-0'>
        <div className='flex gap-5 items-center'>
          <div className='flex items-center gap-6 md:text-lg lg:text-2xl'>
            <AvatarComponent initials={initials} image={user.profileImage} className='w-[80px] h-[80px]'></AvatarComponent>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='font-bold text-2xl'>{user.fullName}</span>
            <div className='flex gap-3'>
              <Button onClick={handleAcceptConnection}>
                {t('Actions.Accept')}
              </Button>
              <Button
                variant='destructive'
                onClick={handleDeclineConnection}
              >
                {t('Actions.Decline')}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionRequestCard;
