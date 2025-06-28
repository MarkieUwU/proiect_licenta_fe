import { useAuth } from '@/core/auth/AuthContext';
import { getInitials } from '@/core/utils/utils';
import { AvatarComponent } from '@/layout/components/Avatar';
import MyAccountMenu from '@/layout/components/MyAccountMenu';
import { getUserDetails } from '@/modules/Profile/apis/user.api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

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
    <header className='h-16 border-b bg-card'>
      <div className='flex items-center justify-between h-full px-6'>
        <h1 className='text-xl font-semibold'>Admin Panel</h1>
        <div className='me-4'>
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
        </div>
      </div>
    </header>
  );
} 