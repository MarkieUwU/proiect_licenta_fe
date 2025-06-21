import { useToken } from '../../hooks/useToken';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

const LogOutPage: React.FC = () => {
  const { removeToken } = useToken();
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.LogOutPage' });
  const navigate = useNavigate();
  const router = useRouter();

  const onSubmit = () => {
    removeToken();
    navigate({ to: '/login' });
  };

  const onCancel = () => {
    router.history.back();
  }

  return (
    <Card className='w-full w-[500px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <CardHeader>
        <CardTitle className='text-2xl'>{t('LogOut')}</CardTitle>
        <CardDescription className='py-3'>{t('Description')}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <Button className='w-full' type='submit' onClick={onSubmit}>
          {t('LogOut')}
        </Button>
        <Button className='w-full' type='button' variant='outline' onClick={onCancel}>
          {t('Cancel')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LogOutPage;
