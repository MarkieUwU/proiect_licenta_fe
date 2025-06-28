import { getInitials } from '@/core/utils/utils';
import { AvatarComponent } from '@/layout/components/Avatar';
import { Connection, User } from '@/modules/Profile/models/user.models';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptConnection, removeConnection, requestConnection } from '@/modules/Profile/apis/user.api';
import { ConnectionStateEnum } from '@/modules/Profile/models/connection-state.enum';
import { Button } from '@/components/ui/button';
import { UserCardType } from '../models/enums/user-card-type.enum';
import { useAuth } from '@/core/auth/AuthContext';

interface ConnectionCardProps {
  user: User;
  connection?: Connection;
  connectionState?: ConnectionStateEnum;
  type: UserCardType
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ user, connection, connectionState, type }) => {
  const { user: loggedUser } = useAuth();
  const initials = getInitials(user.username);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const requestConnectionMutation = useMutation({
    mutationFn: requestConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suggestions'] });
    },
  });

  const removeConnectionMutation = useMutation({
    mutationFn: removeConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connection'] });
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
    },
  });

  const acceptConnectionMutation = useMutation({
    mutationFn: acceptConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suggestions'] });
    },
  });

  const navigateToProfile = () => {
    navigate({ to: '/profile/$username', params: { username: user.username } });
  };

  const handleRequestConnection = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    requestConnectionMutation.mutate({
      id: loggedUser!.id,
      connectionId: user.id,
    });
  };

  const handleRemoveConnection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    removeConnectionMutation.mutate({
      id: connection?.followerId,
      connectionId: connection?.followingId,
    });
  }

  const handleAcceptConnection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    acceptConnectionMutation.mutate({
      id: connection?.followerId,
      connectionId: connection?.followingId,
    });
  };

  const handleRejectConnection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    removeConnectionMutation.mutate({
      id: connection?.followerId,
      connectionId: connection?.followingId,
    });
  };

    let connectionButton;

    switch (connectionState) {
      case ConnectionStateEnum.ADD:
        connectionButton = (
          <Button
            loading={requestConnectionMutation.isPending}
            onClick={handleRequestConnection}
          >
            <i className='ri-user-add-line' />
            {t('Pages.ProfilePage.AddConnection')}
          </Button>
        );
        break;
      case ConnectionStateEnum.REQUEST:
        connectionButton = (
          <Button
            variant='outline'
            className='border-2 border-black shadow'
            loading={removeConnectionMutation.isPending}
            onClick={handleRemoveConnection}
          >
            <i className='ri-user-unfollow-fill' />
            {t('Pages.ProfilePage.CancelConnection')}
          </Button>
        );
        break;
      case ConnectionStateEnum.ACCEPT:
        connectionButton = (
          <div className='flex gap-3 flex-wrap'>
            <Button
              loading={acceptConnectionMutation.isPending}
              onClick={handleAcceptConnection}
            >
              {t('Actions.Accept')}
            </Button>
            <Button
              variant='destructive'
              loading={removeConnectionMutation.isPending}
              onClick={handleRejectConnection}
            >
              {t('Actions.Decline')}
            </Button>
          </div>
        );
    }

  return (
    <Card
      className='p-3 md:px-5 w-[200px] md:w-[400px]'
      hover={true}
      onClick={navigateToProfile}
    >
      <CardContent className='p-0'>
        <div className='flex flex-col justify-center md:justify-start md:flex-row gap-3 md:gap-5'>
          <div className='flex justify-center text-2xl md:text-3xl'>
            <AvatarComponent
              initials={initials}
              image={user.profileImage}
              className='w-[110px] h-[110px]'
            ></AvatarComponent>
          </div>
          <div className='flex flex-col gap-4 justify-center'>
            <span className='font-bold text-2xl text-center md:text-3xl'>
              {user.fullName}
            </span>
            {type === UserCardType.suggestion && (
              <div className='flex justify-center gap-4 font-bold'>
                {connectionButton}
              </div>
            )}
            {type === UserCardType.connection && (
              <div className='flex justify-center gap-2 md:gap-4'>
                <Badge>
                  {user.connectionCount === 1
                    ? t('Pages.ProfilePage.Connection', {
                        count: user.connectionCount,
                      })
                    : t('Pages.ProfilePage.Connections', {
                        count: user.connectionCount,
                      })}
                </Badge>
                <Badge>
                  {user.postsCount === 1
                    ? t('Pages.ProfilePage.Post', { count: user.postsCount })
                    : t('Pages.ProfilePage.Posts', { count: user.postsCount })}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;
