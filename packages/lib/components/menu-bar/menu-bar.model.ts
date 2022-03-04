import { MenuItemProps } from '@components/menu/menu-item';

export type MenuBarItemProps = {
  active?: boolean;
  id?: string;
  items: MenuItemProps[];
  name: string;
};

export type MenuBarProps = {
  RTL?: boolean;
  items: MenuBarItemProps[];
  noUniqueId?: boolean;
  onSelect?: (s: { id?: string; path?: string }) => void;
};
