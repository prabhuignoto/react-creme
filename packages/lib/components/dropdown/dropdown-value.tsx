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
  size = 'sm',
}: DropdownValueProps) => {
  const rcDropdownValueClass = useMemo(
    () =>
      cls(styles.container, {
        [styles.open]: disabled,
        [styles.menu]: showMenu,
        [styles.multi]: allowMultiSelection,
        [styles.rtl]: RTL,
        [styles.single]: !allowMultiSelection,
        [styles.with_clear]: showClearBtn,
        [styles[size]]: true,
      }),
    [disabled, showMenu]
  );

  const rcDropdownIconClass = useMemo(
    () =>
      cls(
        styles.chevron_icon,
        showMenu && !menuClosing ? styles.chevron_icon_rotate : ''
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
          <div className={styles.tags_wrapper}>
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
