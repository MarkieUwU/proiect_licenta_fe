import Header from '@/layout/components/Header';
import { Outlet } from '@tanstack/react-router';
import '@/layout/MainLayout/MainLayout.css';
import { Theme } from '@/core/models/theme.enum';
import { useTheme } from '@/core/components/ThemeProvider';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/core/auth/AuthContext';

const MainLayout: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();
  const { user: loggedUser } = useAuth();

  useEffect(() => {
    setTheme(loggedUser!.theme);
    i18n.changeLanguage(loggedUser!.language);
  }, [loggedUser, theme]);

  const isDarkTheme = theme === Theme.dark;

  if (isDarkTheme) {
    document.documentElement.style.setProperty('color-scheme', 'dark');
  } else {
    document.documentElement.style.setProperty('color-scheme', 'light');
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

export default MainLayout;
