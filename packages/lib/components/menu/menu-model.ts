import React, { CSSProperties, RefObject } from 'react';
import { OverlayModel } from '../common/overlay-model';
export interface MenuProps {
  RTL?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  dockPosition?: 'left' | 'right' | 'center';
  focusable?: boolean;
  gutter?: number;
  hideArrow?: boolean;
  id?: string;
  isClosing?: boolean;
  items: MenuItemProps[];
  leftOffset?: number;
  onClose?: (id?: string) => void;
  onOpen?: (id?: string) => void;
  onSelected?: (val: string) => void;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
}

export type MenuItemProps = Pick<MenuProps, 'disabled' | 'size' | 'id'> & {
  focus?: boolean;
  handleSelection?: (name: string) => void;
  isDark?: boolean;
  isDivider?: boolean;
  name?: string;
};

export type MenuOverlayModel = Pick<
  MenuProps,
  | 'focusable'
  | 'items'
  | 'size'
  | 'dockPosition'
  | 'hideArrow'
  | 'leftOffset'
  | 'RTL'
> & {
  onSelection?: (val: string) => void;
  ref?: RefObject<HTMLUListElement | null>;
} & OverlayModel<null>;
