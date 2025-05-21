import React, { useContext, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useToken } from '../../hooks/useToken';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { LoggedUserStateContext } from '@/modules/Profile/hooks/logged-user-state-context';

const schema = yup.object({
  username: yup.string().required().min(3),
  password: yup.string().required().min(4),
});

export const LogInPage: React.FC = () => {
  const { token, setToken } = useToken();
  const { theme } = useTheme();
  const { updateLoggedUser } = useContext(LoggedUserStateContext);
  const { i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const username = watch('username');
  const password = watch('password');

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { token, userProfile } = data;
      updateLoggedUser(userProfile);
      setToken(token);
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

    loginMutation.mutate({ username, password, theme, language: i18n.language });
  });

  if (token?.length) {
    navigate({ to: '/'});
    return;
  }

  return (
    <Card className='w-[450px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <CardHeader>
        <CardTitle className='text-2xl'>{t('Pages.LoginPage.Title')}</CardTitle>
        <CardDescription className='py-3'>
          {t('Pages.LoginPage.Description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='username'>{t('Pages.LoginPage.Username')}</Label>
              <Input
                id='username'
                type='username'
                required
                {...register('username')}
              />
              {errors.username?.type === 'required' && (
                <p className='text-red-500 text-sm'>
                  {t('ValidationErrors.UsernameRequired')}
                </p>
              )}
              {errors.username?.type === 'min' && (
                <p className='text-red-500 text-sm'>
                  {t('ValidationErrors.UsernameMin')}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='password'>{t('Pages.LoginPage.Password')}</Label>
              <Input
                id='password'
                type='password'
                required
                {...register('password')}
              />
              {errors.password?.type === 'required' && (
                <p className='text-red-500 text-sm'>
                  {t('ValidationErrors.PasswordRequired')}
                </p>
              )}
              {errors.password?.type === 'min' && (
                <p className='text-red-500 text-sm'>
                  {t('ValidationErrors.PasswordMin')}
                </p>
              )}
            </div>
            <Button
              className='w-full mt-6'
              loading={loading}
              disabled={!isValid}
              onClick={onSubmit}
            >
              {t('Pages.LoginPage.Login')}
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            {t('Pages.LoginPage.NoAccount')}
            <Link to='/signup' className='underline underline-offset-4 ps-2'>
              {t('Pages.LoginPage.SignUp')}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
