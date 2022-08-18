import { isDark, useFocusNew } from '@common';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
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
      (node: HTMLLIElement) => {
        if (node) {
          ref.current = node;
        }
      },
      [focus]
    );

    const handleClick = useCallback((ev: React.MouseEvent) => {
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

    useFocusNew(ref, handleClick as () => void);

    const isDarkMode = useMemo(() => isDark(), []);

    return (
      <li
        className={classNames(styles.item, {
          [styles.disabled]: disabled,
          [styles.divider]: isDivider,
          [styles.dark]: isDarkMode,
        })}
        onClick={handleClick}
        ref={onRef}
        role="menuitem"
        tabIndex={0}
      >
        {!isDivider && <span className={styles.name}>{name}</span>}
      </li>
    );
  },
  (prev, next) => {
    return prev.disabled === next.disabled && prev.focus === next.focus;
  }
);

MenuItem.displayName = 'MenuItem';

export { MenuItem };
