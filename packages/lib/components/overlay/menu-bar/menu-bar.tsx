import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { Menu } from '..';
import useOnClickOutside from '../../common/effects/useOnClickOutside';
import { isDark } from '../../common/utils';
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
    []
  );

  const { onRef } = useOnClickOutside(() => {
    setItems(prev => prev.map(item => ({ ...item, active: false })));
  });

  const [_items, setItems] = useState(
    items.map(item => ({
      ...item,
      active: false,
      id: noUniqueId ? item.id : nanoid(),
      isMenuOpen: false,
    }))
  );

  const handleOnOpen = useCallback((id?: string) => {
    setItems(prev =>
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
    []
  );

  const handleOnClose = useCallback((id?: string) => {
    setItems(prev =>
      prev.map(item => ({
        ...item,
        isMenuOpen: item.id === id ? false : item.isMenuOpen,
      }))
    );
  }, []);

  const hasIcons = useMemo(() => !!icons.length, []);

  return (
    <ul className={menuBarClass} ref={onRef}>
      {_items.map((item, index) => (
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

MenuBar.displayName = 'MenuBar';

export { MenuBar };
