import React, { CSSProperties } from 'react';
export interface MenuProps {
  children: React.ReactNode;
  focusable?: boolean;
  id?: string;
  isClosing?: boolean;
  items: MenuItemProps[];
  onClose?: (id?: string) => void;
  onOpen?: (id?: string) => void;
  onSelected?: (val: string) => void;
  position?: 'left' | 'right';
  style?: CSSProperties;
}

export interface MenuItemProps {
  disabled?: boolean;
  id?: string;
  isDivider?: boolean;
  name?: string;
}
