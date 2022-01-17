import { CSSProperties } from 'react';

export interface CheckboxProps {
  RTL?: boolean;
  autoHeight?: boolean;
  border?: boolean;
  checkBoxStyle?: 'square' | 'round';
  disabled?: boolean;
  focusIcon?: boolean;
  focusable?: boolean;
  height?: number;
  id?: string;
  isChecked?: boolean;
  label: string;
  noHoverStyle?: boolean;
  noUniqueId?: boolean;
  onChange?: (id: string, name: string, selected: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
}
