import React from "react";
import { User } from "../type/user";

interface UserProps {
  user: User;
}

export const UserComponent: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="flex items-center mb-2">
      <div className="text-4xl rounded-full">
        <i className="bi bi-person-circle align-top"></i>
      </div>
      <div className="ml-3">
        <div className="font-bold">{user.username}</div>
        <button className="text-blue-500">Add Friend</button>
      </div>
    </div>
  );
};
