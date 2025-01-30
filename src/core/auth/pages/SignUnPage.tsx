import React, { useContext, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useToken } from '../../hooks/useToken';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser } from '../../../modules/Profile/apis/user.api';
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
import Selector from '@/components/ui/Selector';
import { SelectorConfiguration } from '@/components/models/selector.configuration';
import { Gender } from '@/modules/Profile/models/gender.enum';
import { useTheme } from '@/core/components/ThemeProvider';
import { LoggedUserStateContext } from '@/modules/Profile/hooks/logged-user-state-context';

const schema = yup.object({
  fullName: yup.string().required().min(5),
  username: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
  confirmPassword: yup.string().required().min(4),
});

export const RegistrationPage: React.FC = () => {
  const { setToken } = useToken();
  const { theme } = useTheme();
  const { i18n } = useTranslation();
  const { updateLoggedUser } = useContext(LoggedUserStateContext);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema) });
  const queryClient = useQueryClient();
const fullName = watch('fullName');
  const username = watch('username');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const genderSelectorConfig: SelectorConfiguration = {
    placeholder: t('Pages.SignUpPage.Gender'),
    items: [
      { label: t('Enums.Gender.Male'), value: Gender.male },
      { label: t('Enums.Gender.Female'), value: Gender.female }
    ]
  };

  const createMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      const { token, user } = data;
      setToken(token);
      updateLoggedUser(user);
      reset();
      setLoading(false);
      navigate({ to: '/' });
    },
    onError: () => {
      setLoading(false);
    },
  });

  const onSubmit = handleSubmit(() => {
    setLoading(true);

    createMutation.mutate({
      fullName,
      username,
      email,
      gender,
      password,
      confirmPassword,
      theme,
      language: i18n.language
    });
  });

  return (
    <Card className='w-[450px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <CardHeader>
        <CardTitle className='text-2xl'>
          {t('Pages.SignUpPage.Title')}
        </CardTitle>
        <CardDescription className='py-3'>
          {t('Pages.SignUpPage.Description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='username'>{t('Pages.SignUpPage.Username')}</Label>
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
            <div className='grid gap-2'>
              <Label htmlFor='fullName'>{t('Pages.SignUpPage.FullName')}</Label>
              <Input
                id='fullName'
                type='fullName'
                required
                {...register('fullName')}
              />
              {errors.fullName?.type === 'required' && (
                <p className='text-red-500 text-sm'>
                  {t('ValidationErrors.FullNameRequired')}
                </p>
              )}
              {errors.fullName?.type === 'min' && (
                <p className='text-red-500 text-sm'>
                  {t('ValidationErrors.FullNameMin')}
                </p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>{t('Pages.SignUpPage.Email')}</Label>
              <Input id='email' type='email' required {...register('email')} />
              {errors.email?.type === 'required' && (
                <p className='text-red-500 text-sm'>
                  {t('ValidationErrors.EmailRequired')}
                </p>
              )}
              {errors.email?.type === 'email' && (
                <p className='text-red-500 text-sm'>
                  {t('ValidationErrors.EmailError')}
                </p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='gender'>{t('Pages.SignUpPage.Gender')}</Label>
              <Selector {...genderSelectorConfig} onValueChange={(value) => setGender(value)} />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>{t('Pages.SignUpPage.Password')}</Label>
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
            <div className='grid gap-2'>
              <Label htmlFor='confirmPassword'>
                {t('Pages.SignUpPage.ConfirmPassword')}
              </Label>
              <Input
                id='confirmPassword'
                type='password'
                required
                {...register('confirmPassword')}
              />
              {errors.confirmPassword?.type === 'required' && (
                <p className='text-red-500 text-sm'>
                  {t('ValidationErrors.PasswordRequired')}
                </p>
              )}
              {errors.confirmPassword?.type === 'min' && (
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
              {t('Pages.SignUpPage.SignUp')}
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            {t('Pages.SignUpPage.AlreadyAccount')}
            <Link to='/login' className='underline underline-offset-4 ms-2'>
              {t('Pages.SignUpPage.LogIn')}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
