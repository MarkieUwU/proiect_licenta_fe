// src/components/AddComment.tsx
import React, { useState } from 'react';
import { createComment, getUserPostComment } from '../apis/comment.api';
import { CommentRequest, UserComment } from '../models/comment.models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '../../ProfilePage/models/user.models';
import { toast } from 'sonner';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
interface AddCommentProps {
  postId: number;
  user: User;
  ownComment: UserComment;
}

const AddComment: React.FC<AddCommentProps> = ({ postId, user, ownComment }) => {
  const schema = yup.object({
    comment: yup.string().required('You have to type in something').default(ownComment?.text || ''),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const comment = watch('comment');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: ({
      postId,
      commentRequest,
    }: {
      postId: number;
      commentRequest: CommentRequest;
    }) => createComment(postId, commentRequest),
    onSuccess: () => {
      setLoading(false);
      toast.success('Added comment succesfully');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    const commentRequest: CommentRequest = {
      author: user.fullName,
      text: comment,
      userId: user.id,
    };

    createCommentMutation.mutate({ postId, commentRequest });
  });

  return (
    <form onSubmit={onSubmit} className="mb-4 flex gap-2">
      <textarea
        className="w-full h-10 p-2 border border-gray-300 rounded mb-2 border-none outline-none resize-none"
        {...register('comment')}
        rows={3}
        placeholder="Add a comment..."
      ></textarea>
      {comment.length ? (
        <Button
          variant="ghost"
          size="icon"
          type="submit"
          className="text-blue-500 px-2 py-1"
          loading={loading}
        >
          Post
        </Button>
      ) : null}
    </form>
  );
};

export default AddComment;
