import { SelectorConfiguration } from "@/components/models/selector.configuration";
import { Theme } from "../models/theme.enum";
import { LanguageCodes } from "../models/language-codes.enum";
import Selector from "@/components/ui/Selector";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "react-i18next";
import { Settings, SettingsRequest } from "@/modules/Profile/models/user.models";

interface PreferenceSettingsProps {
  settings: Settings;
  onSettingsChange: (settings: SettingsRequest) => void;
}

const PreferenceSettings: React.FC<PreferenceSettingsProps> = ({ settings, onSettingsChange }) => {
  const { setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const themeSelectorConfig: SelectorConfiguration = {
    placeholder: t('Pages.Settings.PreferenceSettings.Theme'),
    items: [
      { label: t('Enums.Theme.Light'), value: Theme.light },
      { label: t('Enums.Theme.Dark'), value: Theme.dark },
    ]
  }

  const languageSelectorConfig: SelectorConfiguration = {
    placeholder: t('Pages.Settings.PreferenceSettings.Language'),
    items: [
      { label: t('Enums.Language.English'), value: LanguageCodes.en },
      { label: t('Enums.Language.Romanian'), value: LanguageCodes.ro },
    ],
  };

  const handleThemeChange = (value: Theme) => {
    setTheme(value);
    onSettingsChange({ theme: value } as SettingsRequest);
  }

  const handleLanguageChange = (value: LanguageCodes) => {
    i18n.changeLanguage(value);
    onSettingsChange({ language: value } as SettingsRequest);
  }

  return (
    <div className='flex flex-col'>
      <table className='text-md font-semibold mt-1 w-[300px]'>
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
            <td className='py-5 pe-3'>
              {t('Pages.Settings.PreferenceSettings.Theme')}
            </td>
            <td>
              <Selector
                defaultValue={settings.theme}
                onValueChange={handleThemeChange}
                {...themeSelectorConfig}
              />
            </td>
          </tr>
          <tr>
            <td className='py-3 pe-3'>
              {t('Pages.Settings.PreferenceSettings.Language')}
            </td>
            <td>
              <Selector
                defaultValue={settings.language}
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