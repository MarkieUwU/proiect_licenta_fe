// src/components/CommentList.tsx
import React from "react";
import { CommentComponent } from "./Comment";
import { UserComment } from "../models/comment.models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../apis/comment.api";

const useDeleteComment = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
  return mutation;
};

interface CommentListProps {
  postComments: UserComment[] | undefined;
  postId: number;
}

const CommentList: React.FC<CommentListProps> = ({ postComments, postId }) => {
  const { mutate: deleteComment } = useDeleteComment({ postId });

  if (!postComments?.length) {
    return (
      <p className="text-gray-500">No comments found</p>
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
