import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';

const LogOutPage: React.FC = () => {
  const { logout } = useAuth();
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.LogOutPage' });
  const router = useRouter();

  const onSubmit = () => {
    logout();
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
        <Button className='w-full' onClick={onSubmit}>
          {t('LogOut')}
        </Button>
        <Button className='w-full' variant='outline' onClick={onCancel}>
          {t('Cancel')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LogOutPage;
