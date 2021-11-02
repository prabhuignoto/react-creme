import cls from "classnames";
import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Tags } from "..";
import { ChevronDownIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { withOverlay } from "../common/withOverlay";
import { DropDownMenu } from "./dropdown-menu";
import { DropdownMenuModel, DropdownModel, Option } from "./dropdown-model";
import "./dropdown.scss";

const DropdownMenuOverlay = withOverlay<DropdownMenuModel>(DropDownMenu, {
  backdropColor: "transparent",
});

const Dropdown: React.FunctionComponent<DropdownModel> = React.memo(
  ({
    allowMultiSelection,
    disabled = false,
    enableSearch = false,
    maxMenuHeight = 200,
    onSelected,
    options = [],
    placeholder = "Choose an option...",
  }: DropdownModel) => {
    // options states
    const [dropdownOptions, setDropdownOptions] = useState(
      options.map((option) => ({
        id: nanoid(),
        ...option,
        visible: true,
      }))
    );

    // state for the selected value
    const [value, setValue] = useState(
      !options.some((opt) => opt.selected) ? placeholder : ""
    );

    // state for showing and hiding the menu
    const [showMenu, setShowMenu] = useState(false);

    // state for tracking when the menu is closing
    const [menuClosing, setMenuClosing] = useState(false);

    // REFS
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);

    // HANDLERS
    const handleSelection = useCallback((selected: Option[]) => {
      let _value: string | string[];

      if (allowMultiSelection) {
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

    // toggles the dropdown menu
    const handleToggleMenu = useCallback(
      () => setShowMenu((prev) => !prev),
      []
    );

    // handles the menu closure
    const handleMenuClose = useCallback(() => {
      setShowMenu(false);
      setMenuClosing(false);
    }, []);

    // handles the menu closing
    const handleMenuClosing = useCallback(() => setMenuClosing(true), []);

    // STYLES
    const menuStyle = useMemo(() => {
      if (containerRef.current) {
        const { clientWidth } = containerRef.current;
        return {
          width: clientWidth,
          maxMenuHeight,
        };
      }
      return {};
    }, [showMenu]);

    // setup focus
    useFocus(containerRef, { bgHighlight: false }, handleToggleMenu);

    // memoize the selected value
    const selectedValue = useMemo(() => value || placeholder, [value]);

    // side effects

    useEffect(() => {
      // populate selected value on load
      if (allowMultiSelection) {
        setValue(
          options
            .filter((op) => op.selected)
            .map((option) => option.name)
            .join(",")
        );
      } else {
        const selected = options.find((op) => op.selected);
        setValue(selected ? selected.name : placeholder);
      }
    }, []);

    // memoized classnames
    const rcDropdownClass = useMemo(
      () =>
        cls("rc-dropdown", {
          "rc-dropdown--disabled": disabled,
        }),
      []
    );

    const rcDropdownValueClass = useMemo(
      () =>
        cls("rc-dropdown-value-container", {
          "rc-dropdown-multi": allowMultiSelection,
        }),
      []
    );

    const rcDropdownIconClass = useMemo(
      () =>
        cls(
          "rc-dropdown-chevron-icon",
          showMenu && !menuClosing ? "rc-dropdown-chevron-icon-rotate" : ""
        ),
      [showMenu]
    );

    return (
      <div className={rcDropdownClass} ref={dropdownRef}>
        <div
          className={rcDropdownValueClass}
          ref={containerRef}
          onClick={handleToggleMenu}
          tabIndex={0}
        >
          {allowMultiSelection ? (
            <div className="rc-dropdown-tags-wrapper">
              <Tags
                items={selectedValue.split(",").map((n) => ({ name: n }))}
                readonly
                tagStyle="fill"
                tagSize={"small"}
                tagWidth={100}
              />
            </div>
          ) : (
            <span className={"rc-dropdown-value"}>{selectedValue}</span>
          )}
          <span className={rcDropdownIconClass} role="img" data-testid="icon">
            <ChevronDownIcon />
          </span>
        </div>

        {showMenu && (
          <DropdownMenuOverlay
            style={menuStyle}
            handleSelection={handleSelection}
            options={dropdownOptions}
            open={showMenu}
            allowMultiSelection={allowMultiSelection}
            placementReference={dropdownRef}
            placement="bottom"
            onClose={handleMenuClose}
            onClosing={handleMenuClosing}
            enableSearch={enableSearch}
          />
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export { Dropdown };
