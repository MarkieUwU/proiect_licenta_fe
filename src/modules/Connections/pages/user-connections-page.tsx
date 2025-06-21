import React from "react";
import { useTranslation } from "react-i18next";
import ConnectionsList from "../components/ConnectionsList";

interface UserConnectionsPageProps {
  userId: number;
}

export const UserConnectionsPage: React.FC<UserConnectionsPageProps> = ({ userId }) => {
  const { t } = useTranslation('translation');

  return (
    <div className='w-fit mx-auto pt-6 flex flex-col items-center gap-4'>
      <h1 className='text-4xl font-bold mb-4'>
        {t('Pages.ConnectionsPage.Connections')}
      </h1>
      <ConnectionsList userId={userId}></ConnectionsList>
    </div>
  );
};