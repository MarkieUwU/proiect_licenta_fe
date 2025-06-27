import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/modules/Profile/apis/user.api';
import { ResetPasswordRequest } from '@/modules/Profile/models/user.models';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

interface ResetPasswordPageProps {
  userId: number;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  userId,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    password: yup
      .string()
      .required(t('ValidationErrors.PasswordRequired'))
      .min(4, t('ValidationErrors.PasswordMin')),
    confirmPassword: yup
      .string()
      .required(t('ValidationErrors.PasswordRequired'))
      .min(4, t('ValidationErrors.PasswordMin')),
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema) });
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setLoading(false);
      navigate({ to: '/login', replace: true });
    },
    onError: () => {
      setLoading(false);
    },
  });

  const onSubmit = () => {
    setLoading(true);

    const request: ResetPasswordRequest = {
      userId,
      password,
      confirmPassword,
    };
    resetPasswordMutation.mutate(request);
  };

  return (
    <Card className='w-full max-w-[500px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <CardHeader>
        <CardTitle>{t('Pages.ResetPasswordPage.Title')}</CardTitle>
        <CardDescription>
          {t('Pages.ResetPasswordPage.Description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-3'>
            <Label htmlFor='password'>
              {t('Pages.ResetPasswordPage.Password')}
            </Label>
            <Input
              id='password'
              type='password'
              autoComplete='new-password'
              required
              errorMessage={errors.password?.message}
              {...register('password')}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <Label htmlFor='confirmPassword'>
              {t('Pages.ResetPasswordPage.ConfirmPassword')}
            </Label>
            <Input
              id='confirmPassword'
              type='password'
              autoComplete='new-password'
              required
              errorMessage={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>
          <Button
            className='w-full mt-2'
            disabled={!isValid}
            loading={loading}
          >
            {t('Actions.Save')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
