import React, { CSSProperties, RefObject } from 'react';
import { OverlayModel } from '../common/overlay-model';
export interface MenuProps {
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

export type MenuItemProps = Pick<MenuProps, 'disabled'> & {
  disabled?: boolean;
  id?: string;
  isDivider?: boolean;
  name?: string;
};

export type MenuOverlayModel = Pick<
  MenuProps,
  'focusable' | 'items' | 'size' | 'dockPosition' | 'hideArrow' | 'leftOffset'
> & {
  onSelection?: (val: string) => void;
  ref?: RefObject<HTMLUListElement | null>;
} & OverlayModel<null>;
