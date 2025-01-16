import React from 'react';
import { ConnectionUser } from '../models/user.models';
import { AvatarComponent } from '@/layout/components/Avatar';
import { getInitials } from '@/core/utils/utils';
import { useNavigate } from '@tanstack/react-router';

interface UserProps {
  user: ConnectionUser;
}

export const UserCard: React.FC<UserProps> = ({ user }) => {
  const initials = getInitials(user.username);
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate({ to: `/${user.username}/profile` });
  };

  return (
    <div
      className="flex items-center mb-2 p-2 bg-white border-solid border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
      onClick={navigateToProfile}
    >
      <AvatarComponent initials={initials} />
      <div className="ml-3">
        <div className="font-bold text-lg">{user.fullName}</div>
      </div>
    </div>
  );
};
