// src/components/Header.tsx
import { Link } from "@tanstack/react-router";
import React from "react";
import { AvatarComponent } from "./Avatar";
import { getInitials } from "@/utils/utils";
import { usersList } from "@/pages/ProfilePage/hooks/user.hooks";

const Header: React.FC = () => {
  const user = usersList[0];

  return (
    <header className="fixed top-0 w-full z-10 bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-2xl font-bold">SocialMediaApp</div>
        <input
          type="text"
          placeholder="Search"
          className="ml-4 p-2 border rounded"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>

        <Link
          to="/$username/profile"
          params={{ username: user.username }}
          className="[&.active]:font-bold"
        >
          <AvatarComponent
            initials={getInitials(user.username)}
          ></AvatarComponent>
        </Link>
      </div>
    </header>
  );
};

export default Header;
