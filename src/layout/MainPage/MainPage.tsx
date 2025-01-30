import Header from '@/layout/components/Header';
import { Outlet, useNavigate } from '@tanstack/react-router';
import '@/layout/MainPage/MainPage.css';
import { Theme } from '@/core/models/theme.enum';
import { useTheme } from '@/core/components/ThemeProvider';
import { useContext, useEffect } from 'react';
import { LoggedUserStateContext } from '@/modules/Profile/hooks/logged-user-state-context';
import { useToken } from '@/core/hooks/useToken';
import { decodeToken } from '@/core/utils/utils';
import { useTranslation } from 'react-i18next';

const MainPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();
  const { token } = useToken();
  const { loggedUser, updateLoggedUser } = useContext(LoggedUserStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token?.length) {
      navigate({ to: '/login' });
      return;
    }

    if (!loggedUser?.id) {
      const user = decodeToken(token);
      setTheme(user.theme);
      i18n.changeLanguage(user.language);
      updateLoggedUser(user);
      return;
    }

    setTheme(loggedUser.theme);
    i18n.changeLanguage(loggedUser.language);
  }, [loggedUser, theme]);

  const isDarkTheme = theme === Theme.dark;

  if (isDarkTheme) {
    document.documentElement.style.setProperty('color-scheme', 'dark');
  } else {
    document.documentElement.style.setProperty('color-scheme', 'light');
  }

  if (!loggedUser?.id) {
    return null;
  }

  return (
    <>
      <Header />
      <div
        className={`app-container ${isDarkTheme ? 'bg-slate-900' : 'bg-gray-100'}`}
      >
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
