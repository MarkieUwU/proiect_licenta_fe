import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PreferenceSettings from '../components/preference-settings';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSettings, updateSettings } from '@/modules/Profile/apis/user.api';
import { SettingsRequest } from '@/modules/Profile/models/user.models';
import { useContext } from 'react';
import { LoggedUserStateContext } from '../../modules/Profile/hooks/logged-user-state-context';
import PrivacySettings from '../components/privacy-settings';
import { LoaderCircle } from 'lucide-react';
import { ErrorPage } from './ErrorPage';
import { useTheme } from '../components/ThemeProvider';

export const Settings = () => {
  const { t } = useTranslation();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const { loggedUser } = useContext(LoggedUserStateContext);

  const settingsResponse = useQuery({
    queryKey: ['settings'],
    queryFn: () => getSettings(loggedUser.id)
  });

  const updateSettingsMutator = useMutation({
    mutationFn: updateSettings,
    onSuccess: (data) => {
      setTheme(data.theme);
    },
  });

  const navigateToAdmin = () => {
    navigate({ to: '/admin' });
  };

  if (!settingsResponse.data) {
    return <ErrorPage />
  }

  const handleUpdateSettings = (settingsRequest: SettingsRequest) => {
    updateSettingsMutator.mutate({ userId: loggedUser.id, settingsRequest });
  };

  return (
    <div className='pt-6'>
      <Card className='w-[500px] mx-auto p-2'>
        <CardHeader>
          <CardTitle className='text-4xl text-bold'>
            {t('Pages.Settings.Title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {settingsResponse.isPending ? (
            <LoaderCircle className='animate-spin' />
          ) : (
            <>
              <PreferenceSettings
                settings={settingsResponse.data}
                onSettingsChange={handleUpdateSettings}
              />
              <PrivacySettings
                settings={settingsResponse.data}
                onSettingsChange={handleUpdateSettings}
              />
            </>
          )}
          <Button className='mt-5' onClick={navigateToAdmin}>
            Admin page
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
