import React, { useEffect, useState } from 'react';
import { Post, PostRequest } from '../models/post.models.ts';
import { Button } from '@/components/ui/button.tsx';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogClose } from '@/components/ui/dialog.tsx';
import { Modal } from '../../../components/ui/Modal.tsx';
import { ModalConfiguration } from '@/components/models/moda.configuration.ts';
import { useMutation } from '@tanstack/react-query';
import { createPost, updatePost } from '../apis/post.api.ts';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { toBase64 } from '@/core/utils/utils.ts';
import { useAuth } from '@/core/auth/AuthContext.tsx';

interface UpsertPostModalProps {
  post?: Post;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  requestRefetch: () => void;
}

const UpsertPostModal: React.FC<UpsertPostModalProps> = ({
  post,
  open,
  onOpenChange,
  requestRefetch
}) => {
  const { user } = useAuth();
  const [image, setImage] = useState('');
  const { t } = useTranslation();

  const schema = yup.object({
    title: yup
      .string()
      .required(t('ValidationErrors.TitleRequired'))
      .min(3, t('ValidationErrors.TitleMin', { min: 3 })),
    content: yup
      .string()
      .required(t('ValidationErrors.ContentRequired'))
      .min(5, t('ValidationErrors.ContentMin', { min: 5 })),
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema)
  });
  const title = watch('title');
  const content = watch('content');

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    onDrop: (files) => {
      handleFileDrop(files);
    }
  });

  useEffect(() => {
    if (!open) return;

    if (post) {
      setImage(post.image ?? '');
      setValue('title', post.title);
      setValue('content', post.content);
    }
  }, [open])

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      requestRefetch();
      toast.success(t('Components.UpsertPostModal.CreateSuccessMessage'));
      resetModal();
      onOpenChange(false);
    },
    onError: () => {
      resetModal();
      onOpenChange(false);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success(t('Components.UpsertPostModal.UpdateSuccessMessage'));
      requestRefetch();
      resetModal();
      onOpenChange(false);
    },
    onError: () => {
      resetModal();
      onOpenChange(false);
    },
  });

  const onSubmit = handleSubmit(() => {
    const postRequest: PostRequest = {
      title,
      image: image ?? '',
      content,
    };

    if (post) {
      updatePostMutation.mutate({ id: post.id, postRequest });
    } else {
      createPostMutation.mutate({ id: user!.id, postRequest });
    }
  });

  const resetModal = (): void => {
    reset();
    setImage('');
  };

  const handleFileDrop = async (files: any) => {
    const file = files[0];
    if (file) {
      const base64 = (await toBase64(file)) as string;
      setImage(base64);
    }
  };

  const dropZone = (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {image?.length ? (
        <div className='flex justify-center max-h-[700px] w-full'>
          <img src={image} className='w-full rounded-lg' />
        </div>
      ) : (
        <div className='flex justify-center items-center w-full h-[200px] rounded-lg border cursor-pointer'>
          <span>Choose a file</span>
        </div>
      )}
    </div>
  );

  const handleModalOpenChange = (open: boolean) => {
    onOpenChange(open);

    if (!open) {
      resetModal();
      return;
    }
  }

  const configuration: ModalConfiguration = {
    title: post
      ? t('Components.UpsertPostModal.CreateTitle')
      : t('Components.UpsertPostModal.UpdateTitle'),
    content: (
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='title'>{t('Components.UpsertPostModal.Title')}</Label>
          <Input id='title' errorMessage={errors.title?.message} {...register('title')} />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='picture'>
            {t('Components.UpsertPostModal.Picture')}
          </Label>
          {dropZone}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='content'>
            {t('Components.UpsertPostModal.Content')}
          </Label>
          <Textarea
            id='content'
            placeholder={t('Components.UpsertPostModal.ContentPlaceholder')}
            rows={4}
            {...register('content')}
          ></Textarea>
          {!!errors.content && (
            <p className='text-red-500 text-sm'>
              {errors?.content.message}
            </p>
          )}
        </div>
      </form>
    ),
    footerContent: (
      <>
        <DialogClose asChild>
          <Button type='button' variant='outline'>
            {t('Actions.Cancel')}
          </Button>
        </DialogClose>
        <Button
          type='submit'
          disabled={!isValid}
          loading={createPostMutation.isPending || updatePostMutation.isPending}
          onClick={onSubmit}
        >
          {post ? t('Actions.Save') : t('Actions.Create')}
        </Button>
      </>
    ),
  };

  return (
    <Modal
      open={open}
      onChangeOpen={handleModalOpenChange}
      configuration={configuration}
    ></Modal>
  );
};
export default UpsertPostModal;

