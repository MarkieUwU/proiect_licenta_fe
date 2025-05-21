import { Theme } from '@/core/models/theme.enum';
import { useTheme } from 'next-themes';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface NoRecordsProps {
  title?: string;
  text?: string | null;
}

const NoRecordsFound: React.FC<NoRecordsProps> = ({
  title,
  text,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  if (!title) {
    title = t('Components.NoRecordFound.Title');
  }

  return (
    <div className="text-center p-4">
      <h2 className={`text-xl font-bold ${theme === Theme.light ? 'text-gray-700' : 'text-gray-400'}`}>{title}</h2>
      {!text ? null : <p className="text-gray-500">{text}</p>}
    </div>
  );
};

export default NoRecordsFound;
