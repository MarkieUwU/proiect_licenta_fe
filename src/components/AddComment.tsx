// src/components/AddComment.tsx
import React, { useState } from "react";
import { createComment } from "../api/comment.api";
import { User } from "../type/user";
import { CommentRequest } from "../type/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateComment = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      postId,
      commentRequest,
    }: {
      postId: string;
      commentRequest: CommentRequest;
    }) => createComment(postId, commentRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
    },
  });

  return mutation;
};

interface AddCommentProps {
  postId: string;
  user: User;
}

const AddComment: React.FC<AddCommentProps> = ({ postId, user }) => {
  const [content, setContent] = useState<string>("");
  const { mutate: createComment } = useCreateComment({ postId });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentRequest: CommentRequest = {
      author: user.fullName,
      text: content,
      userId: user.id,
    };

    createComment({ commentRequest, postId });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Add a comment..."
        required
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Post Comment
      </button>
    </form>
  );
};

export default AddComment;
