// src/components/AddComment.tsx
import React, { useState } from "react";
import { createComment } from "../api/comment.api";
import { User } from "../type/user";
import { CommentRequest } from "../type/comment";

interface AddCommentProps {
  postId: string;
  user: User;
  onCommentAdded: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({
  postId,
  user,
  onCommentAdded,
}) => {
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const commentRequest: CommentRequest = {
        author: user.fullName,
        text: content,
        userId: user.id,
      };

      await createComment(postId, commentRequest);
      setContent("");
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
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
