import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { CSSProperties, useCallback, useMemo, useRef } from "react";
import { Button, Menu } from "..";
import { ChevronDownIcon } from "../../icons";
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

  return (
    <div
      className={menuButtonClass}
      style={{ "--max-width": `${width}px` } as CSSProperties}
    >
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
