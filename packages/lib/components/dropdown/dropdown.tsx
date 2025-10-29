import cls from 'classnames';
import { nanoid } from 'nanoid';
import React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { withOverlay } from '../common/withOverlay';
import { DropDownMenu } from './dropdown-menu';
import { DropdownMenuProps, DropdownProps, Option } from './dropdown-model';
import { DropdownValue } from './dropdown-value';
import styles from './dropdown.module.scss';

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
    size = 'sm',
  }: DropdownProps) => {
    /**
     * Generate stable menu ID for ARIA relationships
     */
    const menuId = useMemo(() => `dropdown-menu-${nanoid(6)}`, []);

    /**
     * Create stable IDs for options (memoized to avoid regeneration)
     */
    const optionsWithIds = useMemo(
      () =>
        options.map((option, index) => ({
          ...option,
          id: option.id || `dropdown-option-${index}-${option.value}`,
        })),
      [options]
    );

    /**
     * Track selection state separately to avoid props-to-state anti-pattern
     */
    const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
      const selected = optionsWithIds.filter(opt => opt.selected).map(opt => opt.id);
      return new Set(selected);
    });

    /**
     * Derive dropdown options from props (avoid props-to-state anti-pattern)
     */
    const dropdownOptions = useMemo(
      () =>
        optionsWithIds.map(option => ({
          ...option,
          visible: true,
          selected: selectedIds.has(option.id),
        })),
      [optionsWithIds, selectedIds]
    );

    /**
     * Derive selected value from selectedIds
     */
    const value = useMemo(() => {
      const selectedOptions = dropdownOptions.filter(opt => selectedIds.has(opt.id));
      return selectedOptions.length
        ? selectedOptions.map(t => t.name).join(',')
        : '';
    }, [dropdownOptions, selectedIds]);

    // state for showing and hiding the menu
    const [showMenu, setShowMenu] = useState(false);

    // state for tracking when the menu is closing
    const [menuClosing, setMenuClosing] = useState(false);

    // REFS
    const containerRef = useRef<HTMLDivElement>(
      null
    ) as React.RefObject<HTMLDivElement>;
    const dropdownRef = useRef<HTMLDivElement>(null);

    // state to set the focus manually
    const [focusManual, setFocusManual] = useState(false);

    // tracks the focus index of the options
    const [focusIndex, setFocusIndex] = useState(-1);

    /**
     * Handles the selection of an option
     */
    const handleSelection = useCallback(
      (selected: Option[]) => {
        let _value: string | string[] = '';

        if (allowMultiSelection) {
          _value = selected.map(opt => opt.value).join(',');
          const newSelectedIds = selected.map(item => item.id).filter((id): id is string => id !== undefined);
          setSelectedIds(new Set(newSelectedIds));
        } else {
          const selectedOption = selected[0];
          if (selectedOption) {
            const { id, value: optValue } = selectedOption;
            _value = optValue || '';
            setSelectedIds(new Set([id].filter((id): id is string => id !== undefined)));
            setShowMenu(false);
            setFocusManual(true);
          }
        }

        setFocusIndex(-1);

        onSelected?.(_value);
      },
      [allowMultiSelection, onSelected]
    );

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

      setTimeout(() => {
        setFocusIndex(focusableIndex);
      }, 50);
    }, [dropdownOptions]);

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
    }, [showMenu, maxMenuHeight]);

    /**
     * Clears the selection
     */
    const handleClear = useCallback(
      (ev: React.MouseEvent) => {
        ev.preventDefault();
        setSelectedIds(new Set());
        onSelected?.('');
      },
      [onSelected]
    );

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
    }, [value, allowMultiSelection, placeholder]);

    // Sync selectedIds when options prop changes
    useEffect(() => {
      const initialSelected = optionsWithIds
        .filter(opt => opt.selected)
        .map(opt => opt.id);
      if (initialSelected.length > 0) {
        setSelectedIds(new Set(initialSelected));
      }
    }, [optionsWithIds]);

    // memoized classnames
    const rcDropdownClass = useMemo(
      () =>
        cls(styles.dropdown, {
          [styles.disabled]: disabled,
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
          size={size}
          menuId={menuId}
        />

        {showMenu && (
          <DropdownMenuOverlay
            style={menuStyle}
            handleSelection={handleSelection}
            options={dropdownOptions}
            open={showMenu}
            allowMultiSelection={allowMultiSelection}
            placementReference={dropdownRef as React.RefObject<HTMLElement>}
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
            size={size}
            menuId={menuId}
          />
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export { Dropdown };
