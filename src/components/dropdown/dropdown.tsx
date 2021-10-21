import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { withOverlay } from "../common/withOverlay";
import { DropDownMenu } from "./dropdown-menu";
import { DropdownMenuModel, DropdownModel, Option } from "./dropdown-model";
import "./dropdown.scss";

const DropdownMenuOverlay = withOverlay<DropdownMenuModel>(DropDownMenu, {
  disableBackdrop: true,
});

const Dropdown: React.FunctionComponent<DropdownModel> = React.memo(
  ({
    allowMultipleSelection,
    maxMenuHeight = 200,
    onSelected,
    options = [],
    placeholder = "Choose an option...",
  }: DropdownModel) => {
    // STATES
    const [dropdownOptions, setDropdownOptions] = useState(
      options.map((option) => ({
        id: nanoid(),
        ...option,
        selected: false,
        visible: true,
      }))
    );
    const [value, setValue] = useState(placeholder);
    const [showMenu, setShowMenu] = useState(false);
    const [menuClosing, setMenuClosing] = useState(false);

    // REFS
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);

    // HANDLERS
    const handleSelection = useCallback((selected: Option[]) => {
      let _value: string | string[];

      if (allowMultipleSelection) {
        _value = selected.map((opt) => opt.value).join(",");
        const selectedIds = selected.map((item) => item.id);

        setValue(_value);
        setDropdownOptions((options) =>
          options.map((option) => ({
            ...option,
            selected: selectedIds.indexOf(option.id) > -1,
          }))
        );
      } else {
        const { id, value } = selected[0];
        _value = value;
        setValue(value);
        setDropdownOptions((options) =>
          options.map((option) => ({
            ...option,
            selected: option.id === id,
          }))
        );
        setShowMenu(false);
      }

      if (onSelected) {
        onSelected(_value);
      }
    }, []);

    const handleToggleMenu = useCallback(
      () => setShowMenu((prev) => !prev),
      []
    );

    const handleMenuClose = useCallback(() => {
      setShowMenu(false);
      setMenuClosing(false);
    }, []);

    const handleMenuClosing = useCallback(() => setMenuClosing(true), []);

    // STYLES
    const menuStyle = useMemo(() => {
      if (containerRef.current) {
        const { clientHeight, clientWidth } = containerRef.current;
        return {
          top: clientHeight + 10,
          width: clientWidth,
          maxMenuHeight,
        };
      }
      return {};
    }, [showMenu]);

    useFocus(dropdownRef, { bgHighlight: false });

    const selectedValue = useMemo(() => value || placeholder, [value]);

    return (
      <div
        className={"rc-dropdown-wrapper"}
        tabIndex={0}
        onKeyUp={(ev) => {
          ev.key === "Enter" && handleToggleMenu();
        }}
        ref={dropdownRef}
      >
        <div
          className={"rc-dropdown-value-container"}
          ref={containerRef}
          onClick={handleToggleMenu}
        >
          <span className={"rc-dropdown-value"}>{selectedValue}</span>
          <span
            className={classNames([
              "rc-dropdown-chevron-icon",
              showMenu && !menuClosing ? "rc-dropdown-chevron-icon-rotate" : "",
            ])}
            role="img"
            data-testid="icon"
          >
            <ChevronDownIcon />
          </span>
        </div>

        {showMenu && (
          <DropdownMenuOverlay
            style={menuStyle}
            handleSelection={handleSelection}
            options={dropdownOptions}
            open={showMenu}
            allowMultipleSelection={allowMultipleSelection}
            placementReference={dropdownRef}
            placement="bottom"
            onClose={handleMenuClose}
            onClosing={handleMenuClosing}
          />
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export { Dropdown };
