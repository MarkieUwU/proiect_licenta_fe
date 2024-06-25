// src/components/Sidebar.tsx
import React from "react";
import { UserComponent } from "./User";
import { useGetUsersList } from "../hooks/user.hooks";

const Sidebar: React.FC = () => {
  const users = useGetUsersList(10).data;
  console.log(users);

  if (!users) {
    return (
      <aside className="w-64 bg-white shadow p-4">
        <h2 className="font-bold mb-4">Friend Suggestions</h2>
        <div className="mb-2">
          <p className="text-gray-500">No users found</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white shadow p-4">
      <h2 className="font-bold mb-4">Friend Suggestions</h2>
      <div className="mb-2">
        {users.map((user) => (
          <UserComponent key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
