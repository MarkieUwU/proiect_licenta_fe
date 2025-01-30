// src/components/Header.tsx
import { Link } from '@tanstack/react-router';
import React, { useContext, useState } from 'react';
import { AvatarComponent } from './Avatar';
import { getInitials } from '@/core/utils/utils';
import { LoggedUserStateContext } from '@/modules/Profile/hooks/logged-user-state-context';
import MyAccountMenu from './MyAccountMenu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from '@/modules/Profile/apis/user.api';

const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { loggedUser } = useContext(LoggedUserStateContext);
  const { t } = useTranslation('translation', { keyPrefix: 'Components.Header' });

  const userResponse = useQuery({
    queryKey: ['userDetails', { username: loggedUser.username }],
    queryFn: () => getUserDetails(loggedUser.username)
  });

  const handleMenuOpen = (value: boolean) => {
    setOpenMenu(value);
  }

  return (
    <NavigationMenu className='max-w-full justify-end p-3'>
      <NavigationMenuList className='flex flex-end gap-4'>
        <NavigationMenuItem>
          <Link to='/' className='[&.active]:font-bold'>
            <NavigationMenuLink>{t('Home')}</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to='/connections' className='[&.active]:font-bold'>
            <NavigationMenuLink>{t('Connections')}</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <MyAccountMenu
            username={loggedUser.username}
            open={openMenu}
            onOpenChange={handleMenuOpen}
          >
            <div className='cursor-pointer' onClick={() => setOpenMenu(true)}>
              <AvatarComponent
                initials={getInitials(loggedUser.username)}
                image={userResponse.data?.profileImage}
              ></AvatarComponent>
            </div>
          </MyAccountMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Header;
