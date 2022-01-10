import classNames from "classnames";
import React, { CSSProperties, useEffect, useMemo } from "react";
import { List } from "../list/list";
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
  virtualize,
  RTL,
}: DropdownMenuModel) => {
  // STYLES
  const menuStyle = useMemo(() => {
    return {
      "--menu-width": `${width || 0}px`,
      "--menu-max-height": `${maxMenuHeight || 0}px`,
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
      onClosing?.();
    }
  }, [isClosing]);

  return (
    <div className={menuClass} style={menuStyle}>
      <List
        options={options}
        onSelection={handleSelection}
        allowMultiSelection={allowMultiSelection}
        border={false}
        enableSearch={enableSearch}
        maxHeight={maxMenuHeight}
        virtualized={virtualize}
        RTL={RTL}
      />
    </div>
  );
};

DropDownMenu.displayName = "DropDownMenu";

export { DropDownMenu };
