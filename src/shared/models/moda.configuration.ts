import { ReactNode } from 'react';

export interface ModalConfiguration {
  title: string;
  description?: string;
  footerContent: ReactNode | ReactNode[];
  content: ReactNode;
}
