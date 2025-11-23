import { MenuItemProps } from '../menu/menu-model';
import { ReactNode } from 'react';

/**
 * Props for the MenuBar component
 */
export type MenuBarProps = {
  /** Enable RTL (right-to-left) layout */
  RTL?: boolean;
  /** Enable keyboard navigation and focus management */
  focusable?: boolean;
  /** Array of icon nodes to display next to each menu item (must match items length) */
  icons?: ReactNode[];
  /** Array of menu items with their structure and sub-items */
  items: MenuBarItemProps[];
  /** Use provided item IDs instead of auto-generating with nanoid */
  noUniqueId?: boolean;
  /** Callback fired when a menu item is selected */
  onSelect?: (s: { id?: string; path?: string }) => void;
  /** Size variant: 'sm' | 'md' | 'lg' */
  size?: 'sm' | 'md' | 'lg';
};

/**
 * Individual menu item data structure
 */
export type MenuBarItemProps = {
  /** Whether this item is currently active */
  active?: boolean;
  /** Unique identifier for the item */
  id?: string;
  /** Sub-menu items for this menu bar item */
  items: MenuItemProps[];
  /** Display name of the menu item */
  name: string;
  /** Whether this item is disabled (visually distinct, non-interactive) */
  disabled?: boolean;
};

/**
 * Props for the MenuBarItem component (internal display component)
 */
export type MenuBarItemViewProps = Pick<MenuBarProps, 'RTL' | 'size'> & {
  /** Whether this item is currently active */
  active?: boolean;
  /** Whether this item is disabled (non-interactive, visually distinct) */
  disabled?: boolean;
  /** Icon to display next to the item name */
  icon?: ReactNode;
  /** Unique identifier for the item */
  id?: string;
  /** Whether the submenu is currently open */
  isMenuOpen?: boolean;
  /** Display name of the menu item */
  name: string;
  /** Whether to show the icon */
  showIcon?: boolean;
  /** ARIA attribute for marking the current/active page */
  'aria-current'?: 'page' | undefined;
};
