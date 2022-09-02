import { ChevronDownIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { CSSProperties, useCallback, useMemo, useRef } from 'react';
import { Button } from '../button/button';
import { isDark } from '../common/utils';
import { Menu } from '../menu/menu';
import { MenuItemProps } from '../menu/menu-model';
import { MenuButtonProps } from './menu-button.model';
import styles from './menu-button.module.scss';

const MenuButton: React.FunctionComponent<MenuButtonProps> = ({
  items = [],
  onSelected,
  focusable = true,
  width = 150,
  disabled = false,
  RTL = false,
  iconColor,
  size = 'sm',
}) => {
  const menuItems = useRef<MenuItemProps[]>(
    items.slice(1).map(item => ({
      id: nanoid(),
      name: item,
    }))
  );

  const isDarkMode = useMemo(() => isDark(), []);

  const handleChange = useCallback((item: string) => {
    onSelected?.(item);
  }, []);

  const menuButtonClass = useMemo(
    () =>
      classNames(styles.wrapper, {
        [styles.disabled]: disabled,
        [styles.rtl]: RTL,
        [styles[size]]: true,
        [styles.dark]: isDarkMode,
      }),
    [disabled]
  );

  const menuPosition = useMemo(() => {
    return RTL ? 'left' : 'right';
  }, []);

  const menuStyle = useMemo(() => {
    return {
      '--icon-color': iconColor,
      '--max-width': `${width}px`,
    } as CSSProperties;
  }, []);

  const iconClass = useMemo(
    () =>
      classNames(styles.icon, {
        [styles.dark]: isDarkMode,
      }),
    []
  );

  return (
    <div className={menuButtonClass} style={menuStyle}>
      <Button
        label={items[0]}
        border={false}
        focusable={focusable}
        size={size}
        accent="flat"
        onClick={() => handleChange(items[0])}
      />
      <Menu
        items={menuItems.current}
        focusable={focusable}
        onSelected={handleChange}
        dockPosition={menuPosition}
        size={size}
        gutter={15}
        hideArrow
        leftOffset={10 * (RTL ? -1 : 1)}
      >
        <span className={iconClass} role="img">
          <ChevronDownIcon />
        </span>
      </Menu>
    </div>
  );
};

MenuButton.displayName = 'MenuButton';

export { MenuButton };
