import cls from 'classnames';
import React, { CSSProperties, useMemo } from 'react';
import { ChevronDownIcon, CloseIcon } from '../../icons';
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
              tagSize={'sm'}
              tagWidth={100}
              RTL={RTL}
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
          style={iconStyle}
          onClick={onClear}
        >
          <CloseIcon />
        </span>
      }
      <span
        className={rcDropdownIconClass}
        role="img"
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
