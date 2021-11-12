import cls from "classnames";
import { nanoid } from "nanoid";
import React, {
  startTransition,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronDownIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { withOverlay } from "../common/withOverlay";
import { Tags } from "../tags/tags";
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
    virtualize = false,
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
      options.length
        ? options
            .filter((opt) => opt.selected)
            .map((t) => t.name)
            .join(",")
        : ""
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
      let _value: string | string[] = "";

      if (allowMultiSelection) {
        startTransition(() => {
          _value = selected.map((opt) => opt.value).join(",");
          const selectedIds = selected.map((item) => item.id);
          setValue(_value);
          setDropdownOptions((options) =>
            options.map((option) => ({
              ...option,
              selected: selectedIds.indexOf(option.id) > -1,
            }))
          );
        });
      } else {
        startTransition(() => {
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
        });
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

    // styles
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
    const selectedValue = useMemo(() => {
      if (value !== placeholder && value && allowMultiSelection) {
        return value
          .split(",")
          .filter((f) => !!f)
          .map((t) => ({
            name: t,
          }));
      } else {
        return value || placeholder;
      }
    }, [value, allowMultiSelection]);

    // memoized classnames
    const rcDropdownClass = useMemo(
      () =>
        cls("rc-dropdown", {
          "rc-dropdown-disabled": disabled,
        }),
      [disabled]
    );

    const rcDropdownValueClass = useMemo(
      () =>
        cls("rc-dropdown-value-container", {
          "rc-dropdown-multi": allowMultiSelection,
          "rc-dropdown-disabled": disabled,
        }),
      [disabled]
    );

    const rcDropdownIconClass = useMemo(
      () =>
        cls(
          "rc-dropdown-chevron-icon",
          showMenu && !menuClosing ? "rc-dropdown-chevron-icon-rotate" : ""
        ),
      [showMenu, menuClosing]
    );

    return (
      <div
        className={rcDropdownClass}
        ref={dropdownRef}
        // onClick={handleToggleMenu}
      >
        <div
          className={rcDropdownValueClass}
          ref={containerRef}
          onClick={handleToggleMenu}
          tabIndex={!disabled ? 0 : -1}
          aria-disabled={disabled}
        >
          {allowMultiSelection ? (
            Array.isArray(selectedValue) ? (
              <div className="rc-dropdown-tags-wrapper">
                <Tags
                  items={selectedValue}
                  readonly
                  tagStyle="fill"
                  tagSize={"small"}
                  tagWidth={100}
                />
              </div>
            ) : (
              <span className={"rc-dropdown-value"}>{selectedValue}</span>
            )
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
            virtualize={virtualize}
          />
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export { Dropdown };
