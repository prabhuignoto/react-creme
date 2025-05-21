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

    /**
     * Handle key navigation
     */
    const { selection, setSelection } = useKeyNavigation(
      listRef as React.RefObject<HTMLElement>,
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
      [isDarkMode]
    );

    /**
     * Imperative handle for managing focus
     */
    useImperativeHandle(ref, () => {
      return {
        element: listRef.current,
        focus: () => {
          listRef.current?.focus();
        },
      };
    });

    /**
     * Sets the focus on the first item on load
     */
    useEffect(() => {
      if (focusable) {
        setSelection(0);
      }
    }, []);

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
