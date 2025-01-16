// src/components/AddComment.tsx
import React, { useContext, useState } from 'react';
import { createComment } from '../apis/comment.api';
import { CommentRequest } from '../models/comment.models';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/shared/ui/button';
import { LoggedUserContext } from '@/shared/hooks/userContext';
import { Textarea } from '@/shared/ui/textarea';
interface AddCommentProps {
  postId: number;
  onCreateComment: () => void;
}

const schema = yup.object({
  comment: yup.string().required('You have to type in something'),
});

const AddComment: React.FC<AddCommentProps> = ({ postId, onCreateComment }) => {
  const user = useContext(LoggedUserContext);
  const {
    register,
    handleSubmit,
    watch,
    getFieldState,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const comment = watch('comment');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const textareaState = getFieldState('comment');

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setLoading(false);
      toast.success('Added comment succesfully');
      reset();
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      onCreateComment();
    },
    onError: () => {
      setLoading(false);
    },
  });

  const onSubmit = handleSubmit(async () => {
    setLoading(true);

    const commentRequest: CommentRequest = {
      text: comment,
      userId: user.id,
    };

    createCommentMutation.mutate({ postId, commentRequest });
  });

  return (
    <form className="flex items-center gap-2">
      <Textarea
        className="resize-none border-0 shadow-none focus-visible:ring-0"
        {...register('comment')}
        rows={2}
        placeholder="Add a comment..."
      ></Textarea>
      {errors.comment && (
        <p className="text-red-500">{errors.comment?.message}</p>
      )}
      {textareaState.isDirty && comment.length ? (
        <Button
          variant="ghost"
          className="text-blue-500 px-2 py-1"
          loading={loading}
          onClick={onSubmit}
        >
          Post
        </Button>
      ) : null}
    </form>
  );
};

export default AddComment;
