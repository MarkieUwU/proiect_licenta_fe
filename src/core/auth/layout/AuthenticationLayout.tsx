import { SelectorConfiguration } from '@/components/models/selector.configuration';
import { Button } from '@/components/ui/button';
import Selector from '@/components/ui/Selector';
import { useTheme } from '@/core/components/ThemeProvider';
import { LanguageCodes } from '@/core/models/language-codes.enum';
import { Theme } from '@/core/models/theme.enum';
import { Outlet } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

const AuthenticationLayout: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'Enums.Language' });
  const isDarkTheme = theme === Theme.dark;

  const languageSelectorConfig: SelectorConfiguration = {
    placeholder: 'Language',
    items: [
      { label: t('English'), value: LanguageCodes.en },
      { label: t('Romanian'), value: LanguageCodes.ro },
    ],
  };

  const handleLanguageChange = (value: LanguageCodes) => {
    i18n.changeLanguage(value);
  }

  const handleThemeChange = (value: Theme) => {
    setTheme(value);
  }

  return (
    <div className={`h-screen ${isDarkTheme ? 'bg-slate-900' : 'bg-gray-100'}`}>
      <div className='flex justify-end ms-auto gap-3 p-4'>
        {isDarkTheme ? (
          <Button variant='ghost' size='icon' onClick={() => handleThemeChange(Theme.light)}>
            <i className='ri-sun-fill text-lg'></i>
          </Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => handleThemeChange(Theme.dark)}>
            <i className='ri-moon-fill text-lg'></i>
          </Button>
        )}
        <Selector
          defaultValue={i18n.language}
          onValueChange={(value) => handleLanguageChange(value)}
          {...languageSelectorConfig}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthenticationLayout;
