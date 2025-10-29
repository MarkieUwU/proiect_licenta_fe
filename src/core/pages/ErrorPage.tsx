// src/pages/ErrorPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { useTranslation } from 'react-i18next';
import BackButton from '@/components/ui/BackButton';
import { useRouter } from '@tanstack/react-router';

interface ErrorPageProps {
  title?: string;
  text?: string;
  fallbackRoute?: string;
  onReset?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ title, text, fallbackRoute, onReset }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Components.ErrorPage' });
  const router = useRouter();
  
  // Determine fallback route based on current path
  const getFallbackRoute = () => {
    if (fallbackRoute) return fallbackRoute;
    
    const currentPath = router.state.location.pathname;
    if (currentPath.startsWith('/admin')) {
      return '/admin/dashboard';
    }
    return '/';
  };

  const handleBack = () => {
    if (onReset) {
      onReset();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[500px]">
        <div className="mb-4">
          <BackButton
            variant='outline'
            size='sm'
            className='text-muted-foreground hover:text-foreground'
            fallbackRoute={getFallbackRoute()}
            customAction={handleBack}
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl">
              {title ?? t('Title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-lg">
            {text ?? t('Text')}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
