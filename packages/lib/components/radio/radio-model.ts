import { CSSProperties } from 'react';

export interface RadioProps {
  RTL?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  fullWidth?: boolean;
  id?: string;
  isChecked?: boolean | null;
  isControlled?: boolean;
  label?: string;
  onChange?: (state: {
    id?: string;
    selected?: boolean;
    value?: string;
  }) => void;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  value?: string;
  withGroup?: boolean;
}
