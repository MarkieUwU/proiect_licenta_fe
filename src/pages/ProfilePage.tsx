// src/components/ProfilePage.js
import React, { useState } from "react";
import { useGetUserData } from "../hooks/user.hooks";
import { ErrorPage } from "./ErrorPage";
import PostComponent from "../components/Post";
import UpdateUserModal from "../components/UpdateUserModal";
import { UpdateUserResponse } from "../type/user";
import { Route } from "../routes/$username.profile";
import { useUser } from "../auth/useUser";

const ProfilePage: React.FC = () => {
  const currentUser = useUser();
  const { username } = Route.useParams();
  const [openedUserModal, setOpenedUserModal] = useState(false);
  const user = useGetUserData({ username }).data;
  const owner = currentUser.username === username;

  if (!user) {
    return <ErrorPage />;
  }

  const friendRequest = () => {
    console.log(user);
  };

  const handleOnModalClose = (userResponse: UpdateUserResponse) => {
    user.fullName = userResponse.fullName;
    user.email = userResponse.email;
    user.bio = userResponse.bio;
    setOpenedUserModal(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto grid grid-cols-3 gap-4">
        {/* Left Column - Friends List */}
        {/* <div className="col-span-1 bg-white shadow p-4 rounded-lg mb-4">
          <h2 className="text-xl font-bold mb-4">Friends</h2>
          <ul>
            {user.friends.map((friend, index) => (
              <li key={index} className="mb-2">
                {friend}
              </li>
            ))}
          </ul>
        </div> */}

        {/* Middle Column - User Profile */}
        <div className="col-span-2 bg-white shadow p-4 rounded-lg mb-4">
          <div className="flex items-center mb-4">
            <img className="w-20 h-20 rounded-full mr-4" alt="Profile" />
            <div>
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-gray-600">{user.bio}</p>
              <div className="mt-2">
                {owner ? (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => setOpenedUserModal(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => friendRequest}
                  >
                    Add Friend
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-semibold">{user.posts?.length}</h2>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
              {/* <div>
                <h2 className="text-lg font-semibold">
                  {user.friendsCount}
                </h2>
                <p className="text-sm text-gray-600">Friends</p>
              </div> */}
            </div>
          </div>

          {/* List of Posts */}
          {user.posts?.map((post) => (
            <PostComponent key={post.id} user={user} post={post} />
          ))}
        </div>
      </div>

      <UpdateUserModal
        user={user}
        isOpen={openedUserModal}
        onClose={(user: UpdateUserResponse) => handleOnModalClose(user)}
      />
    </div>
  );
};

export default ProfilePage;
