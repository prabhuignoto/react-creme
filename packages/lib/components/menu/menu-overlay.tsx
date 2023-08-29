/* eslint-disable react/prop-types */
import classNames from 'classnames';
import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useKeyNavigation } from '../common/effects/useKeyNavigation';
import { isDark } from '../common/utils';
import { withOverlay } from '../common/withOverlay';
import { MenuItem } from './menu-item';
import { MenuOverlayModel } from './menu-model';
import styles from './menu.module.scss';

export type MenuOverlayProps = Partial<HTMLUListElement> & {
  element: HTMLUListElement | null;
};

/**
 * MenuContainer Component
 *    @property {MenuItemProps[]} items - The items of the menu.
 *    @property {(name: string) => void} onSelection - Function to handle menu selection.
 *    @property {boolean} focusable - Whether the menu is focusable.
 *    @property {string} size - The size of the menu.
 *    @property {string} dockPosition - The dock position of the menu.
 *    @property {boolean} hideArrow - Whether to hide the arrow of the menu.
 *    @property {boolean} RTL - Whether the menu is right-to-left.
 * @returns {JSX.Element} The MenuContainer component.
 */
const MenuContainer = React.forwardRef<MenuOverlayProps, MenuOverlayModel>(
  (
    {
      items,
      onSelection,
      focusable,
      size = 'sm',
      dockPosition = 'left',
      hideArrow,
      RTL = false,
    }: MenuOverlayModel,
    ref
  ) => {
    const listRef = useRef<HTMLUListElement | null>(null);
    const isDarkMode = useMemo(() => isDark(), []);

    const { selection, setSelection } = useKeyNavigation(
      listRef,
      -1,
      items.length,
      0,
      focusable
    );

    const menuClass = useMemo(
      () =>
        classNames([styles.menu], {
          [styles[size]]: size,
          [styles[dockPosition]]: true,
          [styles.dark]: isDarkMode,
          [styles.arrow]: !hideArrow,
        }),
      [size, dockPosition, isDarkMode, hideArrow]
    );

    useImperativeHandle(ref, () => ({
      element: listRef.current,
      focus: () => {
        listRef.current?.focus();
      },
    }));

    useEffect(() => {
      if (focusable) {
        setSelection(0);
      }
    }, [focusable, setSelection]);

    return (
      <ul className={menuClass} role="menu" ref={listRef} tabIndex={0}>
        {items.map(({ name, id, disabled }, index) => (
          <MenuItem
            name={name}
            disabled={disabled}
            handleSelection={onSelection}
            key={id}
            size={size}
            isDark={isDarkMode}
            RTL={RTL}
            focus={
              focusable
                ? selection > -1
                  ? selection === index
                  : index === 0
                : false
            }
          />
        ))}
      </ul>
    );
  }
);

MenuContainer.displayName = 'Menu';

const MenuOverlay = withOverlay<MenuOverlayModel, null>(
  MenuContainer as unknown as React.ForwardRefExoticComponent<MenuOverlayModel>,
  {
    backdropColor: 'transparent',
    placement: 'bottom',
  }
);

export { MenuOverlay };
