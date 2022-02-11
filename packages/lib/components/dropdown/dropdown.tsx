import cls from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { withOverlay } from '../common/withOverlay';
import { DropDownMenu } from './dropdown-menu';
import { DropdownMenuProps, DropdownProps, Option } from './dropdown-model';
import { DropdownValue } from './dropdown-value';
import './dropdown.scss';

const DropdownMenuOverlay = withOverlay<DropdownMenuProps, null>(DropDownMenu, {
  backdropColor: 'transparent',
});

const Dropdown: React.FunctionComponent<DropdownProps> = React.memo(
  ({
    allowMultiSelection,
    disabled = false,
    enableSearch = false,
    maxMenuHeight = 200,
    onSelected,
    options = [],
    placeholder = 'Choose an option...',
    virtualize = false,
    focusable = true,
    RTL = false,
    chevronIconColor,
    showClearBtn = true,
    label = 'dropdown',
  }: DropdownProps) => {
    /**
     * The state of the dropdown.
     */
    const [dropdownOptions, setDropdownOptions] = useState(
      options.map(option => ({
        id: nanoid(),
        ...option,
        visible: true,
      }))
    );

    /**
     * State of the selected value
     */
    const [value, setValue] = useState(
      options.length
        ? options
            .filter(opt => opt.selected)
            .map(t => t.name)
            .join(',')
        : ''
    );

    // state for showing and hiding the menu
    const [showMenu, setShowMenu] = useState(false);

    // state for tracking when the menu is closing
    const [menuClosing, setMenuClosing] = useState(false);

    // REFS
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);

    // state to set the focus manually
    const [focusManual, setFocusManual] = useState(false);

    // tracks the focus index of the options
    const [focusIndex, setFocusIndex] = useState(-1);

    /**
     * Handles the selection of an option
     */
    const handleSelection = useCallback((selected: Option[]) => {
      let _value: string | string[] = '';

      if (allowMultiSelection) {
        _value = selected.map(opt => opt.value).join(',');
        const selectedIds = selected.map(item => item.id);
        setValue(_value);
        setDropdownOptions(options =>
          options.map(option => ({
            ...option,
            selected: selectedIds.indexOf(option.id) > -1,
          }))
        );
      } else {
        const { id, value } = selected[0];
        _value = value || '';
        setValue(_value);
        setDropdownOptions(options =>
          options.map(option => ({
            ...option,
            selected: option.id === id,
          }))
        );
        setShowMenu(false);
        setFocusManual(true);
      }

      setFocusIndex(-1);

      if (onSelected) {
        onSelected(_value);
      }
    }, []);

    // toggles the dropdown menu
    const handleToggleMenu = useCallback(() => setShowMenu(prev => !prev), []);

    /**
     * Handler executed when the menu is closed
     */
    const handleMenuClose = useCallback(() => {
      setShowMenu(false);
      setMenuClosing(false);
      setFocusIndex(-1);
    }, []);

    /**
     * Handler executed when the menu is opened
     */
    const handleMenuOpen = useCallback(() => {
      const focusableIndex = dropdownOptions.findIndex(
        option => !option.disabled
      );
      setFocusIndex(focusableIndex);
    }, []);

    // handles the menu closing
    const handleMenuClosing = useCallback(() => {
      setMenuClosing(true);
      setFocusManual(true);
    }, []);

    /**
     * Memoized styles
     */
    const menuStyle = useMemo(() => {
      if (containerRef.current) {
        const { clientWidth } = containerRef.current;
        return {
          maxMenuHeight,
          width: clientWidth,
        };
      }
      return {};
    }, [showMenu]);

    /**
     * Clears the selection
     */
    const handleClear = useCallback((ev: React.MouseEvent) => {
      ev.preventDefault();
      setValue('');
      //red
      setDropdownOptions(options =>
        options.map(option => ({
          ...option,
          selected: false,
        }))
      );
      if (onSelected) {
        onSelected('');
      }
    }, []);

    // memoize the selected value
    const selectedValue = useMemo(() => {
      if (value !== placeholder && value && allowMultiSelection) {
        return value
          .split(',')
          .filter(f => !!f)
          .map(t => ({
            name: t,
          }));
      } else {
        return value || placeholder;
      }
    }, [value, allowMultiSelection]);

    // memoized classnames
    const rcDropdownClass = useMemo(
      () =>
        cls('rc-dropdown', {
          'rc-dropdown-disabled': disabled,
        }),
      [disabled]
    );

    return (
      <div
        className={rcDropdownClass}
        ref={dropdownRef}
        onBlur={() => setFocusManual(false)}
      >
        <DropdownValue
          RTL={RTL}
          allowMultiSelection={allowMultiSelection}
          placeholder={placeholder}
          showClearBtn={showClearBtn}
          onToggle={handleToggleMenu}
          onClear={handleClear}
          showMenu={showMenu}
          menuClosing={menuClosing}
          chevronIconColor={chevronIconColor}
          containerRef={containerRef}
          disabled={disabled}
          focusable={focusable}
          selectedValue={selectedValue}
          label={label}
          focus={focusManual}
        />

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
            onOpen={handleMenuOpen}
            onClosing={handleMenuClosing}
            enableSearch={enableSearch}
            virtualize={virtualize}
            overlayAnimation={false}
            RTL={RTL}
            focusable={focusable}
            align="left"
            selectedIndex={focusIndex}
          />
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export { Dropdown };
