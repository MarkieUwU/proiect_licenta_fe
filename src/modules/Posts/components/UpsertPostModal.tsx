// src/components/CreatePostModal.tsx
import React, { ReactNode, useContext, useState } from 'react';
import { Post, PostRequest } from '../models/post.models.ts';
import { Button } from '@/shared/ui/button.tsx';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogClose } from '@/shared/ui/dialog.tsx';
import { Modal } from '../../../shared/components/Modal.tsx';
import { ModalConfiguration } from '@/shared/models/moda.configuration.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, updatePost } from '../apis/post.api.ts';
import { toast } from 'sonner';
import { LoggedUserContext } from '@/shared/hooks/userContext.ts';
import { Label } from '@/shared/ui/label.tsx';
import { Input } from '@/shared/ui/input.tsx';
import { Textarea } from '@/shared/ui/textarea.tsx';

interface PostModalProps {
  post?: Post;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const schema = yup.object({
  title: yup.string().required('Please provide a title').min(5),
  content: yup.string().required('The content is required').min(5),
});

const PostModal: React.FC<PostModalProps> = ({ post, open, onOpenChange }) => {
  const user = useContext(LoggedUserContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: post?.title ?? '',
      content: post?.content ?? '',
    },
  });
  const title = watch('title');
  const content = watch('content');
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully');
      resetModal();
    },
    onError: () => {
      resetModal();
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success('Post updated successfully');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      resetModal();
    },
    onError: () => {
      resetModal();
    },
  });

  const onSubmit = handleSubmit(() => {
    const postRequest: PostRequest = {
      title,
      content,
    };

    if (post) {
      updatePostMutation.mutate({ id: post.id, postRequest });
    }
    if (user) {
      createPostMutation.mutate({ id: user.id, postRequest });
    }
  });

  const resetModal = (): void => {
    reset();
    onOpenChange(false);
  };

  const configuration: ModalConfiguration = {
    title: post ? 'Update Post' : 'Create New Post',
    content: (
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register('title')} />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="What's on your mind?"
            rows={4}
            {...register('content')}
          ></Textarea>
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content?.message}</p>
          )}
        </div>
      </form>
    ),
    footerContent: (
      <>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={!isValid}
          loading={createPostMutation.isPending || updatePostMutation.isPending}
          onClick={onSubmit}
        >
          {post ? 'Save' : 'Create'}
        </Button>
      </>
    ),
  };

  return (
    <Modal
      open={open}
      onChangeOpen={(value) => onOpenChange(value)}
      configuration={configuration}
    ></Modal>
  );
};

export default PostModal;
