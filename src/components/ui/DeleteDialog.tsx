import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';
import { useTranslation } from 'react-i18next';

interface DeleteDialogProps {
  title: string;
  description: string;
  open: boolean;
  loading?: boolean;
  onDelete: () => void;
  onOpenChange: (value: boolean) => void;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  title,
  description,
  open,
  onDelete,
  onOpenChange,
  loading,
}) => {
  const { t } = useTranslation();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete()}>
            {loading ? (
              <i className="animate-spin ri-loader-4-line"></i>
            ) : (
              t('Actions.Delete')
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
