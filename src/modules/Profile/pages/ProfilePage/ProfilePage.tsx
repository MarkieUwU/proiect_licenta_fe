import { AvatarComponent } from '@/layout/components/Avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import React, { useContext, useState } from 'react';
import UserDetails from '../../components/UserDetails';
import { Separator } from '@/shared/ui/separator';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getConnectionState,
  getUserDetails,
  removeConnection,
  requestConnection,
} from '../../apis/user.api';
import { getInitials } from '@/core/utils/utils';
import PostCard from '@/modules/Posts/components/PostCard';
import { Post } from '@/modules/Posts/models/post.models';
import { Route } from '@/routes/_main/$username.profile';
import { LoggedUserContext } from '@/shared/hooks/userContext';
import { Button } from '@/shared/ui/button';
import UpdateUserModal from '../../components/UpdateUserModal';
import NoRecordsFound from '@/core/components/NoRecordsFound';
import { ConnectionUser } from '../../models/user.models';
import { ErrorPage } from '@/core/pages/ErrorPage';
import { UserCard } from '../../components/UserCard';
import { ConnectionStateEnum } from '../../models/connection-state.enum';
import { Skeleton } from '@/shared/ui/skeleton';
import { useNavigate } from '@tanstack/react-router';

const ProfilePage: React.FC = () => {
  const loggedUser = useContext(LoggedUserContext);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const { username } = Route.useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userResponse = useQuery({
    queryKey: ['userDetails', { username }],
    queryFn: () => getUserDetails(username),
  });

  const user = userResponse.data;

  const connectionStateResponse = useQuery({
    queryKey: ['connection'],
    queryFn: () =>
      getConnectionState({ userId: loggedUser.id, connectionId: user?.id }),
    enabled: !!user?.id && loggedUser.id !== user?.id,
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

  if (userResponse.isPending) {
    return <i className='ri-loader-4-line animate-spin'></i>;
  }

  if (!user) {
    return (
      <ErrorPage
        title='No user found'
        text="The user you're trying to find doesn't seem to exist anymore"
      />
    );
  }

  const initials = getInitials(user.username);
  const userPosts = user.posts.map((post: Post) => (
    <PostCard key={post.id} post={post} />
  ));

  const connections = user.connections
    .slice(0, 6)
    .map((connection: ConnectionUser) => (
      <UserCard key={connection.id} user={connection} />
    ));

  const handleRequestConnection = () => {
    requestConnectionMutation.mutate({
      id: loggedUser.id,
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
      id: loggedUser.id,
      connectionId: user.id,
    });
  };

  const navigateToConnectionsPage = () => {
    navigate({ to: '/connections' });
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
          Cancel connection
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
          Remove connection
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
          Add connection
        </Button>
      );
      break;
  }

  return (
    <>
      <div className='flex flex-col gap-5 w-full md:w-7/12 md:min-w-[900px] mx-auto'>
        <Card className='px-3'>
          <CardHeader>
            <div className='flex items-center gap-10 ms-5 text-3xl md:text-5xl lg:text-6xl'>
              <AvatarComponent initials={initials} size={200}></AvatarComponent>
              <span className='font-bold'>{user.fullName}</span>
            </div>
          </CardHeader>
          <CardContent>
            <Separator />
            <div className='flex flex-wrap-reverse justify-between w-full gap-4 pt-3 ps-4 mb-6'>
              <div className='flex gap-6 font-bold text-lg text-nowrap'>
                <Button
                  variant='secondary'
                  className='border-2 border-black font-bold shadow hover:bg-slate-200'
                >{`${user.connections.length} Connections`}</Button>
                <Button
                  variant='secondary'
                  className='border-2 border-black font-bold shadow hover:bg-slate-200'
                >{`${user.posts.length} Posts`}</Button>
              </div>
              {loggedUser.username !== username &&
                (connectionStateResponse.isPending ? (
                  <Skeleton className='h-[36px] w-[155px]' />
                ) : (
                  connectionButton
                ))}
              {loggedUser.username === username && (
                <Button
                  variant='outline'
                  className='border-2 border-black shadow'
                  onClick={() => setEditModalOpened(true)}
                >
                  <i className='ri-pencil-fill' />
                  Edit profile
                </Button>
              )}
            </div>
            <div className='m-4'>
              <UserDetails user={user} />
            </div>
          </CardContent>
        </Card>
        <div className='grid grid-cols-7 gap-5'>
          <Card className='col-start-1 col-end-3 h-fit max-h-[500px]'>
            <CardHeader className='text-xl font-bold'>Connections</CardHeader>
            <CardContent>
              {connections.length ? (
                connections
              ) : (
                <NoRecordsFound
                  title='No Connections found'
                  text='No connections made yet'
                />
              )}
            </CardContent>
            {user.connections.length > 6 && (
              <CardFooter>
                <Button
                  variant='ghost'
                  className='mx-auto text-blue-500'
                  onClick={navigateToConnectionsPage}
                >
                  View more
                </Button>
              </CardFooter>
            )}
          </Card>
          <div className='col-start-3 col-end-8 flex flex-col overflow-y-auto gap-1'>
            {userPosts.length ? (
              userPosts
            ) : (
              <NoRecordsFound title='No posts found' />
            )}
          </div>
        </div>
      </div>
      <UpdateUserModal
        user={user}
        open={editModalOpened}
        onOpenChange={(value) => setEditModalOpened(value)}
      />
    </>
  );
};

export default ProfilePage;
