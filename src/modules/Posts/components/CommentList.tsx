import React from 'react';
import { CommentCard } from './CommentCard';
import { UserComment } from '../models/comment.models';
import { useQuery } from '@tanstack/react-query';
import { getPostComments } from '../apis/comment.api';
import { LoaderCircle } from 'lucide-react';

interface CommentListProps {
  postId: number;
  onDeletedComment: () => void;
}

const CommentList: React.FC<CommentListProps> = ({
  postId,
  onDeletedComment,
}) => {
  const { data: comments, isLoading: loading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getPostComments(postId),
  });

  if (loading) {
    return (
      <div>
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (!comments.length) {
    return <p className="text-gray-500">No comments found</p>;
  }

  return (
    <div className="flex flex-col gap-3 mb-1 overflow-y-auto max-h-[274px]">
      {comments.map((comment: UserComment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onDeleteComment={onDeletedComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
