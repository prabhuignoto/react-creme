import classNames from "classnames";
import React, { CSSProperties, useEffect, useMemo } from "react";
import { List } from "..";
import "./dropdown-menu.scss";
import { DropdownMenuModel } from "./dropdown-model";

const DropDownMenu: React.FunctionComponent<DropdownMenuModel> = ({
  allowMultiSelection,
  enableSearch,
  handleSelection,
  isClosing,
  onClosing,
  open,
  options,
  style: { width, maxMenuHeight },
}: DropdownMenuModel) => {
  // STYLES
  const menuStyle = useMemo(() => {
    return {
      "--menu-width": `${width || 0}px`,
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
        allowMultiSelection={allowMultiSelection}
        borderLess
        enableSearch={enableSearch}
        maxHeight={maxMenuHeight}
      />
    </div>
  );
};

DropDownMenu.displayName = "DropDownMenu";

export { DropDownMenu };
