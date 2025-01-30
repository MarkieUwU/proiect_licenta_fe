import { Outlet } from '@tanstack/react-router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/App.css';
import { Toaster } from './components/ui/sonner';
import ThemeProvider from './core/components/ThemeProvider';
import { Theme } from './core/models/theme.enum';
import './i18n/i18n'
import { useLoggedUserState } from './modules/Profile/hooks/useLoggedUserState';
import { LoggedUserStateContext } from './modules/Profile/hooks/logged-user-state-context';
import { useMemo } from 'react';
import { LoggedUser } from './modules/Profile/models/user.models';

function App() {
  const { loggedUser, updateLoggedUser } = useLoggedUserState();
  const loggedUserState = useMemo(() => {
    return {
      loggedUser: loggedUser || {} as LoggedUser,
      updateLoggedUser
    }
  }, [loggedUser, updateLoggedUser]);

  return (
    <LoggedUserStateContext.Provider value={loggedUserState}>
      <ThemeProvider defaultTheme={Theme.dark} storageKey='vite-ui-theme'>
        <Outlet />
        <Toaster richColors />
      </ThemeProvider>
    </LoggedUserStateContext.Provider>
  );
}

export default App;
