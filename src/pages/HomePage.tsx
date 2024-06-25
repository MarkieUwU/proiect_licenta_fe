// src/pages/HomePage.tsx
import React, { useState } from "react";
import Header from "../components/Header";
import PostComponent from "../components/Post";
import Sidebar from "../components/Sidebar";
import NoRecordsFound from "../components/NoRecordsFound";
import { useGetAllPosts } from "../hooks/post.hooks";
import { Outlet } from "@tanstack/react-router";
import UpsertPostModal from "../components/UpsertPostModal";
import { useUser } from "../auth/useUser";
import { LogInPage } from "./LogInPage";

const HomePage: React.FC = () => {
  const user = useUser();
  const postResponse = useGetAllPosts();
  const [openedPostModal, setOpenedPostModal] = useState(false);

  if (!user) return <LogInPage />;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto max-w-screen-lg flex mt-6 p-8">
        <Sidebar />
        <main className="w-full ml-6">
          <div className="mb-4">
            <input
              type="text"
              onClick={() => setOpenedPostModal(true)}
              placeholder="What's on your mind?"
              className="w-full p-4 border rounded-lg"
            />
          </div>
          {!postResponse.data?.length ? (
            <NoRecordsFound text="It seems like there are no posts to show" />
          ) : (
            postResponse.data.map((post) => (
              <PostComponent key={post.id} post={post} user={user} />
            ))
          )}
        </main>
      </div>
      <UpsertPostModal
        user={user}
        isOpen={openedPostModal}
        onClose={() => setOpenedPostModal(false)}
      />
      <Outlet />
    </div>
  );
};

export default HomePage;
