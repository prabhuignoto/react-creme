/* eslint-disable react/prop-types */
import classNames from 'classnames';
import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useKeyNavigation } from '../common/effects/useKeyNavigation';
import { withOverlay } from '../common/withOverlay';
import { MenuItem } from './menu-item';
import { MenuOverlayModel } from './menu-model';

const MenuContainer = React.forwardRef<HTMLUListElement, MenuOverlayModel>(
  ({ items, onSelection, focusable }: MenuOverlayModel, ref) => {
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

    const menuClass = useMemo(() => classNames(['rc-menu'], {}), []);

    /**
     * Imperative handle for managing focus
     */
    useImperativeHandle(ref, () => {
      return {
        focus: () => {
          listRef.current?.focus();
        },
      } as HTMLUListElement;
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

const MenuOverlay = withOverlay<MenuOverlayModel>(
  MenuContainer as React.ForwardRefExoticComponent<MenuOverlayModel>,
  {
    backdropColor: 'transparent',
    placement: 'bottom',
  }
);

export { MenuOverlay };
