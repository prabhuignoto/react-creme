import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import styles from './menu-item.module.scss';
import { MenuItemProps } from './menu-model';

const MenuItem: React.FunctionComponent<MenuItemProps> = React.memo(
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

    const onRef = useCallback(
      (node: HTMLLIElement) => {
        if (node) {
          ref.current = node;
        }
      },
      [focus]
    );

    const handleClick = useCallback(
      (ev?: React.MouseEvent) => {
        ev?.preventDefault();
        ev?.stopPropagation();
        if (!disabled && name) {
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
      [isDark]
    );

    useEffect(() => {
      if (focus) {
        ref.current?.focus();
      }
    }, [focus]);

    useFocusNew(ref as React.RefObject<HTMLElement>, handleClick as () => void);

    return (
      <li
        className={menuItemClass}
        onClick={handleClick}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        ref={onRef}
        role="menuitem" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
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
