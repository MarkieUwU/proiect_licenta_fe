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
import { requestPasswordReset } from '@/modules/Profile/apis/user.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    email: yup
      .string()
      .required(t('ValidationErrors.EmailRequired'))
      .email(t('ValidationErrors.EmailError')),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema) });
  const email = watch('email');

  const passwordResetRequestMutator = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      setLoading(false);
      navigate({ to: '/email-sent-successfully' });
    },
    onError: () => {
      setLoading(false);
    },
  });

  const onSubmit = handleSubmit(() => {
    setLoading(true);
    passwordResetRequestMutator.mutate({ email });
  });

  const onCancel = () => {
    navigate({ to: '/login' });
  };

  return (
    <Card className='w-full max-w-[500px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <CardHeader>
        <CardTitle className='text-2xl'>
          {t('Pages.ForgotPasswordPage.Title')}
        </CardTitle>
        <CardDescription className='py-3'>
          {t('Pages.ForgotPasswordPage.Description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-6'>
          <div className='flex flex-col gap-3'>
            <Label htmlFor='email'>{t('Pages.ForgotPasswordPage.Email')}</Label>
            <Input
              id='email'
              type='email'
              required
              errorMessage={errors.email?.message}
              {...register('email')}
            ></Input>
          </div>
          <div className='flex flex-col mt-2 gap-4'>
            <Button
              className='w-full'
              type='submit'
              loading={loading}
              disabled={!isValid}
              onClick={onSubmit}
            >
              {t('Pages.ForgotPasswordPage.SubmitButton')}
            </Button>
            <Button
              className='w-full'
              type='button'
              variant='outline'
              onClick={onCancel}
            >
              {t('Actions.Cancel')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
