import cls from 'classnames';
import React, { CSSProperties, useEffect, useMemo } from 'react';
import { ChevronDownIcon, CloseIcon } from '../../icons';
import useFocusNew from '../common/effects/useFocusNew';
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
  size,
}: DropdownValueProps) => {
  const rcDropdownValueClass = useMemo(
    () =>
      cls(styles.dropdown_value_container, {
        [styles.dropdown_menu_open]: disabled,
        [styles.menu]: showMenu,
        [styles.dropdown_multi]: allowMultiSelection,
        [styles.dropdown_rtl]: RTL,
        [styles.single]: !allowMultiSelection,
        [styles.dropdown_with_clear]: showClearBtn,
        [styles[`dropdown_value_${size}`]]: true,
      }),
    [disabled, showMenu]
  );

  const rcDropdownIconClass = useMemo(
    () =>
      cls(
        styles.dropdown_chevron_icon,
        showMenu && !menuClosing ? styles.dropdown_chevron_icon_rotate : ''
      ),
    [showMenu, menuClosing]
  );

  const canHideClearButton = useMemo(
    () => !showClearBtn || disabled || selectedValue === placeholder,
    [disabled, selectedValue]
  );

  const rcDropdownClearClass = useMemo(
    () =>
      cls(styles.dropdown_clear_icon, {
        [styles.dropdown_clear_icon_hidden]: canHideClearButton,
      }),
    [showClearBtn, canHideClearButton]
  );

  const iconStyle = useMemo(() => {
    return {
      '---chevron-icon-color': chevronIconColor,
    } as CSSProperties;
  }, []);

  const valueClass = useMemo(() => {
    return cls(styles.dropdown_value, {
      [styles.dropdown_rtl]: RTL,
    });
  }, []);

  if (focusable && containerRef) {
    useFocusNew(containerRef, onToggle);
  }

  useEffect(() => {
    if (focus) {
      containerRef?.current?.focus();
    }
  }, [focus]);

  return (
    <div
      className={rcDropdownValueClass}
      ref={containerRef}
      onClick={onToggle}
      tabIndex={!disabled && focusable ? 0 : -1}
      aria-disabled={disabled}
    >
      {allowMultiSelection ? (
        Array.isArray(selectedValue) ? (
          <div className={styles.dropdown_tags_wrapper}>
            <Tags
              items={selectedValue}
              readonly
              size={size}
              // tagStyle="fill"
              tagWidth={60}
              RTL={RTL}
              wrap={false}
            />
          </div>
        ) : (
          <span className={valueClass}>{selectedValue}</span>
        )
      ) : (
        <span className={valueClass}>{selectedValue}</span>
      )}
      {
        <span
          className={rcDropdownClearClass}
          role="button"
          data-testid="clear-icon"
          aria-label="clear selection"
          style={iconStyle}
          onClick={onClear}
        >
          <CloseIcon />
        </span>
      }
      <span
        className={rcDropdownIconClass}
        role="img"
        aria-label="clear selection"
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
