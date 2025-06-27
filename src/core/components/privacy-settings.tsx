import Selector from "@/components/ui/Selector";
import { Settings, SettingsRequest } from "@/modules/Profile/models/user.models";
import { useTranslation } from "react-i18next";
import { PrivacyOptions } from "../models/privacy-options.enum";
import { SelectorConfiguration } from "@/components/models/selector.configuration";

interface PrivacySettingsProps {
  settings: Settings;
  onSettingsChange: (request: SettingsRequest) => void;
}

export const PrivacySettings: React.FC<PrivacySettingsProps> = ({ settings, onSettingsChange }) => {
  const { t } = useTranslation();

  const items = [
    { label: t('Enums.PrivacyOptions.Public'), value: PrivacyOptions.public },
    { label: t('Enums.PrivacyOptions.Connections'), value: PrivacyOptions.followers },
    { label: t('Enums.PrivacyOptions.Private'), value: PrivacyOptions.private }
  ];

  const detailsPrivacySelectorConfig: SelectorConfiguration = {
    placeholder: t('Pages.Settings.ProfileDetails'),
    items
  };

  const connectionsPrivacySelectorConfig: SelectorConfiguration = {
    placeholder: t('Pages.Settings.Connections'),
    items
  };

  const postsPrivacySelectorConfig: SelectorConfiguration = {
    placeholder: t('Pages.Settings.Posts'),
    items
  };

  return (
    <div className='flex flex-col'>
      <table className='text-md font-semibold mt-1 w-full'>
        <thead>
          <tr>
            <th
              colSpan={2}
              className='text-xl font-semibold p-3 ps-2 text-start border-b-2'
            >
              {t('Pages.Settings.PrivacySettings.Title')}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='py-4 pe-3'>
              {t('Pages.Settings.PrivacySettings.ProfileDetails')}
            </td>
            <td className='flex justify-end pt-3'>
              <Selector
                defaultValue={settings.detailsPrivacy}
                onValueChange={(value) =>
                  onSettingsChange({
                    detailsPrivacy: value,
                  } as SettingsRequest)
                }
                {...detailsPrivacySelectorConfig}
              />
            </td>
          </tr>
          <tr>
            <td className='py-4 pe-3'>
              {t('Pages.Settings.PrivacySettings.Connections')}
            </td>
            <td className='flex justify-end pt-3'>
              <Selector
                defaultValue={settings.connectionsPrivacy}
                onValueChange={(value) =>
                  onSettingsChange({
                    connectionsPrivacy: value,
                  } as SettingsRequest)
                }
                {...connectionsPrivacySelectorConfig}
              />
            </td>
          </tr>
          <tr>
            <td className='py-4 pe-3'>
              {t('Pages.Settings.PrivacySettings.Posts')}
            </td>
            <td className='flex justify-end pt-3'>
              <Selector
                defaultValue={settings.postsPrivacy}
                onValueChange={(value) =>
                  onSettingsChange({ postsPrivacy: value } as SettingsRequest)
                }
                {...postsPrivacySelectorConfig}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PrivacySettings;
