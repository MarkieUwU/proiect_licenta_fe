import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PreferenceSettings from '../components/preference-settings';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSettings } from '@/modules/Profile/apis/user.api';
import { SettingsRequest } from '@/modules/Profile/models/user.models';
import PrivacySettings from '../components/privacy-settings';
import { LoaderCircle } from 'lucide-react';
import { ErrorPage } from './ErrorPage';
import { useTheme } from '../components/ThemeProvider';
import { useAuth } from '../auth/AuthContext';
import BackButton from '@/components/ui/BackButton';
import { toast } from 'sonner';

export const Settings = () => {
  const { t, i18n } = useTranslation();
  const { setTheme } = useTheme();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const settingsResponse = useQuery({
    queryKey: ['settings', user?.id],
    queryFn: () => getSettings(user!.id),
    enabled: !!user?.id
  });

  const updateSettingsMutator = useMutation({
    mutationFn: updateSettings,
    onMutate: async (variables) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['settings', user?.id] });

      // Snapshot the previous value
      const previousSettings = queryClient.getQueryData(['settings', user?.id]);

      // Optimistically update to the new value
      const currentSettings = settingsResponse.data;
      if (currentSettings) {
        const mergedSettings = {
          ...currentSettings,
          ...variables.settingsRequest
        };
        queryClient.setQueryData(['settings', user?.id], mergedSettings);
      }

      // Return a context object with the snapshotted value
      return { previousSettings };
    },
    onSuccess: () => {
      toast.success(t('Pages.Settings.Success.Updated'));
    },
    onError: (_error, _variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousSettings) {
        queryClient.setQueryData(['settings', user?.id], context.previousSettings);
      }
      toast.error(t('Pages.Settings.Error.UpdateFailed'));
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the correct server state
      queryClient.invalidateQueries({ queryKey: ['settings', user?.id] });
    },
  });

  const handleUpdateSettings = (settingsRequest: SettingsRequest) => {
    const currentSettings = settingsResponse.data;
    if (!currentSettings) return;

    const mergedSettings = {
      ...currentSettings,
      ...settingsRequest
    };

    // Apply theme and language changes immediately for better UX
    if (settingsRequest.theme && settingsRequest.theme !== currentSettings.theme) {
      setTheme(settingsRequest.theme);
    }
    if (settingsRequest.language && settingsRequest.language !== currentSettings.language) {
      i18n.changeLanguage(settingsRequest.language);
    }

    // The optimistic update is handled in the mutation's onMutate
    updateSettingsMutator.mutate({ 
      userId: user!.id, 
      settingsRequest: mergedSettings 
    });
  };

  if (settingsResponse.isPending) {
    return (
      <div className='pt-6 flex flex-col gap-2 w-full max-w-[600px] mx-auto'>
        <div className='flex justify-center items-center min-h-[400px]'>
          <LoaderCircle className='animate-spin h-8 w-8' />
        </div>
      </div>
    );
  }

  if (settingsResponse.isError || !settingsResponse.data) {
    return <ErrorPage />
  }

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
          <div className="relative">
            {updateSettingsMutator.isPending && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
                <LoaderCircle className='animate-spin h-6 w-6' />
              </div>
            )}
            <PreferenceSettings
              settings={settingsResponse.data}
              onSettingsChange={handleUpdateSettings}
            />
            <PrivacySettings
              settings={settingsResponse.data}
              onSettingsChange={handleUpdateSettings}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
