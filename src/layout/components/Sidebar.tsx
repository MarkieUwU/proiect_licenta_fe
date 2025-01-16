// src/components/Sidebar.tsx
import React, { useContext } from 'react';
import { UserCard } from '../../modules/Profile/components/UserCard';
import { useQuery } from '@tanstack/react-query';
import { getUsersList } from '@/modules/Profile/apis/user.api';
import { User } from '@/modules/Profile/models/user.models';
import { LoggedUserContext } from '@/shared/hooks/userContext';

const Sidebar: React.FC = () => {
  const user = useContext(LoggedUserContext);
  const usersResponse = useQuery({
    queryKey: ['usersList'],
    queryFn: getUsersList,
  });

  if (usersResponse.isPending) {
    return <i className="ri-loader-4-line animate-spin"></i>;
  }

  const usersList = usersResponse.data
    .filter((data: User) => data.id !== user.id)
    .map((user: User) => <UserCard key={user.id} user={user} />);

  return (
    <aside className="w-[300px] h-full bg-white shadow p-4 rounded-lg">
      <h2 className="font-bold mb-4">Friend Suggestions</h2>
      <div className="mb-2">
        {usersList.length ? (
          usersList
        ) : (
          <p className="text-gray-500">No users found</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
