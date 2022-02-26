import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { CSSProperties, useCallback, useMemo, useRef } from 'react';
import { ChevronDownIcon } from '../../icons';
import { Button } from '../button/button';
import { Menu } from '../menu/menu';
import { MenuItemProps } from '../menu/menu-item';
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

  const handleChange = useCallback((item: string) => {
    onSelected?.(item);
  }, []);

  const menuButtonClass = useMemo(
    () =>
      classNames(styles.menu_btn_wrapper, {
        [styles.menu_btn_disabled]: disabled,
        [styles.menu_btn_rtl]: RTL,
        [styles[`menu_btn_${size}`]]: true,
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

  return (
    <div className={menuButtonClass} style={menuStyle}>
      <Button
        label={items[0]}
        border={false}
        focusable={focusable}
        size={size}
        onClick={() => handleChange(items[0])}
      />
      <Menu
        items={menuItems.current}
        focusable={focusable}
        onSelected={handleChange}
        dockPosition={menuPosition}
        size={size}
      >
        <span className={styles.menu_btn_icon} role="img">
          <ChevronDownIcon />
        </span>
      </Menu>
    </div>
  );
};

MenuButton.displayName = 'MenuButton';

export { MenuButton };
