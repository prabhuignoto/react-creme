import { MenuItemProps } from '@components/menu/menu-item';
import { ReactNode } from 'react';

export type MenuBarItemProps = {
  active?: boolean;
  id?: string;
  isMenuOpen?: boolean;
  items: MenuItemProps[];
  name: string;
};

export type MenuBarProps = {
  RTL?: boolean;
  focusable?: boolean;
  icons?: ReactNode[];
  items: MenuBarItemProps[];
  noUniqueId?: boolean;
  onSelect?: (s: { id?: string; path?: string }) => void;
  size?: 'sm' | 'md' | 'lg';
};
