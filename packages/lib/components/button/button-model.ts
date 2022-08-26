import React, { CSSProperties, KeyboardEvent, MouseEvent } from 'react';

export interface ButtonProps {
  accent?: 'flat' | 'rounded';
  border?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  focusable?: boolean;
  label?: string;
  onClick?: (ev?: MouseEvent | KeyboardEvent) => void;
  primary?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  type?: 'primary' | 'default' | 'danger' | 'icon' | 'progress';
}
