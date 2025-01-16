import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useToken } from '../useToken';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser } from '../../../modules/Profile/apis/user.api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  fullName: yup.string().required('Please provide a name').min(6),
  username: yup.string().required('Please provide the username').min(3),
  email: yup.string().required('Please provide an email').email(),
  password: yup.string().required('Please provide a password').min(3),
  confirmPassword: yup.string().required('Please provide a password').min(3),
});

export const RegistrationPage: React.FC = () => {
  const { setToken } = useToken();
  const [loading, setLoading] = useState(false);
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

  const createMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      const { token } = data;
      setToken(token);
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
      password,
      confirmPassword,
    });
  });

  return (
    <Card className="w-[450px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription className="py-3">
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                required
                {...register('username')}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username?.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="fullName"
                required
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName?.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required {...register('email')} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                {...register('confirmPassword')}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <Button
              className="w-full mt-6"
              loading={loading}
              disabled={!isValid}
              onClick={onSubmit}
            >
              Sign Up
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="underline underline-offset-4">
              Log in instead
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
