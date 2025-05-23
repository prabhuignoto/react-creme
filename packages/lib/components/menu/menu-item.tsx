import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import styles from './menu-item.module.scss';
import { MenuItemProps } from './menu-model';

const MenuItem: React.FC<MenuItemProps> = React.memo(
  ({
    disabled,
    name,
    isDivider,
    handleSelection,
    focus,
    size = 'sm',
    isDark,
    RTL = false,
  }) => {
    const ref = useRef<HTMLLIElement | null>(null);

    const onRef = useCallback((node: HTMLLIElement) => {
      if (node) {
        ref.current = node;
      }
    }, []);

    const handleClick = useCallback(
      (ev: React.MouseEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (!disabled && name) {
          handleSelection?.(name);
        }
      },
      [disabled, name, handleSelection]
    );

    const handleKeyDown = useCallback(
      (ev: React.KeyboardEvent) => {
        if ((ev.key === 'Enter' || ev.key === ' ') && !disabled && name) {
          ev.preventDefault();
          ev.stopPropagation();
          handleSelection?.(name);
        }
      },
      [disabled, name, handleSelection]
    );

    const menuItemClass = useMemo(
      () =>
        classNames(styles.item, {
          [styles.disabled]: disabled,
          [styles.divider]: isDivider,
          [styles.dark]: isDark,
          [styles[size]]: true,
          [styles.rtl]: RTL,
        }),
      [disabled, isDivider, isDark, size, RTL]
    );

    useEffect(() => {
      if (focus) {
        ref.current?.focus();
      }
    }, [focus]);

    useFocusNew(ref as React.RefObject<HTMLElement>, handleClick as () => void);

    if (isDivider) {
      return (
        <li className={menuItemClass} role="separator" aria-hidden="true" />
      );
    }

    return (
      <li
        className={menuItemClass}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={onRef}
        role="menuitem"
        tabIndex={0}
        aria-disabled={disabled}
      >
        <span className={styles.name}>{name}</span>
      </li>
    );
  },
  (prev, next) => {
    // More comprehensive memoization check
    return (
      prev.disabled === next.disabled &&
      prev.focus === next.focus &&
      prev.name === next.name &&
      prev.isDivider === next.isDivider &&
      prev.size === next.size &&
      prev.isDark === next.isDark &&
      prev.RTL === next.RTL
    );
  }
);

MenuItem.displayName = 'MenuItem';

export { MenuItem };
