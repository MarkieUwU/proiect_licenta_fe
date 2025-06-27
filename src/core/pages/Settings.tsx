import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PreferenceSettings from '../components/preference-settings';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSettings, updateSettings } from '@/modules/Profile/apis/user.api';
import { SettingsRequest } from '@/modules/Profile/models/user.models';
import PrivacySettings from '../components/privacy-settings';
import { LoaderCircle } from 'lucide-react';
import { ErrorPage } from './ErrorPage';
import { useTheme } from '../components/ThemeProvider';
import { useAuth } from '../auth/AuthContext';
import BackButton from '@/components/ui/BackButton';

export const Settings = () => {
  const { t } = useTranslation();
  const { setTheme } = useTheme();
  const { user } = useAuth();

  const settingsResponse = useQuery({
    queryKey: ['settings'],
    queryFn: () => getSettings(user!.id)
  });

  const updateSettingsMutator = useMutation({
    mutationFn: updateSettings,
    onSuccess: (data) => {
      setTheme(data.theme);
    },
  });


  if (!settingsResponse.data) {
    return <ErrorPage />
  }

  const handleUpdateSettings = (settingsRequest: SettingsRequest) => {
    updateSettingsMutator.mutate({ userId: user!.id, settingsRequest });
  };

  return (
    <div className='pt-6 flex flex-col gap-2 w-full max-w-[600px] mx-auto'>
      <BackButton
        variant='outline'
        size='sm'
        className='text-muted-foreground hover:text-foreground w-fit mb-2'
      />
      <Card className='w-full p-2'>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
