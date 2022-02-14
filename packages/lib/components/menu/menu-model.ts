import React, { CSSProperties, RefObject } from 'react';
import { OverlayModel } from '../common/overlay-model';
export interface MenuProps {
  children: React.ReactNode;
  disabled?: boolean;
  focusable?: boolean;
  id?: string;
  isClosing?: boolean;
  items: MenuItemProps[];
  onClose?: (id?: string) => void;
  onOpen?: (id?: string) => void;
  onSelected?: (val: string) => void;
  position?: 'left' | 'right';
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
  'focusable' | 'items' | 'size'
> & {
  onSelection?: (val: string) => void;
  ref?: RefObject<HTMLUListElement | null>;
} & OverlayModel<null>;
