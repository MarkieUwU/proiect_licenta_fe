// src/components/CommentList.tsx
import React from "react";
import { CommentComponent } from "./Comment";
import { UserComment } from "../type/comment";

interface CommentListProps {
  postComments: UserComment[];
  postDeleted: () => void;
}

const CommentList: React.FC<CommentListProps> = ({
  postComments,
  postDeleted,
}) => {
  const deleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      // setComments(comments.filter((comment) => comment.id !== +commentId));
      postDeleted();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!postComments?.length) {
    return (
      <>
        <p className="text-gray-500">No comments found</p>
      </>
    );
  }

  return (
    <div>
      {postComments.map((comment) => (
        <CommentComponent
          key={comment.id}
          comment={comment}
          onDelete={deleteComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
