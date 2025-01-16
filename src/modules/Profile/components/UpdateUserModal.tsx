import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../apis/user.api';
import {
  LoggedUser,
  UpdateUserRequest,
  UserProfile,
} from '../models/user.models';
import { Modal } from '@/shared/components/Modal';
import { ModalConfiguration } from '@/shared/models/moda.configuration';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { DialogClose } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import { useLoggedUserState } from '../hooks/useLogedUserState';

interface UpdateUserModalProps {
  user: UserProfile;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const schema = yup.object({
  fullName: yup.string().required('Please provide a name').min(5),
  email: yup.string().required('Please provide an email').email(),
  bio: yup.string(),
});

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  user,
  open,
  onOpenChange,
}) => {
  const [loading, setLoading] = useState(false);
  const { loggedUser, setLoggedUser } = useLoggedUserState();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      bio: user.bio,
    },
  });
  const fullName = watch('fullName');
  const email = watch('email');
  const bio = watch('bio');

  const queryClient = useQueryClient();

  const updateLogedUser = () => {
    const updatedUser: LoggedUser = {
      ...(loggedUser || ({} as LoggedUser)),
      fullName,
      email,
    };

    setLoggedUser(updatedUser);
  };

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usernameDetails', { username: user.username }],
      });
      setLoading(false);
      updateLogedUser();
      reset();
      toast.success('Profile updated successfully');
      onOpenChange(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const onSubmit = handleSubmit(() => {
    setLoading(true);
    const request: UpdateUserRequest = {
      fullName,
      email,
      ...(bio ? { bio } : {}),
    };

    updateUserMutation.mutate({ id: user.id, request });
  });

  const configuration: ModalConfiguration = {
    title: 'Update Profile',
    content: (
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='fullName'>Full Name</Label>
          <Input id='fullName' {...register('fullName')} />
          {errors.fullName && (
            <p className='text-red-500 text-sm'>{errors.fullName?.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' {...register('email')} />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email?.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='bio'>Bio</Label>
          <Textarea
            id='bio'
            placeholder='Write something in your bio'
            rows={4}
            {...register('bio')}
          ></Textarea>
          {errors.bio && (
            <p className='text-red-500 text-sm'>{errors.bio?.message}</p>
          )}
        </div>
      </form>
    ),
    footerContent: (
      <>
        <DialogClose asChild>
          <Button type='button' variant='outline'>
            Cancel
          </Button>
        </DialogClose>
        <Button
          type='submit'
          disabled={!isValid}
          loading={loading}
          onClick={onSubmit}
        >
          Save
        </Button>
      </>
    ),
  };

  return (
    <Modal
      open={open}
      configuration={configuration}
      onChangeOpen={(value) => onOpenChange(value)}
    />
  );
};

export default UpdateUserModal;
