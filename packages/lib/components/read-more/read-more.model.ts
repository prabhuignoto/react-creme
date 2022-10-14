import { ReactNode } from 'react';

export type ReadMoreProps = {
  RTL?: boolean;
  children: ReactNode;
  linesToShow?: number;
  readMoreText?: string;
  showLessText?: string;
  size?: 'sm' | 'md' | 'lg';
};
