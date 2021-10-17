import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "../../icons";
import { DropDownMenu } from "./dropdown-menu";
import { DropdownModel, Option } from "./dropdown-model";
import "./dropdown.scss";

const Dropdown: React.FunctionComponent<DropdownModel> = ({
  placeholder = "Choose an option...",
  options = [],
  onSelected,
  maxMenuHeight = 200,
}) => {
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

  // HANDLERS
  const handleSelection = useCallback((selected: Option[]) => {
    const { id, value } = selected[0];
    setValue(value);
    setDropdownOptions((options) =>
      options.map((option) => ({
        ...option,
        selected: option.id === id,
      }))
    );
    setShowMenu(false);

    if (onSelected) {
      onSelected(value);
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

  return (
    <div className={"rc-dropdown-wrapper"} tabIndex={0} onBlur={handleBlur}>
      <div
        className={"rc-dropdown-value-container"}
        onClick={handleToggleMenu}
        ref={containerRef}
      >
        <span className={"rc-dropdown-value"}>{value}</span>
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
      />
    </div>
  );
};

export { Dropdown };
