import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { CSSProperties, useCallback, useMemo, useRef } from "react";
import { ChevronDownIcon } from "../../icons";
import { Button } from "../button/button";
import { MenuContainer as Menu } from "../menu/menu";
import { MenuItemModel } from "../menu/menu-item";
import { MenuButtonProps } from "./menu-button.model";
import "./menu-button.scss";

const MenuButton: React.FunctionComponent<MenuButtonProps> = ({
  items = [],
  onSelected,
  focusable = false,
  width = 150,
  disabled = false,
  RTL = false,
  iconColor,
}) => {
  const menuItems = useRef<MenuItemModel[]>(
    items.slice(1).map((item) => ({ name: item, id: nanoid() }))
  );

  const handleChange = useCallback((item: string) => {
    onSelected?.(item);
  }, []);

  const menuButtonClass = useMemo(
    () =>
      classNames("rc-menu-btn-wrapper", {
        "rc-menu-btn-disabled": disabled,
        "rc-menu-btn-rtl": RTL,
      }),
    [disabled]
  );

  const menuPosition = useMemo(() => {
    return RTL ? "left" : "right";
  }, []);

  const menuStyle = useMemo(() => {
    return {
      "--max-width": `${width}px`,
      "--icon-color": iconColor,
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

export { MenuButton };
