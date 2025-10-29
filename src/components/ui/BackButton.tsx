import React from 'react';
import { useRouter } from '@tanstack/react-router';
import { Button, ButtonProps } from './button';
import { ChevronLeft, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BackButtonProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  customText?: string;
  customAction?: () => void;
  className?: string;
  icon?: 'chevron' | 'arrow';
  fallbackRoute?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  variant = 'ghost',
  size = 'md',
  showText = true,
  customText,
  customAction,
  className = '',
  icon = 'chevron',
  fallbackRoute = '/'
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleBack = () => {
    if (customAction) {
      customAction();
    } else {
      try {
        if (window.history.length > 1) {
          router.history.back();
        } else {
          router.navigate({ to: fallbackRoute });
        }
      } catch (error) {
        router.navigate({ to: fallbackRoute });
      }
    }
  };

  const getIcon = () => {
    switch (icon) {
      case 'arrow':
        return <ArrowLeft className="h-4 w-4" />;
      case 'chevron':
      default:
        return <ChevronLeft className="h-4 w-4" />;
    }
  };

  const getButtonText = () => {
    if (customText) return customText;
    return t('Common.Back');
  };

  return (
    <Button
      variant={variant}
      size={size as ButtonProps['size']}
      onClick={handleBack}
      className={`gap-2 ${className}`}
    >
      {getIcon()}
      {showText && <span>{getButtonText()}</span>}
    </Button>
  );
};

export default BackButton;
