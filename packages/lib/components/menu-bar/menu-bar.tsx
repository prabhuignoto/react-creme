import classNames from 'classnames';
import { FunctionComponent, useCallback, useMemo, useRef, useState } from 'react';
import { Menu } from '..';
import useOnClickOutside from '../common/effects/useOnClickOutside';
import { isDark } from '../common/utils';
import { useMenuBarKeyboard } from '../../hooks/useMenuBarKeyboard';
import { MenuBarItem } from './item';
import { MenuBarProps } from './menu-bar.model';
import styles from './menu-bar.module.scss';

const MenuBar: FunctionComponent<MenuBarProps> = ({
  items = [],
  RTL = false,
  onSelect,
  noUniqueId = false,
  size = 'sm',
  icons = [],
  focusable = true,
}) => {
  const isDarkMode = isDark();
  const menuBarClass = useMemo(
    () =>
      classNames(styles.wrapper, [
        RTL ? styles.right_aligned : styles.left_aligned,
        isDarkMode ? styles.dark : '',
      ]),
    [RTL, isDarkMode]
  );

  const menuBarRef = useRef<HTMLUListElement | null>(null);
  const [menuStates, setMenuStates] = useState<Map<string, { active: boolean; isMenuOpen: boolean }>>(
    new Map()
  );

  const _items = useMemo(() => {
    return items.map((item, index) => {
      const itemId = noUniqueId ? (item.id || `menu-bar-item-${index}`) : `menu-bar-item-${index}`;
      const state = menuStates.get(itemId) || { active: false, isMenuOpen: false };

      return {
        active: state.active,
        ...item,
        id: itemId,
        isMenuOpen: state.isMenuOpen,
      };
    });
  }, [items, noUniqueId, menuStates]);

  const handleCloseAllMenus = useCallback(() => {
    setMenuStates(prev => {
      const updated = new Map(prev);
      updated.forEach((state, key) => {
        updated.set(key, { ...state, active: false });
      });
      return updated;
    });
  }, []);

  const handleOnOpen = useCallback((id?: string) => {
    setMenuStates(prev => {
      const updated = new Map(prev);
      updated.forEach((state, key) => {
        updated.set(key, {
          ...state,
          active: key === id,
          isMenuOpen: key === id,
        });
      });
      return updated;
    });
  }, []);

  const { ref: clickOutsideRef } = useOnClickOutside(handleCloseAllMenus);

  // Merge refs
  const setMergedRef = useCallback(
    (node: HTMLUListElement | null) => {
      menuBarRef.current = node;
      if (clickOutsideRef && clickOutsideRef.current !== null) {
        clickOutsideRef.current = node as HTMLDivElement | null;
      }
    },
    [clickOutsideRef]
  );

  // Keyboard navigation
  useMenuBarKeyboard({
    RTL,
    enabled: focusable,
    getItemId: index => _items[index]?.id,
    itemCount: _items.length,
    onOpenMenu: handleOnOpen,
    ref: menuBarRef,
  });

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
    setMenuStates(prev => {
      const updated = new Map(prev);
      const currentState = updated.get(id || '') || { active: false, isMenuOpen: false };
      updated.set(id || '', { ...currentState, isMenuOpen: false });
      return updated;
    });
  }, []);

  const hasIcons = useMemo(() => !!icons.length, [icons]);

  return (
    <ul
      className={menuBarClass}
      ref={setMergedRef}
      role="menubar"
      aria-label="Navigation menu"
    >
      {_items.map((item, index) => (
        <Menu
          items={item.items}
          dockPosition={RTL ? 'right' : 'left'}
          key={item.id}
          hideArrow
          gutter={6}
          size={size}
          onOpen={() => !item.disabled && handleOnOpen(item.id)}
          onClose={() => handleOnClose(item.id)}
          onSelected={name => handleSelection(item.id, item.name, name)}
          focusable={focusable && !item.disabled}
          RTL={RTL}
          id={`menu-${item.id}`}
        >
          <MenuBarItem
            id={item.id}
            active={item.active}
            icon={icons[index]}
            RTL={RTL}
            name={item.name}
            size={size}
            isMenuOpen={item.isMenuOpen}
            showIcon={hasIcons}
            key={item.id}
            aria-current={item.active ? 'page' : undefined}
            disabled={item.disabled}
          />
        </Menu>
      ))}
    </ul>
  );
};

MenuBar.displayName = 'MenuBar';

export { MenuBar };
