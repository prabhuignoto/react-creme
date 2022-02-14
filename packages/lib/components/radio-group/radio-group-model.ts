import { CSSProperties } from 'react';

export interface RadioGroupProps<T = string> {
  RTL?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  items: RadioGroupItemProps<T>[];
  layout?: 'row' | 'column';
  onSelected?: (selected: T) => void;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
}

export interface RadioGroupItemProps<U = string> {
  checked?: boolean | null;
  disabled?: boolean;
  id?: string;
  label: string;
  value?: U;
}
