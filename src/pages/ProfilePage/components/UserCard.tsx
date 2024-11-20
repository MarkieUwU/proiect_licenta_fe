import React from "react";
import { User } from "../models/user.models";
import { AvatarComponent } from "@/components/Avatar";
import { getInitials } from "@/utils/utils";

interface UserProps {
  user: User;
}

export const UserCard: React.FC<UserProps> = ({ user }) => {
  const initials = getInitials(user.username);
  return (
    <div className="flex items-center mb-2 p-2 bg-white border-solid border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer">
      <AvatarComponent initials={initials} />
      <div className="ml-3">
        <div className="font-bold text-lg">{user.username}</div>
      </div>
    </div>
  );
};
