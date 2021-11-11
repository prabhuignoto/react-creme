import { nanoid } from "nanoid";
import React, { CSSProperties, useCallback, useRef } from "react";
import { Button, Menu } from "..";
import { ChevronDownIcon } from "../../icons";
import { MenuItemModel } from "../menu/menu-item";
import "./menu-button.scss";

export interface MenuButtonProps {
  label: string;
  items: string[];
  onChange?: (item?: string) => void;
  focusable?: boolean;
  selectedValue?: string;
  position?: "left" | "right";
  width?: number;
}

const MenuButton: React.FunctionComponent<MenuButtonProps> = ({
  label = "Select",
  items = [],
  onChange,
  selectedValue = "",
  focusable = true,
  position = "left",
  width = 150,
}) => {
  const menuItems = useRef<MenuItemModel[]>(
    items.map((item) => ({ name: item, id: nanoid() }))
  );

  const [selectedItem, setSelectedItem] = React.useState<string>(
    label || selectedValue
  );

  const handleChange = useCallback((item: string) => {
    setSelectedItem(item);
    onChange && onChange(item);
  }, []);

  return (
    <div
      className="rc-menu-btn-wrapper"
      style={{ "--max-width": `${width}px` } as CSSProperties}
    >
      <Button label={selectedItem} noBorder focusable={true} />
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
