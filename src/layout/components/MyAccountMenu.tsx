import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useNavigate } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface MyAccountMenu {
  children: ReactNode;
  username: string;
  containsHome?: boolean;
  containsAdmin?: boolean;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const MyAccountMenu: React.FC<MyAccountMenu> = ({ children, username, containsHome, containsAdmin, open, onOpenChange }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'Components.Header.MyAccountMenu' })
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{t('MyAccount')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {containsHome && (
          <DropdownMenuItem onClick={() => navigate({ to: '/' })}>
            {t('Home')}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() =>
            navigate({ to: '/$username/profile', params: { username } })
          }
        >
          {t('Profile')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate({ to: '/settings' })}>
          {t('Settings')}
        </DropdownMenuItem>
        {containsAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({ to: '/admin/dashboard' })}>
              {t('Admin')}
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate({ to: '/logout' })}>
          {t('LogOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyAccountMenu;
