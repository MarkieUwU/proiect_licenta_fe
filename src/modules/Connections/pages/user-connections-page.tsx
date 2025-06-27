import React from "react";
import { useTranslation } from "react-i18next";
import ConnectionsList from "../components/ConnectionsList";

interface UserFriendsPageProps {
  userId: number;
}

export const UserFriendsPage: React.FC<UserFriendsPageProps> = ({ userId }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.ConnectionsPage' });

  return (
    <div className='w-fit mx-auto pt-6 flex flex-col items-center gap-4'>
      <h1 className='text-4xl font-bold mb-4'>{t('Connections')}</h1>
      <ConnectionsList userId={userId}></ConnectionsList>
    </div>
  );
};