import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { DropDownMenu } from "./dropdown-menu";
import { DropdownModel, Option } from "./dropdown-model";
import "./dropdown.scss";

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

    // REFS
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // HANDLERS
    const handleSelection = useCallback((selected: Option[]) => {
      let _value: string | string[];

      if (allowMultipleSelection) {
        _value = selected.map((opt) => opt.value).join(",");
        setValue(_value);
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

    const handleToggleMenu = useCallback(() => {
      setShowMenu((prev) => !prev);
    }, []);

    const handleBlur = useCallback((ev: React.FocusEvent) => {
      if (!ev.relatedTarget) {
        setShowMenu(false);
      }
    }, []);

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
        onBlur={handleBlur}
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
              showMenu ? "rc-dropdown-chevron-icon-rotate" : "",
            ])}
            role="img"
            data-testid="icon"
          >
            <ChevronDownIcon />
          </span>
        </div>

        <DropDownMenu
          style={menuStyle}
          handleSelection={handleSelection}
          options={dropdownOptions}
          open={showMenu}
          allowMultipleSelection={allowMultipleSelection}
        />
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export { Dropdown };
