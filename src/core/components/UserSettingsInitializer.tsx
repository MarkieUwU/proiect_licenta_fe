import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../components/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { getSettings } from '@/modules/Profile/apis/user.api';

export const UserSettingsInitializer = () => {
  const { user, isAuthenticated } = useAuth();
  const { setTheme } = useTheme();
  const { i18n } = useTranslation();

  const { data: settings } = useQuery({
    queryKey: ['settings', user?.id],
    queryFn: () => getSettings(user!.id),
    enabled: isAuthenticated && !!user?.id,
  });

  useEffect(() => {
    if (settings?.theme) {
      setTheme(settings.theme);
    }

    if (settings?.language) {
      i18n.changeLanguage(settings.language);
    }
  }, [settings, setTheme, i18n]);

  return null;
};
