import { SelectorConfiguration } from "@/components/models/selector.configuration";
import { Theme } from "../models/theme.enum";
import { LanguageCodes } from "../models/language-codes.enum";
import Selector from "@/components/ui/Selector";
import { useTranslation } from "react-i18next";
import { UserSettings } from "@/modules/Profile/models/user.models";

interface PreferenceSettingsProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

export const PreferenceSettings: React.FC<PreferenceSettingsProps> = ({ settings, onSettingsChange }) => {
  const { t, i18n } = useTranslation();

  const themeSelectorConfig: SelectorConfiguration = {
    items: [
      { label: t('Enums.Theme.Light'), value: Theme.light },
      { label: t('Enums.Theme.Dark'), value: Theme.dark },
    ]
  };

  const languageSelectorConfig: SelectorConfiguration = {
    items: [
      { label: t('Enums.Language.English'), value: LanguageCodes.en },
      { label: t('Enums.Language.Romanian'), value: LanguageCodes.ro },
    ]
  };

  const handleThemeChange = (value: Theme) => {
    onSettingsChange({ theme: value } as UserSettings);
  }

  const handleLanguageChange = (value: LanguageCodes) => {
    onSettingsChange({ language: value } as UserSettings);
  }

  return (
    <div className='flex flex-col'>
      <table className='text-md font-semibold mt-1 w-full'>
        <thead>
          <tr>
            <th
              colSpan={2}
              className='text-xl font-semibold p-3 ps-2 text-start border-b-2'
            >
              {t('Pages.Settings.PreferenceSettings.Title')}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='py-4 pe-3'>
              {t('Pages.Settings.PreferenceSettings.Theme')}
            </td>
            <td className='flex justify-end pt-3'>
              <Selector
                key={`theme-${i18n.language}`}
                value={settings.theme}
                onValueChange={handleThemeChange}
                {...themeSelectorConfig}
              />
            </td>
          </tr>
          <tr>
            <td className='py-4 pe-3'>
              {t('Pages.Settings.PreferenceSettings.Language')}
            </td>
            <td className='flex justify-end pt-3'>
              <Selector
                key={`language-${i18n.language}`}
                value={settings.language}
                onValueChange={handleLanguageChange}
                {...languageSelectorConfig}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PreferenceSettings;