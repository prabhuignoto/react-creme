import { ReactNode } from 'react';

export type FormFieldProps = {
  RTL?: boolean;
  border?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'select' | 'radio-group';
};
