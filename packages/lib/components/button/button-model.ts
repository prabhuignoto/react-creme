import React, { CSSProperties } from 'react';

export interface ButtonProps {
  border?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  focusable?: boolean;
  label?: string;
  onClick?: () => void;
  primary?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  type?: 'primary' | 'default' | 'danger' | 'icon' | 'progress';
}
