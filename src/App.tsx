import { Outlet } from '@tanstack/react-router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/App.css';
import { Toaster } from './shared/ui/sonner';
import ThemeProvider from './core/components/ThemeProvider';
import { Theme } from './core/models/theme.enum';

function App() {
  return (
    <ThemeProvider defaultTheme={Theme.DARK} storageKey="vite-ui-theme">
      <Outlet />
      <Toaster richColors />
    </ThemeProvider>
  );
}

export default App;
