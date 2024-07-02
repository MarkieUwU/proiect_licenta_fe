// src/components/Header.tsx
import { Link } from "@tanstack/react-router";
import React from "react";
import { useUser } from "../auth/useUser";

const Header: React.FC = () => {
  const user = useUser();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
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
          <div className="text-3xl rounded-full">
            <i className="bi bi-person-circle align-top"></i>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
