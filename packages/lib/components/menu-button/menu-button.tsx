import { ChevronDownIcon } from '@icons';
import cx from 'classnames';
import { nanoid } from 'nanoid';
import React, { CSSProperties, useCallback, useMemo, useRef } from 'react';
import { isDark } from '../common/utils';
import { Menu } from '../menu/menu';
import { MenuButtonProps } from './menu-button.model';
import styles from './menu-button.module.scss';

const MenuButton: React.FunctionComponent<MenuButtonProps> = ({
  items = [],
  onSelected,
  width = 150,
  disabled = false,
  RTL = false,
  iconColor,
  size = 'sm',
}) => {
  const isDarkMode = useMemo(() => isDark(), []);
  const buttonRef = useRef<HTMLDivElement>(null);

  const menuItems = useMemo(
    () =>
      items.slice(1).map(item => ({
        id: nanoid(),
        name: item,
      })),
    [items]
  );

  const handleMenuSelection = useCallback(
    (item: string) => {
      onSelected?.(item);
      // Return focus to button after selection
      setTimeout(() => {
        buttonRef.current?.focus();
      }, 0);
    },
    [onSelected]
  );

  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    // Use keyup instead of keydown to naturally prevent repeated events
    // keyup only fires once when the key is released
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      // Let the click event handle the toggle (via bubbling to Menu)
      buttonRef.current?.click();
    }
  }, []);

  const menuButtonClass = useMemo(
    () =>
      cx(styles.wrapper, {
        [styles.disabled]: disabled,
        [styles.rtl]: RTL,
        [styles[size]]: true,
        [styles.dark]: isDarkMode,
      }),
    [disabled, RTL, size, isDarkMode]
  );

  const menuPosition = useMemo(() => {
    return RTL ? 'left' : 'right';
  }, [RTL]);

  const menuStyle = useMemo(() => {
    return {
      '--icon-color': iconColor,
      '--max-width': `${width}px`,
    } as CSSProperties;
  }, [iconColor, width]);

  const iconClass = useMemo(
    () =>
      cx(styles.icon, {
        [styles.dark]: isDarkMode,
      }),
    [isDarkMode]
  );

  const labelClass = useMemo(
    () => cx(styles.label, { [styles.dark]: isDarkMode }, styles[size]),
    [isDarkMode, size]
  );

  return (
    <div className={menuButtonClass} style={menuStyle}>
      <Menu
        items={menuItems}
        focusable={false}
        onSelected={handleMenuSelection}
        dockPosition={menuPosition}
        size={size}
        gutter={15}
        hideArrow
        leftOffset={10 * (RTL ? -1 : 1)}
        disabled={disabled}
      >
        <div
          role="button"
          ref={buttonRef}
          className={styles.button}
          aria-label={items[0]}
          aria-haspopup="menu"
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyUp={handleKeyUp}
        >
          <span className={labelClass}>{items[0]}</span>
          <span className={iconClass} role="img" aria-hidden="true">
            <ChevronDownIcon />
          </span>
        </div>
      </Menu>
    </div>
  );
};

MenuButton.displayName = 'MenuButton';

export { MenuButton };
