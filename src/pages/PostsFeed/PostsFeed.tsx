import React, { useState } from "react";
import { postsList, useGetAllPosts } from "./hooks/post.hooks";
import NoRecordsFound from "@/components/NoRecordsFound";
import PostCard from "./components/PostCard";
import PostModal from "./components/UpsertPostModal";
import { usersList } from "../ProfilePage/hooks/user.hooks";

export const PostsFeed: React.FC = () => {
  const user = usersList[0];
  // const postResponse = useGetAllPosts();

  const postResponse = {
    data: postsList,
  };

  return (
    <main className="col-span-4 w-full flex flex-col">
      <PostModal user={user}>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full p-4 mb-4 border rounded-lg"
        />
      </PostModal>
      <div className="flex flex-col gap-3 overflow-y-auto">
        {!postResponse.data?.length ? (
          <NoRecordsFound text="It seems like there are no posts to show" />
        ) : (
          postResponse.data.map((post) => (
            <PostCard key={post.id} post={post} user={user} />
          ))
        )}
      </div>
    </main>
  );
};
