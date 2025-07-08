import { useAuth } from '@/core/auth/AuthContext';
import { getInitials } from '@/core/utils/utils';
import { AvatarComponent } from '@/layout/components/Avatar';
import MyAccountMenu from '@/layout/components/MyAccountMenu';
import { getUserDetails } from '@/modules/Profile/apis/user.api';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@radix-ui/react-navigation-menu';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AdminHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useAuth();

  const userResponse = useQuery({
    queryKey: ['userDetails', { username: user!.username }],
    queryFn: () => getUserDetails(user!.username),
  });

  const handleMenuOpen = (value: boolean) => {
    setOpenMenu(value);
  }

  return (
    <NavigationMenu className='max-w-full border-b py-2 px-5'>
      <NavigationMenuList className='flex justify-between w-full gap-4 pe-4'>
        <NavigationMenuItem className='flex items-center'>
          <SidebarTrigger />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <MyAccountMenu
            username={user!.username}
            containsHome={true}
            open={openMenu}
            onOpenChange={handleMenuOpen}
          >
            <div className='cursor-pointer' onClick={() => setOpenMenu(true)}>
              <AvatarComponent
                initials={getInitials(user!.username)}
                image={userResponse.data?.profileImage}
              ></AvatarComponent>
            </div>
          </MyAccountMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
} 