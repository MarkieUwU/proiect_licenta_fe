import { getInitials } from '@/core/utils/utils';
import { AvatarComponent } from '@/layout/components/Avatar';
import {
  acceptConnection,
  removeConnection,
  requestConnection,
} from '@/modules/Profile/apis/user.api';
import { Connection, User } from '@/modules/Profile/models/user.models';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ConnectionStateEnum } from '@/modules/Profile/models/connection-state.enum';
import { useAuth } from '@/core/auth/AuthContext';

interface SuggestionCardProps {
  user: User;
  connection?: Connection;
  connectionState?: ConnectionStateEnum;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  user,
  connection,
  connectionState,
}) => {
  const { user: loggedUser } = useAuth();
  const { t } = useTranslation('translation', {
    keyPrefix: 'Pages.ProfilePage',
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const initials = getInitials(user.username);

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

  const handleRequestCancel = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    removeConnectionMutation.mutate({
      id: connection?.followerId,
      connectionId: connection?.followingId,
    });
  }

  const handleRequestAccept = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    acceptConnectionMutation.mutate({ id: connection?.followerId, connectionId: connection?.followingId })
  }

  const handleRequestReject = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    removeConnectionMutation.mutate({
      id: connection?.followerId,
      connectionId: connection?.followingId,
    });
  }

  let connectionButton;

  switch (connectionState) {
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
    case ConnectionStateEnum.REQUEST:
      connectionButton = (
        <Button
          variant='outline'
          className='border-2 border-black shadow'
          loading={removeConnectionMutation.isPending}
          onClick={handleRequestCancel}
        >
          <i className='ri-user-unfollow-fill' />
          {t('CancelConnection')}
        </Button>
      );
      break;
    case ConnectionStateEnum.ACCEPT:
      connectionButton = (
        <div className='flex gap-3 flex-wrap'>
          <Button
            loading={acceptConnectionMutation.isPending}
            onClick={handleRequestAccept}
          >
            {t('AcceptConnection')}
          </Button>
          <Button
            variant='destructive'
            loading={removeConnectionMutation.isPending}
            onClick={handleRequestReject}
          >
            {t('RejectConnection')}
          </Button>
        </div>
      );
  }

  return (
    <Card className='py-5 px-2 sm:px-5 w-full sm:w-[400px]' hover={true} onClick={navigateToProfile}>
      <CardContent className='p-0'>
        <div className='flex gap-5'>
          <div className='text-2xl sm:text-3xl'>
            <AvatarComponent
              initials={initials}
              image={user.profileImage}
              className='w-[80px] h-[80px] sm:w-[110px] sm:h-[110px]'
            ></AvatarComponent>
          </div>
          <div className='flex flex-col gap-4 justify-center'>
            <span className='font-bold text-2xl sm:text-3xl'>{user.fullName}</span>
            <div className='flex gap-4 font-bold'>{connectionButton}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
