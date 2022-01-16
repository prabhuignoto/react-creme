import classNames from "classnames";
import React from "react";
import "./menu-item.scss";

export interface MenuItemModel {
  disabled?: boolean;
  handleSelection?: (name: string) => void;
  isDivider?: boolean;
  name?: string;
}

const MenuItem: React.FunctionComponent<MenuItemModel> = ({
  disabled,
  name,
  isDivider,
  handleSelection,
}) => {
  return (
    <li
      className={classNames(["rc-menu-item"], {
        "rc-menu-item-disabled": disabled,
        "rc-menu-item-divider": isDivider,
      })}
      onClick={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (!disabled && name) {
          handleSelection?.(name);
        }
      }}
      role="menuitem"
    >
      {!isDivider && <span className="rc-menu-item-name">{name}</span>}
    </li>
  );
};

export { MenuItem };
