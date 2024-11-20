// src/components/Sidebar.tsx
import React from "react";
import { UserCard } from "../pages/ProfilePage/components/UserCard";
import { usersList } from "@/pages/ProfilePage/hooks/user.hooks";

const Sidebar: React.FC = () => {
  const users = usersList;
  return (
    <aside className="w-2/3 h-full bg-white shadow p-4 rounded-lg">
      <h2 className="font-bold mb-4">Friend Suggestions</h2>
      <div className="mb-2">
        {users ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p className="text-gray-500">No users found</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
