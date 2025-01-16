import Header from '@/layout/components/Header';
import { Outlet, useNavigate } from '@tanstack/react-router';
import '@/layout/MainPage/MainPage.css';
import { LoggedUserContext } from '@/shared/hooks/userContext';
import { useToken } from '@/core/auth/useToken';
import { jwtDecode } from 'jwt-decode';
import { LoggedUser } from '@/modules/Profile/models/user.models';
import { useLoggedUserState } from '@/modules/Profile/hooks/useLogedUserState';

const MainPage: React.FC = () => {
  const { token } = useToken();
  const { loggedUser } = useLoggedUserState(() => {

    if (!token) {
      return {} as LoggedUser;
    }

    const decodedUser = jwtDecode(token) as any;
    const user = Object.assign<LoggedUser, LoggedUser>({} as LoggedUser, {
      id: decodedUser.id,
      fullName: decodedUser.fullName,
      username: decodedUser.username,
      email: decodedUser.email,
    });
    return user;
  });
  const navigate = useNavigate();

  if (!loggedUser?.id) {
    navigate({ to: '/login' });
    return;
  }

  return (
    <LoggedUserContext.Provider value={loggedUser}>
      <Header />
      <div className="bg-gray-100 app-container min-h-screen">
        <Outlet />
      </div>
    </LoggedUserContext.Provider>
  );
};

export default MainPage;
