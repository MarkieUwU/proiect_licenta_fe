import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../apis/user.api';
import {
  LoggedUser,
  UpdateUserRequest,
  UserProfile,
} from '../models/user.models';
import { Modal } from '@/components/ui/Modal';
import { ModalConfiguration } from '@/components/models/moda.configuration';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { toBase64 } from '@/core/utils/utils';
import { AvatarComponent } from '@/layout/components/Avatar';
import Selector from '@/components/ui/Selector';
import { SelectorConfiguration } from '@/components/models/selector.configuration';
import { Gender } from '../models/gender.enum';
import { useAuth } from '@/core/auth/AuthContext';

interface UpdateUserModalProps {
  user: UserProfile;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  user,
  open,
  onOpenChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [gender, setGender] = useState(user.gender);
  const { t } = useTranslation();
  const { user: authUser, updateUser: authUpdateUser } = useAuth();
  const queryClient = useQueryClient();

  const schema = yup.object({
    fullName: yup
      .string()
      .required(t('ValidationErrors.FullNameRequired'))
      .min(5, t('ValidationErrors.FullNameMin', { min: 5 })),
    email: yup
      .string()
      .required(t('ValidationErrors.EmailRequired'))
      .email(t('ValidationErrors.EmailError')),
    bio: yup.string(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fullName = watch('fullName');
  const email = watch('email');
  const bio = watch('bio');

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    onDrop: (files) => {
      handleFileDrop(files);
    },
  });

  useEffect(() => {
    if (!open) return;

    setImage(user.profileImage);
    setValue('fullName', user.fullName);
    setValue('email', user.email);
    setValue('bio', user.bio ?? '');
  }, [open]);

  const genderSelectorConfig: SelectorConfiguration = {
    placeholder: t('Pages.SignUpPage.Gender'),
    items: [
      { label: t('Enums.Gender.Male'), value: Gender.male },
      { label: t('Enums.Gender.Female'), value: Gender.female },
    ],
  };

  const updateAuthUser = () => {
    const updatedUser: LoggedUser = {
      ...(authUser || ({} as LoggedUser)),
      fullName,
      email,
    };

    authUpdateUser(updatedUser);
  };

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userDetails', { username: user.username }],
      });
      queryClient.invalidateQueries({
        queryKey: ['profileImage', { id: user?.id }]
      });
      setLoading(false);
      updateAuthUser();
      reset();
      toast.success(t('Components.UpdateUserModal.SuccessMessage'));
      onOpenChange(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const onSubmit = handleSubmit(() => {
    setLoading(true);
    const request: UpdateUserRequest = {
      profileImage: image,
      fullName,
      email,
      ...(gender?.length && { gender }),
      ...(bio && { bio }),
    };

    updateUserMutation.mutate({ id: user.id, request });
  });

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
        <div className='flex justify-center w-full'>
          <AvatarComponent image={image} className='w-[300px] h-[300px]' />
        </div>
      ) : (
        <div className='flex justify-center w-full'>
          <div className='flex justify-center items-center w-[300px] h-[300px] rounded-full border cursor-pointer'>
            {t('Components.UpdateUserModal.ChoosePhoto')}
          </div>
        </div>
      )}
    </div>
  );

  const configuration: ModalConfiguration = {
    title: t('Components.UpdateUserModal.Title'),
    content: (
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='picture'>
            {t('Components.UpdateUserModal.ProfilePicture')}
          </Label>
          {dropZone}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='fullName'>
            {t('Components.UpdateUserModal.FullName')}
          </Label>
          <Input
            id='fullName'
            errorMessage={errors.fullName?.message}
            {...register('fullName')}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>{t('Components.UpdateUserModal.Email')}</Label>
          <Input
            id='email'
            errorMessage={errors.email?.message}
            {...register('email')}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='gender'>
            {t('Components.UpdateUserModal.Gender')}
          </Label>
          <Selector
            {...genderSelectorConfig}
            defaultValue={user.gender}
            onValueChange={(value) => setGender(value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='bio'>{t('Components.UpdateUserModal.Bio')}</Label>
          <Textarea
            id='bio'
            placeholder={t('Components.UpdateUserModal.BioPlaceholder')}
            rows={4}
            {...register('bio')}
          ></Textarea>
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
          loading={loading}
          onClick={onSubmit}
        >
          {t('Actions.Save')}
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
