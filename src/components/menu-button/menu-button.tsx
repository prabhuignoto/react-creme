import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { CSSProperties, useCallback, useMemo, useRef } from "react";
import { Button, Menu } from "..";
import { ChevronDownIcon } from "../../icons";
import { MenuItemModel } from "../menu/menu-item";
import { MenuButtonProps } from "./menu-button.model";
import "./menu-button.scss";

const MenuButton: React.FunctionComponent<MenuButtonProps> = ({
  placeholder = "choose an option",
  items = [],
  onSelected,
  selectedValue = "",
  focusable = true,
  position = "left",
  width = 150,
  disabled = false,
}) => {
  const menuItems = useRef<MenuItemModel[]>(
    items.map((item) => ({ name: item, id: nanoid() }))
  );

  const [selectedItem, setSelectedItem] = React.useState<string>(
    placeholder || selectedValue
  );

  const handleChange = useCallback((item: string) => {
    setSelectedItem(item);
    onSelected && onSelected(item);
  }, []);

  const menuButtonClass = useMemo(
    () =>
      classNames("rc-menu-btn-wrapper", {
        "rc-menu-btn-disabled": disabled,
      }),
    [disabled]
  );

  return (
    <div
      className={menuButtonClass}
      style={{ "--max-width": `${width}px` } as CSSProperties}
    >
      <Button label={selectedItem} border={false} focusable={true} />
      <Menu
        items={menuItems.current}
        focusable={focusable}
        onSelected={handleChange}
        position={position}
      >
        <span className="rc-menu-btn-icon" role="img">
          <ChevronDownIcon />
        </span>
      </Menu>
    </div>
  );
};

export { MenuButton };
