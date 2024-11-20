// src/components/Comment.tsx
import React from "react";
import { UserComment } from "../models/comment.models";

interface CommentProps {
  comment: UserComment;
  onDelete: (id: string) => void;
}

export const CommentComponent: React.FC<CommentProps> = ({
  comment,
  onDelete,
}) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg mb-2">
      <p className="text-gray-700">{comment.text}</p>
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>{comment.author}</span>
        <span>{new Date(comment.createdAt).toLocaleString()}</span>
      </div>
      <button
        className="text-red-500 mt-2"
        onClick={() => onDelete(String(comment.id))}
      >
        Delete
      </button>
    </div>
  );
};

export default Comment;
