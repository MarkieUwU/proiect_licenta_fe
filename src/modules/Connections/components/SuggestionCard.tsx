import { getInitials } from "@/core/utils/utils";
import { AvatarComponent } from "@/layout/components/Avatar";
import { removeConnection, requestConnection } from "@/modules/Profile/apis/user.api";
import { User } from "@/modules/Profile/models/user.models";
import { LoggedUserStateContext } from "@/modules/Profile/hooks/logged-user-state-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

interface SuggestionCardProps {
  user: User
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ user }) => {
  const { loggedUser } = useContext(LoggedUserStateContext);
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.ConnectionsPage.SuggestionsTab.SuggestionCard' });
  const [connectionRequested, setConnectionRequested] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const initials = getInitials(user.username);

  const requestConnectionMutation = useMutation({
    mutationFn: requestConnection,
    onSuccess: () => {
      setConnectionRequested(true);
      queryClient.invalidateQueries({ queryKey: ['connection'] });
    },
  });

  const removeConnectionMutation = useMutation({
    mutationFn: removeConnection,
    onSuccess: () => {
      setConnectionRequested(false);
      queryClient.invalidateQueries({ queryKey: ['connection'] });
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
    },
  });

  const navigateToProfile = () => {
    navigate({ to: `/${user.username}/profile` });
  }

  const handleRequestConnection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    requestConnectionMutation.mutate({
      id: loggedUser.id,
      connectionId: user.id,
    });
  };

  const handleCancelConnection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    removeConnectionMutation.mutate({
      id: loggedUser.id,
      connectionId: user.id,
    });
  };

  let connectionButton;

  if (connectionRequested) {
    connectionButton = (
      <Button
        variant='outline'
        className='border-2 border-black shadow'
        loading={removeConnectionMutation.isPending}
        onClick={(e) => handleCancelConnection(e)}
      >
        <i className='ri-user-unfollow-fill' />
        {t('Cancel')}
      </Button>
    );
  } else {
    connectionButton = (  
      <Button
        loading={requestConnectionMutation.isPending}
        onClick={(e) => handleRequestConnection(e)}
      >
        <i className='ri-user-add-line' />
        {t('Add')}
      </Button>
    );
  }

  return (
    <Card
      className='p-5 w-[400px]'
      hover={true}
      onClick={navigateToProfile}
    >
      <CardContent className='p-0'>
        <div className='flex gap-5'>
          <div className='text-3xl'>
            <AvatarComponent initials={initials} image={user.profileImage} className="w-[110px] h-[110px]"></AvatarComponent>
          </div>
          <div className='flex flex-col gap-4 justify-center'>
            <span className='font-bold text-3xl'>{user.fullName}</span>
            <div className='flex gap-4 font-bold'>
              {connectionButton}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}