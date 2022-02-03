import classNames from 'classnames';
import React, { useCallback, useEffect, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import './menu-item.scss';

export interface MenuItemProps {
  disabled?: boolean;
  focus?: boolean;
  handleSelection?: (name: string) => void;
  isDivider?: boolean;
  name?: string;
}

const MenuItem: React.FunctionComponent<MenuItemProps> = ({
  disabled,
  name,
  isDivider,
  handleSelection,
  focus,
}) => {
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
      setTimeout(() => {
        ref.current?.focus();
      }, 100);
    }
  }, [focus]);

  useFocusNew(ref, handleClick);

  return (
    <li
      className={classNames(['rc-menu-item'], {
        'rc-menu-item-disabled': disabled,
        'rc-menu-item-divider': isDivider,
      })}
      onClick={handleClick}
      ref={onRef}
      role="menuitem"
      tabIndex={0}
    >
      {!isDivider && <span className="rc-menu-item-name">{name}</span>}
    </li>
  );
};

export { MenuItem };
