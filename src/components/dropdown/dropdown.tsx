import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "../../icons";
import { DropDownMenu } from "./dropdown-menu";
import { DropdownModel } from "./dropdown-model";
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
  const handleSelection = useCallback((val, id) => {
    setValue(val);
    setDropdownOptions((options) =>
      options.map((option) => ({
        ...option,
        selected: option.id === id,
      }))
    );
    setShowMenu(false);

    if (onSelected) {
      onSelected(val);
    }
  }, []);

  const handleToggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const handleBlur = useCallback((ev: React.FocusEvent) => {
    console.log(ev.relatedTarget);
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
    <div className={"dropdown-wrapper"} tabIndex={0} onBlur={handleBlur}>
      <div
        className={"dropdown-value-container"}
        onClick={handleToggleMenu}
        ref={containerRef}
      >
        <span className={"dropdown-value"}>{value}</span>
        <span
          className={classNames([
            "dropdown-chevron-icon",
            showMenu ? "dropdown-chevron-icon-rotate" : "",
          ])}
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
