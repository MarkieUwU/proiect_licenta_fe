import { AvatarComponent } from '@/layout/components/Avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React, { useState } from 'react';
import UserDetails from '../../components/UserDetails';
import { Separator } from '@/components/ui/separator';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  acceptConnection,
  getConnectionState,
  getUserDetails,
  removeConnection,
  requestConnection,
} from '../../apis/user.api';
import { getInitials } from '@/core/utils/utils';
import PostCard from '@/modules/Posts/components/PostCard';
import { Post } from '@/modules/Posts/models/post.models';
import { Route } from '@/routes/_main/$username.profile';
import { Button } from '@/components/ui/button';
import UpdateUserModal from '../../components/UpdateUserModal';
import { ConnectionStateEnum } from '../../models/connection-state.enum';
import { Skeleton } from '@/components/ui/skeleton';
import UserConnections from '../../components/UserConnections';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import NoRecordsFound from '@/components/ui/NoRecordsFound';
import { PrivacyOptions } from '@/core/models/privacy-options.enum';
import { useAuth } from '@/core/auth/AuthContext';
import BackButton from '@/components/ui/BackButton';

const ProfilePage: React.FC = () => {
  const { user: loggedUser } = useAuth();
  const { t } = useTranslation('translation', {
    keyPrefix: 'Pages.ProfilePage',
  });
  const [editModalOpened, setEditModalOpened] = useState(false);
  const queryClient = useQueryClient();
  
  const { username } = Route.useParams();
  const { data: user } = useSuspenseQuery({
    queryKey: ['userDetails', { username }],
    queryFn: () => getUserDetails(username),
  });

  const ownProfile = loggedUser!.id === user?.id;
  const isConnection = !!user?.connections.some(
    (connection) => connection.id === loggedUser!.id
  );

  const connectionStateResponse = useQuery({
    queryKey: ['connection'],
    queryFn: () =>
      getConnectionState({ userId: loggedUser!.id, connectionId: user?.id }),
    enabled: !!user?.id && loggedUser!.id !== user?.id,
  });

  const requestConnectionMutation = useMutation({
    mutationFn: requestConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connection'] });
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
      queryClient.invalidateQueries({ queryKey: ['connection'] });
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
    },
  });

  const initials = getInitials(user.username);

  const showInformation = (privacyOption: PrivacyOptions) => {
    if (ownProfile) return true;

    switch (privacyOption) {
      case PrivacyOptions.private:
        return false;
      case PrivacyOptions.public:
        return true;
      case PrivacyOptions.followers:
        return isConnection;
    }
  };

  const connectionsContent = () => {
    if (showInformation(user.settings.connectionsPrivacy)) {
      return (
        <UserConnections
          userId={user.id.toString()}
          ownConnections={ownProfile}
          userConnections={user.connections}
        />
      );
    }

    return <NoRecordsFound title={t('UserConnections.NoRecords.Title')} />;
  };

  const postsContent = () => {
    if (showInformation(user.settings.postsPrivacy) && user.posts.length) {
      return user.posts.map((post: Post) => (
        <PostCard
          key={post.id}
          post={post}
          requestRefetch={() =>
            queryClient.invalidateQueries({ queryKey: ['userDetails'] })
          }
        />
      ));
    }

    return <NoRecordsFound title={t('NoPosts')} />;
  };

  const handleRequestConnection = () => {
    requestConnectionMutation.mutate({
      id: loggedUser!.id,
      connectionId: user.id,
    });
  };

  const handleRemoveConnection = () => {
    removeConnectionMutation.mutate({
      id: connectionStateResponse.data?.connection.followerId,
      connectionId: connectionStateResponse.data?.connection.followingId,
    });
  };

  const handleCancelConnection = () => {
    removeConnectionMutation.mutate({
      id: loggedUser!.id,
      connectionId: user.id,
    });
  };

  const handleAcceptConnection = () => {
    acceptConnectionMutation.mutate({
      id: connectionStateResponse.data?.connection.followerId,
      connectionId: connectionStateResponse.data?.connection.followingId,
    });
  };

  let connectionButton;

  switch (connectionStateResponse.data?.connectionState) {
    case ConnectionStateEnum.REQUEST:
      connectionButton = (
        <Button
          variant='outline'
          className='border-2 border-black shadow'
          loading={removeConnectionMutation.isPending}
          onClick={handleCancelConnection}
        >
          <i className='ri-user-unfollow-fill' />
          {t('CancelConnection')}
        </Button>
      );
      break;
    case ConnectionStateEnum.CONNECTED:
      connectionButton = (
        <Button
          loading={removeConnectionMutation.isPending}
          onClick={handleRemoveConnection}
        >
          <i className='ri-user-unfollow-line' />
          {t('RemoveConnection')}
        </Button>
      );
      break;
    case ConnectionStateEnum.ADD:
      connectionButton = (
        <Button
          loading={requestConnectionMutation.isPending}
          onClick={handleRequestConnection}
        >
          <i className='ri-user-add-line' />
          {t('AddConnection')}
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
            <i className='ri-user-add-line' />
            {t('AcceptConnection')}
          </Button>
          <Button
            variant='destructive'
            loading={removeConnectionMutation.isPending}
            onClick={handleRemoveConnection}
          >
            <i className='ri-user-unfollow-line' />
            {t('RejectConnection')}
          </Button>
        </div>
      );
  }

  return (
    <div
      className='overflow-y-auto pt-6 pb-3'
      style={{ maxHeight: 'var(--app-height)' }}
    >
      <div className='flex flex-col gap-5 w-full lg:max-w-[1100px] px-2 mx-auto'>
        <div>
          <BackButton
            variant='outline'
            size='sm'
            className='text-muted-foreground hover:text-foreground'
          />
        </div>
        <Card className='px-3'>
          <CardHeader>
            <div className='flex flex-col sm:flex-row items-center gap-5 sm:gap-10 sm:ms-5 text-4xl sm:text-5xl lg:text-6xl'>
              <AvatarComponent
                initials={initials}
                image={user.profileImage}
                className='w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px]'
              ></AvatarComponent>
              <span className='font-bold'>{user.fullName}</span>
            </div>
          </CardHeader>
          <CardContent>
            <Separator />
            <div className='flex flex-wrap justify-between w-full gap-4 pt-3 ps-4 mb-6'>
              <div className='flex gap-6 font-bold text-lg text-nowrap'>
                {showInformation(user.settings.connectionsPrivacy) && (
                  <Badge>
                    {user.connections.length === 1
                      ? t('Connection', { count: user.connections.length })
                      : t('Connections', { count: user.connections.length })}
                  </Badge>
                )}
                {showInformation(user.settings.postsPrivacy) && (
                  <Badge>
                    {user.posts.length === 1
                      ? t('Post', { count: user.posts.length })
                      : t('Posts', { count: user.posts.length })}
                  </Badge>
                )}
              </div>
              {!ownProfile &&
                (connectionStateResponse.isPending ? (
                  <Skeleton className='h-[36px] w-[155px]' />
                ) : (
                  connectionButton
                ))}
              {ownProfile && (
                <Button
                  variant='outline'
                  className='border-2 border-black shadow'
                  onClick={() => setEditModalOpened(true)}
                >
                  <i className='ri-pencil-fill' />
                  {t('EditProfile')}
                </Button>
              )}
            </div>
            {showInformation(user.settings.detailsPrivacy) && (
              <div className='m-4'>
                <UserDetails user={user} />
              </div>
            )}
          </CardContent>
        </Card>
        <div className='flex flex-col lg:flex-row gap-5'>
          <div className='lg:w-3/12 flex flex-col gap-5 mb-5'>
            <span className='text-xl font-bold ps-4'>
              {t('UserConnections.Title')}
            </span>
            {connectionsContent()}
          </div>
          <div className='flex flex-col lg:w-9/12 gap-5'>
            <span className='font-bold text-xl ps-4'>{t('UserPosts')}</span>
            <div className='flex flex-col gap-2'>{postsContent()}</div>
          </div>
        </div>
      </div>
      <UpdateUserModal
        user={user}
        open={editModalOpened}
        onOpenChange={(value) => setEditModalOpened(value)}
      />
    </div>
  );
};

export default ProfilePage;
