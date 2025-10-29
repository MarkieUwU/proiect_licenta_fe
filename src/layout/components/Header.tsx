// src/components/Header.tsx
import { Link } from '@tanstack/react-router';
import React, { useState } from 'react';
import { AvatarComponent } from './Avatar';
import { getInitials } from '@/core/utils/utils';
import MyAccountMenu from './MyAccountMenu';
import { NotificationBell } from '@/core/components/NotificationBell';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getUserProfileImage } from '@/modules/Profile/apis/user.api';
import { useAuth } from '@/core/auth/AuthContext';
import { Role } from '@/modules/Profile/models/role.enum';
import { getNotificationsCount } from '@/core/apis/notification.api';

const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation('translation', { keyPrefix: 'Components.Header' });

  const profileImageResponse = useQuery({
    queryKey: ['profileImage', { id: user!.id }],
    queryFn: () => getUserProfileImage(user!.id)
  });

  const { data: count } = useQuery({
    queryKey: ['notificationsCount'],
    queryFn: () => getNotificationsCount(),
    refetchInterval: 10000,
    refetchIntervalInBackground: false,
  });

  const handleMenuOpen = (value: boolean) => {
    setOpenMenu(value);
  }

  return (
    <NavigationMenu className='max-w-full justify-end border-b shadow p-3'>
      <NavigationMenuList className='flex flex-end gap-4 me-3'>
        <NavigationMenuItem>
          <Link to='/' className='[&.active]:font-bold'>
            <NavigationMenuLink>{t('Home')}</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to='/friends' className='[&.active]:font-bold'>
            <NavigationMenuLink>{t('Friends')}</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NotificationBell count={count ?? 0} />
        </NavigationMenuItem>
        <NavigationMenuItem className='pe-4'>
          <MyAccountMenu
            username={user!.username}
            containsAdmin={user!.role === Role.ADMIN}
            open={openMenu}
            onOpenChange={handleMenuOpen}
          >
            <div className='cursor-pointer' onClick={() => setOpenMenu(true)}>
              <AvatarComponent
                initials={getInitials(user!.username)}
                image={profileImageResponse.data}
              ></AvatarComponent>
            </div>
          </MyAccountMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Header;
