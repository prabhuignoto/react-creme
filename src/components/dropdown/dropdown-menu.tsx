import classNames from "classnames";
import React, { CSSProperties, useEffect, useMemo } from "react";
import { List } from "..";
import "./dropdown-menu.scss";
import { DropdownMenuModel } from "./dropdown-model";

const DropDownMenu: React.FunctionComponent<DropdownMenuModel> = ({
  options,
  handleSelection,
  style: { top, width, maxMenuHeight },
  open,
  allowMultipleSelection,
  isClosing,
  onClosing,
}: DropdownMenuModel) => {
  // STYLES
  const menuStyle = useMemo(() => {
    return {
      "--menu-top": `${top || 0}px`,
      "--menu-width": `${width || 0}px`,
      "--max-height": `${maxMenuHeight}px`,
    } as CSSProperties;
  }, [top, width]);

  const menuClass = useMemo(
    () =>
      classNames([
        "rc-dropdown-menu-container",
        {
          "rc-dropdown-menu-open": open && !isClosing,
          "rc-dropdown-menu-close": !open || isClosing,
        },
      ]),
    [open, isClosing]
  );

  useEffect(() => {
    if (isClosing) {
      onClosing && onClosing();
    }
  }, [isClosing]);

  return (
    <div className={menuClass} style={menuStyle}>
      <List
        options={options}
        onSelection={handleSelection}
        allowMultipleSelection={allowMultipleSelection}
        borderLess
      />
    </div>
  );
};

DropDownMenu.displayName = "DropDownMenu";

export { DropDownMenu };
