import { getInitials } from '@/core/utils/utils';
import { AvatarComponent } from '@/layout/components/Avatar';
import { Connection, User } from '@/modules/Profile/models/user.models';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptConnection, removeConnection, requestConnection } from '@/modules/Profile/apis/user.api';
import { LoggedUserStateContext } from '@/modules/Profile/hooks/logged-user-state-context';
import { useContext } from 'react';
import { ConnectionStateEnum } from '@/modules/Profile/models/connection-state.enum';
import { Button } from '@/components/ui/button';
import { UserCardType } from '../models/enums/user-card-type.enum';

interface ConnectionCardProps {
  user: User;
  connection?: Connection;
  connectionState?: ConnectionStateEnum;
  type: UserCardType
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ user, connection, connectionState, type }) => {
  const { loggedUser } = useContext(LoggedUserStateContext);
  const initials = getInitials(user.username);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.ConnectionsPage.ConnectionsTab.ConnectionsList.ConnectionCard'});
  const connections = [
    ...user.following,
    ...user.follower
  ];

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
    navigate({ to: `/${user.username}/profile` });
  };

  const handleRequestConnection = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.stopPropagation();
      requestConnectionMutation.mutate({
        id: loggedUser.id,
        connectionId: user.id,
      });
    };

    let connectionButton;

    switch (connectionState) {
      case ConnectionStateEnum.ADD:
        connectionButton = (
          <Button
            loading={requestConnectionMutation.isPending}
            onClick={(e) => handleRequestConnection(e)}
          >
            <i className='ri-user-add-line' />
            {t('Add')}
          </Button>
        );
        break;
      case ConnectionStateEnum.REQUEST:
        connectionButton = (
          <Button
            variant='outline'
            className='border-2 border-black shadow'
            loading={removeConnectionMutation.isPending}
            onClick={() =>
              removeConnectionMutation.mutate({
                id: connection?.followerId,
                connectionId: connection?.followingId,
              })
            }
          >
            <i className='ri-user-unfollow-fill' />
            {t('Cancel')}
          </Button>
        );
        break;
      case ConnectionStateEnum.ACCEPT:
        connectionButton = (
          <div className='flex gap-3 flex-wrap'>
            <Button
              loading={acceptConnectionMutation.isPending}
              onClick={() =>
                acceptConnectionMutation.mutate({
                  id: connection?.followerId,
                  connectionId: connection?.followingId,
                })
              }
            >
              {t('Accept')}
            </Button>
            <Button
              variant='destructive'
              loading={removeConnectionMutation.isPending}
              onClick={() =>
                removeConnectionMutation.mutate({
                  id: connection?.followerId,
                  connectionId: connection?.followingId,
                })
              }
            >
              {t('Reject')}
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
              <div className='flex justify-center gap-4 font-bold'>{connectionButton}</div>
            )}
            {type === UserCardType.connection && (
              <div className='flex justify-center gap-2 md:gap-4'>
                <Badge>
                  {connections.length === 1
                    ? t('Connection', { count: connections.length })
                    : t('Connections', { count: connections.length })}
                </Badge>
                <Badge>
                  {user.posts.length === 1
                    ? t('Post', { count: user.posts.length })
                    : t('Posts', { count: user.posts.length })}
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
