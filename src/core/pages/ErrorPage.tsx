// src/pages/ErrorPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorPageProps {
  title?: string;
  text?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ title, text }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Components.ErrorPage' });

  return (
    <Card className="w-[450px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle className="text-center text-3xl">
          {title ?? t('Title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center text-lg">
        {text ?? t('Text')}
      </CardContent>
    </Card>
  );
};
