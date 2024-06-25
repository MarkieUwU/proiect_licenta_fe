import React from "react";
import { User } from "../type/user";

interface UserProps {
  user: User;
}

export const UserComponent: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="flex items-center mb-2">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      <div className="ml-3">
        <div className="font-bold">{user.username}</div>
        <button className="text-blue-500">Add Friend</button>
      </div>
    </div>
  );
};
