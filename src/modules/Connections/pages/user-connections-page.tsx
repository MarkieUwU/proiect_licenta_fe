import React from "react";
import { useTranslation } from "react-i18next";
import ConnectionsList from "../components/ConnectionsList";
import BackButton from "@/components/ui/BackButton";

interface UserFriendsPageProps {
  userId: number;
}

export const UserFriendsPage: React.FC<UserFriendsPageProps> = ({ userId }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.ConnectionsPage' });

  return (
    <div
      className='overflow-y-auto pt-6 pb-3'
      style={{ maxHeight: 'var(--app-height)' }}
    >
      <div className='flex flex-col gap-5 w-full lg:max-w-[1320px] px-2 mx-auto'>
        <div>
          <BackButton
            variant='outline'
            size='sm'
            className='text-muted-foreground hover:text-foreground'
          />
        </div>
      </div>
      <div className='w-fit mx-auto pt-6 flex flex-col items-center gap-4'>
        <h1 className='text-4xl font-bold mb-4'>{t('Connections')}</h1>
        <ConnectionsList userId={userId}></ConnectionsList>
      </div>
    </div>
  );
};