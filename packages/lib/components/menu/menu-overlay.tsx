/* eslint-disable react/prop-types */
import classNames from 'classnames';
import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useKeyNavigation } from '../common/effects/useKeyNavigation';
import { withOverlay } from '../common/withOverlay';
import { MenuItem } from './menu-item';
import { MenuOverlayModel } from './menu-model';

export type MenuOverlayProps = Partial<HTMLUListElement> & {
  element: HTMLUListElement | null;
};

const MenuContainer = React.forwardRef<MenuOverlayProps, MenuOverlayModel>(
  ({ items, onSelection, focusable, size }: MenuOverlayModel, ref) => {
    const listRef = useRef<HTMLUListElement | null>(null);

    /**
     * Handle key navigation
     */
    const { selection, setSelection } = useKeyNavigation(
      listRef,
      -1,
      items.length,
      0,
      focusable
    );

    const menuClass = useMemo(
      () =>
        classNames(['rc-menu'], {
          [`rc-menu-${size}`]: size,
        }),
      []
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
  MenuContainer as React.ForwardRefExoticComponent<MenuOverlayModel>,
  {
    backdropColor: 'transparent',
    placement: 'bottom',
  }
);

export { MenuOverlay };
