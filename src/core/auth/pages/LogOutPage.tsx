import { useToken } from '../../hooks/useToken';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

const LogOutPage: React.FC = () => {
  const { removeToken } = useToken();
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.LogOutPage' });
  const navigate = useNavigate();

  const onSubmit = () => {
    removeToken();
    navigate({ to: '/login' });
  };

  return (
    <Card className="w-[450px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle className="text-2xl">{t('LogOut')}</CardTitle>
        <CardDescription className="py-3">
          {t('Description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={onSubmit}>
          {t('LogOut')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LogOutPage;
