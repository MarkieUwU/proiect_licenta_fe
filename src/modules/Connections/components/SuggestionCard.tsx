import { getInitials } from "@/core/utils/utils";
import { AvatarComponent } from "@/layout/components/Avatar";
import { removeConnection, requestConnection } from "@/modules/Profile/apis/user.api";
import { User } from "@/modules/Profile/models/user.models";
import { LoggedUserContext } from "@/shared/hooks/userContext";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import React, { useContext, useState } from "react";

interface SuggestionCardProps {
  user: User
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ user }) => {
  const loggedUser = useContext(LoggedUserContext);
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
        Cancel connection
      </Button>
    );
  } else {
    connectionButton = (  
      <Button
        loading={requestConnectionMutation.isPending}
        onClick={(e) => handleRequestConnection(e)}
      >
        <i className='ri-user-add-line' />
        Add connection
      </Button>
    );
  }

  return (
    <Card
      className='p-5 w-[400px] hover:bg-gray-50 cursor-pointer'
      onClick={navigateToProfile}
    >
      <CardContent className='p-0'>
        <div className='flex gap-5'>
          <div className='text-3xl'>
            <AvatarComponent initials={initials} size={110}></AvatarComponent>
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