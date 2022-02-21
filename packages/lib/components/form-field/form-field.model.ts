import { ReactNode } from 'react';

export type FormFieldProps = {
  RTL?: boolean;
  border?: boolean;
  debounce?: number;
  disabled?: boolean;
  icon?: ReactNode;
  label?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'error' | 'success';
  value?: string;
};
