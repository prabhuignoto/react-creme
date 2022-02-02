import cls from 'classnames';
import React, { CSSProperties, useEffect, useMemo } from 'react';
import { ChevronDownIcon, CloseIcon } from '../../icons';
import useFocusNew from '../common/effects/useFocusNew';
import { Tags } from '../tags/tags';
import { DropdownValueProps } from './dropdown-model';
import './dropdown-value.scss';

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
}: DropdownValueProps) => {
  const rcDropdownValueClass = useMemo(
    () =>
      cls('rc-dropdown-value-container', {
        'rc-dropdown-disabled': disabled,
        'rc-dropdown-menu-open': showMenu,
        'rc-dropdown-multi': allowMultiSelection,
        'rc-dropdown-rtl': RTL,
        'rc-dropdown-single': !allowMultiSelection,
        'rc-dropdown-with-clear': showClearBtn,
      }),
    [disabled, showMenu]
  );

  const rcDropdownIconClass = useMemo(
    () =>
      cls(
        'rc-dropdown-chevron-icon',
        showMenu && !menuClosing ? 'rc-dropdown-chevron-icon-rotate' : ''
      ),
    [showMenu, menuClosing]
  );

  const canHideClearButton = useMemo(
    () => !showClearBtn || disabled || selectedValue === placeholder,
    [disabled, selectedValue]
  );

  const rcDropdownClearClass = useMemo(
    () =>
      cls('rc-dropdown-clear-icon', {
        'rc-dropdown-clear-icon-hidden': canHideClearButton,
      }),
    [showClearBtn, canHideClearButton]
  );

  const iconStyle = useMemo(() => {
    return {
      '---chevron-icon-color': chevronIconColor,
    } as CSSProperties;
  }, []);

  const valueClass = useMemo(() => {
    return cls('rc-dropdown-value', {
      'rc-dropdown-rtl': RTL,
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
          <div className="rc-dropdown-tags-wrapper">
            <Tags
              items={selectedValue}
              readonly
              tagSize={'md'}
              tagStyle="fill"
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
