import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { CSSProperties, useCallback, useMemo, useRef } from 'react';
import { ChevronDownIcon } from '../../icons';
import { Button } from '../button/button';
import { MenuContainer as Menu } from '../menu/menu';
import { MenuItemProps } from '../menu/menu-item';
import { MenuButtonProps } from './menu-button.model';
import './menu-button.scss';

const MenuButton: React.FunctionComponent<MenuButtonProps> = ({
  items = [],
  onSelected,
  focusable = true,
  width = 150,
  disabled = false,
  RTL = false,
  iconColor,
}) => {
  const menuItems = useRef<MenuItemProps[]>(
    items.slice(1).map((item) => ({ id: nanoid(), name: item }))
  );

  const handleChange = useCallback((item: string) => {
    onSelected?.(item);
  }, []);

  const menuButtonClass = useMemo(
    () =>
      classNames('rc-menu-btn-wrapper', {
        'rc-menu-btn-disabled': disabled,
        'rc-menu-btn-rtl': RTL,
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
      <Button label={items[0]} border={false} focusable={focusable} />
      <Menu
        items={menuItems.current}
        focusable={focusable}
        onSelected={handleChange}
        position={menuPosition}
      >
        <span className="rc-menu-btn-icon" role="img">
          <ChevronDownIcon />
        </span>
      </Menu>
    </div>
  );
};

MenuButton.displayName = 'MenuButton';

export { MenuButton };
