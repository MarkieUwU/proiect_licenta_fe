// src/components/Comment.tsx
import React, { useState } from 'react';
import { UserComment } from '../models/comment.models';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment, updateComment } from '../apis/comment.api';
import { toast } from 'sonner';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { DeleteDialog } from '@/components/ui/DeleteDialog';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/core/auth/AuthContext';

interface CommentProps {
  comment: UserComment;
  onDeleteComment: () => void;
}

const schema = yup.object({
  comment: yup.string().required(),
});

export const CommentCard: React.FC<CommentProps> = ({
  comment,
  onDeleteComment,
}) => {
  const { user } = useAuth();
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.PostsFeed.PostCard.CommentCard' })
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    getFieldState,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { comment: comment.text },
  });
  const commentText = watch('comment');
  const queryClient = useQueryClient();
  const ownComment = comment.userId === user!.id;
  const textareaState = getFieldState('comment');

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success(t('DeleteSuccessMessage'));
      queryClient.invalidateQueries({ queryKey: ['comments', comment.postId] });
      onDeleteComment();
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      toast.success(t('EditSuccessMessage'));
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ['comments', comment.postId] });
      setEditMode(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const handleUpdate = handleSubmit(async () => {
    setLoading(true);
    updateCommentMutation.mutate({ id: comment.id, text: commentText });
  });

  const handleCancel = () => {
    setEditMode(false);
    reset();
  };

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate(comment.id);
  };

  return (
    <>
      <Card>
        <CardHeader className='px-4 py-3'>
          <CardTitle className='flex gap-2 items-center'>
            {comment.author}
            <span className='text-xs font-normal'>
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className='px-4 py-1'>
          {editMode ? (
            <div>
              <Textarea
                className='resize-none border-0 p-0 shadow-none focus-visible:ring-0'
                {...register('comment')}
                placeholder={t('TextareaPlaceholder')}
              ></Textarea>
              {errors.comment && (
                <p className='text-red-500'>{t('TextareaError')}</p>
              )}
            </div>
          ) : (
            <p>{commentText}</p>
          )}
        </CardContent>
        <CardFooter className='p-2'>
          {comment.isEdited && (
            <span className='ms-2 text-sm text-gray-400'>{t('Edited')}</span>
          )}
          {ownComment &&
            (editMode ? (
              <div className='ms-auto'>
                <Button
                  variant='ghost'
                  size='icon'
                  disabled={textareaState.invalid}
                  loading={loading}
                  onClick={handleUpdate}
                >
                  <i className='ri-check-line'></i>
                </Button>
                <Button variant='ghost' size='icon' onClick={handleCancel}>
                  <i className='ri-close-line'></i>
                </Button>
              </div>
            ) : (
              <div className='ms-auto'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setEditMode(true)}
                >
                  <i className='ri-pencil-line'></i>
                </Button>
                <Button
                  className='text-red-500'
                  variant='ghost'
                  size='icon'
                  onClick={() => setDeleteModalOpened(true)}
                >
                  <i className='ri-delete-bin-6-line'></i>
                </Button>
              </div>
            ))}
        </CardFooter>
      </Card>
      <DeleteDialog
        title={t('DeleteDialog.Title')}
        description={t('DeleteDialog.Text')}
        open={deleteModalOpened}
        loading={deleteCommentMutation.isPending}
        onDelete={handleDeleteComment}
        onOpenChange={(value) => setDeleteModalOpened(value)}
      ></DeleteDialog>
    </>
  );
};

export default Comment;
