// src/components/CreatePostModal.tsx
import React, { useState } from "react";
import { useCreatePost, useUpdatePost } from "../hooks/post.hooks";
import { Spinner } from "./Spinner";
import { Post, PostRequest } from "../type/post";
import { User } from "../type/user";

interface UpsertPostModalProps {
  isOpen: boolean;
  post?: Post;
  user: User;
  onClose: () => void;
}
0;
const UpsertPostModal: React.FC<UpsertPostModalProps> = ({
  isOpen,
  onClose,
  user,
  post,
}) => {
  const [content, setContent] = useState("");
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postRequest: PostRequest = {
      content,
    };

    if (post) {
      updatePostMutation.mutate({ id: post.id, postRequest });
    }
    if (user) {
      createPostMutation.mutate({ userId: user.id, postRequest });
    }
    setContent("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4">
          {post ? "Update " : "Create New "}Post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="What's on your mind?"
              rows={4}
              required
            ></textarea>
          </div>
          {createPostMutation.isError && (
            <div className="text-red-500 mb-4">
              Failed to create post. Please try again.
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            {!post ? (
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 flex gap-3 rounded"
                disabled={createPostMutation.isPending}
              >
                {createPostMutation.isPending ? <Spinner /> : "Post"}
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 flex gap-3 rounded"
                disabled={createPostMutation.isPending}
              >
                {createPostMutation.isPending ? <Spinner /> : "Save"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpsertPostModal;
