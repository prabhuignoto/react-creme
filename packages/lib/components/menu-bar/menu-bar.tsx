import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Menu } from '..';
import useOnClickOutside from '../common/effects/useOnClickOutside';
import { isDark } from '../common/utils';
import { MenuBarItem } from './item';
import { MenuBarProps } from './menu-bar.model';
import styles from './menu-bar.module.scss';

const MenuBar: FunctionComponent<MenuBarProps> = ({
  items,
  RTL = false,
  onSelect,
  noUniqueId = false,
  size = 'sm',
  icons = [],
  focusable = true,
}) => {
  const isDarkMode = useMemo(() => isDark(), []);
  const menuBarClass = useMemo(
    () =>
      classNames(styles.wrapper, [
        RTL ? styles.right_aligned : styles.left_aligned,
        isDarkMode ? styles.dark : '',
      ]),
    [RTL, isDarkMode]
  );

  // Use a callback for click outside handler for better performance
  const handleClickOutside = useCallback(() => {
    setMenuItems(prev => prev.map(item => ({ ...item, active: false })));
  }, []);

  const { onRef } = useOnClickOutside(handleClickOutside);

  // Initialize items state with useMemo for initialization
  const initialItems = useMemo(
    () =>
      items.map(item => ({
        ...item,
        active: false,
        id: noUniqueId ? item.id : nanoid(),
        isMenuOpen: false,
      })),
    [items, noUniqueId]
  );

  const [menuItems, setMenuItems] = useState(initialItems);

  const handleOnOpen = useCallback((id?: string) => {
    setMenuItems(prev =>
      prev.map(item => ({
        ...item,
        active: item.id === id,
        isMenuOpen: item.id === id,
      }))
    );
  }, []);

  const handleSelection = useCallback(
    (parentId?: string, parentName?: string, child?: string) => {
      onSelect?.({
        id: parentId,
        path: parentName + '/' + child,
      });
    },
    [onSelect]
  );

  const handleOnClose = useCallback((id?: string) => {
    setMenuItems(prev =>
      prev.map(item => ({
        ...item,
        isMenuOpen: item.id === id ? false : item.isMenuOpen,
      }))
    );
  }, []);

  const hasIcons = useMemo(() => !!icons.length, [icons.length]);

  return (
    <ul className={menuBarClass} ref={onRef}>
      {menuItems.map((item, index) => (
        <Menu
          items={item.items}
          dockPosition={RTL ? 'right' : 'left'}
          key={item.id}
          hideArrow
          gutter={6}
          size={size}
          onOpen={() => handleOnOpen(item.id)}
          onClose={() => handleOnClose(item.id)}
          onSelected={name => handleSelection(item.id, item.name, name)}
          focusable={focusable}
          RTL={RTL}
        >
          <MenuBarItem
            active={item.active}
            icon={icons[index]}
            RTL={RTL}
            name={item.name}
            size={size}
            isMenuOpen={item.isMenuOpen}
            showIcon={hasIcons}
            key={item.id}
          />
        </Menu>
      ))}
    </ul>
  );
};

// Memoize the MenuBar component for better performance
const MemoizedMenuBar = React.memo(MenuBar);
MemoizedMenuBar.displayName = 'MenuBar';

export { MemoizedMenuBar as MenuBar };
