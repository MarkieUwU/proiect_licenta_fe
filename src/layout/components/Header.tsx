// src/components/Header.tsx
import { Link } from '@tanstack/react-router';
import React, { useContext } from 'react';
import { AvatarComponent } from './Avatar';
import { getInitials } from '@/core/utils/utils';
import { LoggedUserContext } from '@/shared/hooks/userContext';
import MyAccountMenu from './MyAccountMenu';

const Header: React.FC = () => {
  const user = useContext(LoggedUserContext);

  return (
    <header className='fixed top-0 w-full z-10 bg-white shadow p-4 flex justify-between items-center'>
      <div className='flex items-center'>
        <div className='text-2xl font-bold'>SocialMediaApp</div>
        <input
          type='text'
          placeholder='Search'
          className='ml-4 p-2 border rounded'
        />
      </div>
      <div className='flex items-center space-x-4'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>
        <Link to='/connections' className='[&.active]:font-bold'>
          Connections
        </Link>
        <MyAccountMenu username={user.username}>
          <AvatarComponent
            initials={getInitials(user.username)}
          ></AvatarComponent>
        </MyAccountMenu>
      </div>
    </header>
  );
};

export default Header;
