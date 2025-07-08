import { Outlet } from '@tanstack/react-router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/App.css';
import { Toaster } from './components/ui/sonner';
import ThemeProvider from './core/components/ThemeProvider';
import { Theme } from './core/models/theme.enum';
import './i18n/i18n'
import { AuthProvider } from './core/auth/AuthContext';
import { UserSettingsInitializer } from './core/components/UserSettingsInitializer';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme={Theme.dark} storageKey='vite-ui-theme'>
        <UserSettingsInitializer />
        <Outlet />
        <Toaster richColors />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
