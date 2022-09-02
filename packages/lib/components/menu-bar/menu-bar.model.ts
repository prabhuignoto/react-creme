import { MenuItemProps } from '../menu/menu-model';
import { ReactNode } from 'react';

export type MenuBarProps = {
  RTL?: boolean;
  focusable?: boolean;
  icons?: ReactNode[];
  items: MenuBarItemProps[];
  noUniqueId?: boolean;
  onSelect?: (s: { id?: string; path?: string }) => void;
  size?: 'sm' | 'md' | 'lg';
};

export type MenuBarItemProps = {
  active?: boolean;
  id?: string;
  items: MenuItemProps[];
  name: string;
};

export type MenuBarItemViewProps = Pick<MenuBarProps, 'RTL' | 'size'> & {
  active?: boolean;
  icon?: ReactNode;
  id?: string;
  isMenuOpen?: boolean;
  name: string;
  showIcon?: boolean;
};
