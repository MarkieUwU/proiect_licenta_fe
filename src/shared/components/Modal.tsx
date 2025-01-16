import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ModalConfiguration } from '@/shared/models/moda.configuration';

interface ModalProps {
  trigger?: ReactNode;
  configuration: ModalConfiguration;
  open: boolean;
  onChangeOpen: (value: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({
  trigger,
  configuration,
  open,
  onChangeOpen,
}) => {
  return (
    <Dialog open={open} onOpenChange={(value) => onChangeOpen(value)}>
      {trigger ? (
        <DialogTrigger asChild className="w-full">
          {trigger}
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>{configuration.title}</DialogTitle>
          {configuration.description && (
            <DialogDescription>{configuration.description}</DialogDescription>
          )}
        </DialogHeader>
        {configuration.content}
        <DialogFooter>{configuration.footerContent}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
