import classNames from "classnames";
import React, { CSSProperties, useEffect, useMemo, useRef } from "react";
import { List } from "..";
import "./dropdown-menu.scss";
import { DropdownMenuModel } from "./dropdown-model";

const DropDownMenu: React.FunctionComponent<DropdownMenuModel> = React.memo(
  ({
    options,
    handleSelection,
    style: { top, width, maxMenuHeight },
    open,
    allowMultipleSelection,
  }: DropdownMenuModel) => {
    const firstRender = useRef(true);

    // REF
    const menuRef = useRef<HTMLDivElement>(null);

    // EFFECTS
    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false;
      }
    }, []);

    useEffect(() => {
      setTimeout(() => {
        if (menuRef.current) {
          menuRef.current.focus();
        }
      }, 200);
    }, [open]);

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
          !firstRender.current && {
            "rc-dropdown-menu-open": open,
            "rc-dropdown-menu-close": !open,
          },
        ]),
      [open]
    );

    return (
      <div className={menuClass} style={menuStyle} tabIndex={0} ref={menuRef}>
        <List
          options={options}
          onSelection={handleSelection}
          allowMultipleSelection={allowMultipleSelection}
        />
      </div>
    );
  },
  (prev, cur) => prev.open === cur.open
);

DropDownMenu.displayName = "DropDownMenu";

export { DropDownMenu };
