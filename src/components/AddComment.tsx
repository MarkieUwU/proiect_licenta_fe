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
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <textarea
        className="w-full h-10 p-2 border border-gray-300 rounded mb-2 border-none outline-none resize-none"
        value={content}
        onInput={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Add a comment..."
        required
      ></textarea>
      {content.length ? (
        <button type="submit" className="text-blue-500 px-2 py-1 border-none">
          Post
        </button>
      ) : null}
    </form>
  );
};

export default AddComment;
