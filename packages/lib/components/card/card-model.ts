import { ReactNode } from 'react';

export interface CardProps {
  alignFooter?: 'left' | 'center' | 'right';
  alignHeader?: 'left' | 'center' | 'right';
  border?: boolean;
  children?: ReactNode | ReactNode[];
  footer?: ReactNode;
  header?: ReactNode;
  height?: number;
  shadow?: boolean;
}
