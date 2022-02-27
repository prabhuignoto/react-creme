import classNames from 'classnames';
import React, { useCallback, useEffect, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import styles from './menu-item.module.scss';

export interface MenuItemProps {
  disabled?: boolean;
  focus?: boolean;
  handleSelection?: (name: string) => void;
  isDivider?: boolean;
  name?: string;
}

const MenuItem: React.FunctionComponent<MenuItemProps> = React.memo(
  ({ disabled, name, isDivider, handleSelection, focus }) => {
    const ref = useRef<HTMLLIElement | null>(null);

    const onRef = useCallback(
      node => {
        if (node) {
          ref.current = node;
        }
      },
      [focus]
    );

    const handleClick = useCallback(ev => {
      ev.preventDefault();
      ev.stopPropagation();
      if (!disabled && name) {
        handleSelection?.(name);
      }
    }, []);

    useEffect(() => {
      if (focus) {
        ref.current?.focus();
      }
    }, [focus]);

    useFocusNew(ref, handleClick);

    return (
      <li
        className={classNames(styles.menu_item, {
          [styles.menu_item_disabled]: disabled,
          [styles.menu_item_divider]: isDivider,
        })}
        onClick={handleClick}
        ref={onRef}
        role="menuitem"
        tabIndex={0}
      >
        {!isDivider && <span className={styles.menu_item_name}>{name}</span>}
      </li>
    );
  },
  (prev, next) => {
    return prev.disabled === next.disabled && prev.focus === next.focus;
  }
);

MenuItem.displayName = 'MenuItem';

export { MenuItem };
