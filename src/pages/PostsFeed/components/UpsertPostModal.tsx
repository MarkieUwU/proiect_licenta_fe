// src/components/CreatePostModal.tsx
import React, { ReactNode, useState } from 'react';
import { Post, PostRequest } from '../models/post.models';
import { User } from '@/pages/ProfilePage/models/user.models';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogClose } from '@/components/ui/dialog';
import { Modal } from '../../../components/Modal.tsx';
import { ModalConfiguration } from '@/models/moda.configuration.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, updatePost } from '../apis/post.api.ts';
import { toast } from 'sonner';

interface PostModalProps {
  post?: Post;
  user: User;
  onClose?: () => void;
  children: ReactNode;
}

const schema = yup.object({
  content: yup.string().required('The content is required').min(5),
});

const PostModal: React.FC<PostModalProps> = ({ user, post, children }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const content = watch('content');
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: ({
      userId,
      postRequest,
    }: {
      userId: number;
      postRequest: PostRequest;
    }) => createPost(userId, postRequest),
    onSuccess: () => {
      toast.success('Post created successfully');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      resetModal();
    },
    onError: () => {
      toast.error('Failed to create post! Please try again.');
      resetModal(true);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({
      id,
      postRequest,
    }: {
      id: number;
      postRequest: PostRequest;
    }) => updatePost(id, postRequest),
    onSuccess: () => {
      toast.success('Post updated successfully');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      resetModal();
    },
    onError: () => {
      toast.error('Failed to update the post! Please try again.');
      resetModal(true);
    },
  });

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    const postRequest: PostRequest = {
      content,
    };

    if (post) {
      updatePostMutation.mutate({ id: post.id, postRequest });
    }
    if (user) {
      createPostMutation.mutate({ userId: user.id, postRequest });
    }
  });

  const resetModal = (fail = false): void => {
    setLoading(false);

    if (fail) return;

    reset();
    changeOpen(false);
  };

  const changeOpen = (value: boolean) => {
    setOpen(value);
  };

  const configuration: ModalConfiguration = {
    title: post ? 'Update Post' : 'Create New Post',
    content: (
      <form>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="What's on your mind?"
          rows={4}
          {...register('content')}
        ></textarea>
        {errors.content && (
          <p className="text-red-500">{errors.content?.message}</p>
        )}
      </form>
    ),
    footerContent: (
      <>
        <DialogClose>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button
          disabled={createPostMutation.isPending || !!errors.content}
          loading={loading}
          onClick={onSubmit}
        >
          {post ? 'Create' : 'Save'}
        </Button>
      </>
    ),
  };

  return (
    <Modal
      open={open}
      onChangeOpen={(value) => setOpen(value)}
      trigger={children}
      configuration={configuration}
    ></Modal>
  );
};

export default PostModal;
