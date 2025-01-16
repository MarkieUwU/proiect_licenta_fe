import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from '@tanstack/react-router';
import { useToken } from '../useToken';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../../../modules/Profile/apis/user.api';
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
  username: yup.string().required('Please provide the username').min(3),
  password: yup.string().required('Please provide a password').min(3),
});

export const LogInPage: React.FC = () => {
  const { token, setToken } = useToken();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const username = watch('username');
  const password = watch('password');

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      const { token } = data;
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

    loginMutation.mutate({ username, password });
  });

  if (token?.length) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Card className="w-[450px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
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
            <Button
              className="w-full mt-6"
              loading={loading}
              disabled={!isValid}
              onClick={onSubmit}
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
