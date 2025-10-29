import React from 'react';
import { CommentCard } from './CommentCard';
import { UserComment } from '../models/comment.models';
import { useQuery } from '@tanstack/react-query';
import { getPostComments } from '../apis/comment.api';
import { LoaderCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NoRecordsFound from '@/components/ui/NoRecordsFound';

interface CommentListProps {
  postId: string;
  onDeletedComment: () => void;
}

const CommentList: React.FC<CommentListProps> = ({
  postId,
  onDeletedComment,
}) => {
  const { t } = useTranslation();
  const { data: comments, isLoading: loading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getPostComments(postId),
  });

  if (loading) {
    return (
      <div className='flex justify-center'>
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (!comments?.length) {
    return <NoRecordsFound title={t('Pages.PostsFeed.PostCard.NoComments')} />;
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
