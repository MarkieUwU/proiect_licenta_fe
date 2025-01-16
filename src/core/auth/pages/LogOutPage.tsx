import { useToken } from '../useToken';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { useNavigate } from '@tanstack/react-router';

const LogOutPage: React.FC = () => {
  const { removeToken } = useToken();
  const navigate = useNavigate();

  const onSubmit = () => {
    removeToken();
    navigate({ to: '/login' });
  };

  return (
    <Card className="w-[450px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle className="text-2xl">Log Out</CardTitle>
        <CardDescription className="py-3">
          By proceeding you will be loged out of the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={onSubmit}>
          Log Out
        </Button>
      </CardContent>
    </Card>
  );
};

export default LogOutPage;
