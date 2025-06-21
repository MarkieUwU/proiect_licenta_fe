import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
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
import { useAuth } from '../AuthContext';

export const RegistrationPage: React.FC = () => {
  const { theme } = useTheme();
  const { i18n } = useTranslation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = yup.object({
    fullName: yup
      .string()
      .required(t('ValidationErrors.FullNameRequired'))
      .min(5, t('ValidationErrors.FullNameMin', { min: 5 })),
    username: yup
      .string()
      .required(t('ValidationErrors.UsernameRequired'))
      .min(3, t('ValidationErrors.UsernameMin', { min: 3 })),
    email: yup
      .string()
      .required(t('ValidationErrors.EmailRequired'))
      .email(t('ValidationErrors.EmailError')),
    password: yup
      .string()
      .required(t('ValidationErrors.PasswordRequired'))
      .min(4, t('ValidationErrors.PasswordMin', { min: 4 })),
    confirmPassword: yup
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
  } = useForm({ resolver: yupResolver(schema) });
  const fullName = watch('fullName');
  const username = watch('username');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const genderSelectorConfig: SelectorConfiguration = {
    placeholder: t('Pages.SignUpPage.Gender'),
    items: [
      { label: t('Enums.Gender.Male'), value: Gender.male },
      { label: t('Enums.Gender.Female'), value: Gender.female },
    ],
  };

  const createMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      const { token, user } = data;
      login(token, user);
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
      language: i18n.language,
    });
  });

  return (
    <Card className='w-full max-w-[500px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
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
            <div className='flex flex-col gap-2'>
              <Label htmlFor='username'>{t('Pages.SignUpPage.Username')}</Label>
              <Input
                id='username'
                type='username'
                required
                errorMessage={errors.username?.message}
                {...register('username')}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='fullName'>{t('Pages.SignUpPage.FullName')}</Label>
              <Input
                id='fullName'
                type='fullName'
                required
                errorMessage={errors.fullName?.message}
                {...register('fullName')}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email'>{t('Pages.SignUpPage.Email')}</Label>
              <Input
                id='email'
                type='email'
                required
                errorMessage={errors.email?.message}
                {...register('email')}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='gender'>{t('Pages.SignUpPage.Gender')}</Label>
              <Selector
                {...genderSelectorConfig}
                onValueChange={(value) => setGender(value)}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='password'>{t('Pages.SignUpPage.Password')}</Label>
              <Input
                id='password'
                type='password'
                required
                errorMessage={errors.password?.message}
                {...register('password')}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='confirmPassword'>
                {t('Pages.SignUpPage.ConfirmPassword')}
              </Label>
              <Input
                id='confirmPassword'
                type='password'
                required
                errorMessage={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
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
