import { CSSProperties } from 'react';

export interface RadioGroupProps {
  RTL?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  items: RadioGroupItemProps[];
  layout?: 'row' | 'column';
  onSelected?: (selected: string) => void;
  style?: CSSProperties;
}

export interface RadioGroupItemProps {
  checked?: boolean | null;
  disabled?: boolean;
  id?: string;
  label: string;
  value?: string;
}
