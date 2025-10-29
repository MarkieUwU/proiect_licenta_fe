import React from 'react';
import { UserDetails } from '../models/user.models';
import { AvatarComponent } from '@/layout/components/Avatar';
import { getInitials } from '@/core/utils/utils';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';

interface UserProps {
  user: UserDetails;
}

export const UserCard: React.FC<UserProps> = ({ user }) => {
  
  const initials = getInitials(user.username);
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate({ to: '/profile/$username', params: { username: user.username } });
  };

  return (
    <Card
      className='p-3 ps-4 w-full max-w-[400px] sm:w-[300px] lg:w-full'
      hover={true}
      onClick={navigateToProfile}
    >
      <CardContent className='flex items-center p-0'>
        <AvatarComponent initials={initials} image={user.profileImage} />
        <div className='min-w-0 grow ml-3'>
          <div className='font-bold text-lg truncate'>{user.fullName}</div>
        </div>
      </CardContent>
    </Card>
  );
};
