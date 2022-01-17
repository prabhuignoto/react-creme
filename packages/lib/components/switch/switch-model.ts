import { CSSProperties } from 'react';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  label?: string;
  labelOutside?: boolean;
  onChange?: (val: boolean) => void;
  showCheckIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  width?: number;
}
