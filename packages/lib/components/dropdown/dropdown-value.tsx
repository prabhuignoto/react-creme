import { ChevronDownIcon, CloseIcon } from '@icons';
import cls from 'classnames';
import { nanoid } from 'nanoid';
import React, { CSSProperties, useEffect, useMemo } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import { Tags } from '../tags/tags';
import { DropdownValueProps } from './dropdown-model';
import styles from './dropdown-value.module.scss';

const DropdownValue: React.FunctionComponent<DropdownValueProps> = ({
  RTL,
  allowMultiSelection,
  placeholder,
  disabled,
  showClearBtn,
  onClear,
  onToggle,
  selectedValue,
  focusable,
  showMenu,
  menuClosing,
  chevronIconColor,
  containerRef,
  focus,
  size = 'sm',
  label = 'dropdown',
}: DropdownValueProps) => {
  const isDarkMode = useMemo(() => isDark(), []);

  // Generate stable IDs for ARIA relationships
  const dropdownId = useMemo(() => `dropdown-${nanoid(6)}`, []);
  const menuId = useMemo(() => `${dropdownId}-menu`, [dropdownId]);
  const labelId = useMemo(() => `${dropdownId}-label`, [dropdownId]);

  const rcDropdownValueClass = useMemo(
    () =>
      cls(styles.container, {
        [styles.open]: showMenu,
        [styles.menu]: showMenu,
        [styles.multi]: allowMultiSelection,
        [styles.rtl]: RTL,
        [styles.single]: !allowMultiSelection,
        [styles.with_clear]: showClearBtn,
        [styles[size]]: true,
        [styles.dark]: isDarkMode,
      }),
    [disabled, showMenu]
  );

  const rcDropdownIconClass = useMemo(
    () =>
      cls(
        styles.chevron_icon,
        showMenu && !menuClosing ? styles.chevron_icon_rotate : '',
        {
          [styles.dark]: isDarkMode,
        }
      ),
    [showMenu, menuClosing]
  );

  const canHideClearButton = useMemo(
    () => !showClearBtn || disabled || selectedValue === placeholder,
    [disabled, selectedValue]
  );

  const rcDropdownClearClass = useMemo(
    () =>
      cls(styles.clear_icon, {
        [styles.clear_icon_hidden]: canHideClearButton,
        [styles.dark]: isDarkMode,
      }),
    [showClearBtn, canHideClearButton]
  );

  const iconStyle = useMemo(() => {
    return {
      '---chevron-icon-color': chevronIconColor,
    } as CSSProperties;
  }, []);

  const valueClass = useMemo(() => {
    return cls(styles.value, {
      [styles.rtl]: RTL,
      [styles.not_selected]: selectedValue === placeholder,
    });
  }, [selectedValue]);

  useFocusNew(
    focusable && containerRef ? containerRef : null,
    focusable ? onToggle : null
  );

  useEffect(() => {
    if (focus) {
      containerRef?.current?.focus();
    }
  }, [focus]);

  // Handle clear button keyboard interaction
  const handleClearKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onClear?.(e as unknown as React.MouseEvent);
    }
  };

  return (
    <div
      id={dropdownId}
      className={rcDropdownValueClass}
      ref={containerRef}
      onClick={onToggle}
      tabIndex={!disabled && focusable ? 0 : -1}
      role="combobox"
      aria-disabled={disabled}
      aria-expanded={showMenu}
      aria-haspopup="listbox"
      aria-controls={showMenu ? menuId : undefined}
      aria-label={label}
    >
      {/* Hidden label for screen readers */}
      <span id={labelId} style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
        {label}
      </span>
      {allowMultiSelection ? (
        Array.isArray(selectedValue) ? (
          <div className={styles.tags_wrapper}>
            {selectedValue.length > 0 ? (
              <>
                <Tags
                  items={selectedValue.slice(0, 3)}
                  readonly
                  size={size}
                  tagStyle="fill"
                  tagWidth={80}
                  RTL={RTL}
                  wrap={false}
                  tagHeight={20}
                />
                {selectedValue.length > 3 && (
                  <span className={styles.tag_count}>
                    +{selectedValue.length - 3} more
                  </span>
                )}
              </>
            ) : (
              <span className={valueClass}>{placeholder}</span>
            )}
          </div>
        ) : (
          <span className={valueClass}>{selectedValue}</span>
        )
      ) : (
        <span className={valueClass}>{selectedValue as string}</span>
      )}
      {
        <span
          className={rcDropdownClearClass}
          role="button"
          data-testid="clear-icon"
          aria-label="Clear selection"
          tabIndex={!disabled && !canHideClearButton && focusable ? 0 : -1}
          style={iconStyle}
          onClick={onClear}
          onKeyDown={handleClearKeyDown}
        >
          <CloseIcon />
        </span>
      }
      <span
        className={rcDropdownIconClass}
        role="img"
        aria-label={showMenu ? 'Collapse dropdown' : 'Expand dropdown'}
        aria-hidden="true"
        data-testid="chevron-icon"
        style={iconStyle}
      >
        <ChevronDownIcon />
      </span>
    </div>
  );
};

DropdownValue.displayName = 'DropdownValue';

export { DropdownValue };
