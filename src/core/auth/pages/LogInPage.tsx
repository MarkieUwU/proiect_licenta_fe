import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../../modules/Profile/apis/user.api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/core/components/ThemeProvider';
import { useAuth } from '../AuthContext';

export const LogInPage: React.FC = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const schema = yup.object({
    username: yup
      .string()
      .required(t('ValidationErrors.UsernameRequired'))
      .min(3, t('ValidationErrors.UsernameMin', { min: 3 })),
    password: yup
      .string()
      .required(t('ValidationErrors.PasswordRequired'))
      .min(4, t('ValidationErrors.PasswordMin', { min: 4 })),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onBlur',
  });
  const username = watch('username');
  const password = watch('password');

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { token, userProfile } = data;
      login(token, userProfile);
      setLoading(false);
      reset();
      navigate({ to: '/' });
    },
    onError: () => {
      setLoading(false);
    },
  });

  const onSubmit = handleSubmit(() => {
    setLoading(true);
    loginMutation.mutate({
      username,
      password,
      theme,
      language: i18n.language,
    });
  });

  if (isAuthenticated) {
    navigate({ to: '/' });
    return null;
  }

  return (
    <Card className='w-full max-w-[500px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <CardHeader>
        <CardTitle className='text-2xl'>{t('Pages.LoginPage.Title')}</CardTitle>
        <CardDescription className='py-3'>
          {t('Pages.LoginPage.Description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='username'>{t('Pages.LoginPage.Username')}</Label>
              <Input
                id='username'
                type='username'
                required
                errorMessage={errors.username?.message}
                {...register('username')}
              />
            </div>
            <div className='flex flex-col gap-3'>
              <div className='flex justify-between items-center'>
                <Label htmlFor='password'>
                  {t('Pages.LoginPage.Password')}
                </Label>
                <Link
                  to='/forgot-password'
                  className='hover:underline underline-offset-4 text-sm'
                >
                  {t('Pages.LoginPage.ForgotPassword')}
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                required
                errorMessage={errors.password?.message}
                {...register('password')}
              />
            </div>
            <Button
              className='w-full mt-6'
              type='submit'
              loading={loading}
              disabled={!isValid}
              onClick={onSubmit}
            >
              {t('Pages.LoginPage.Login')}
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            {t('Pages.LoginPage.NoAccount')}
            <Link to='/signup' className='hover:underline underline-offset-4 ps-2'>
              {t('Pages.LoginPage.SignUp')}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
