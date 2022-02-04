import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckIcon } from '../../icons';
import useFocusNew from '../common/effects/useFocusNew';
import { CheckboxProps } from './checkbox-model';
import './checkbox.scss';

const CheckBox: React.FunctionComponent<CheckboxProps> = React.memo(
  ({
    autoHeight = false,
    border = false,
    checkBoxStyle = 'square',
    disabled,
    focusIcon = false,
    focusable = true,
    id,
    isChecked = false,
    label,
    noHoverStyle = false,
    noUniqueId = false,
    onChange,
    size = 'md',
    style,
    RTL = false,
  }: CheckboxProps) => {
    const [checked, setChecked] = useState(isChecked);
    const ref = useRef(null);
    const checkBoxId = noUniqueId
      ? id
        ? useRef(id)
        : useRef(`label-${nanoid()}`)
      : useRef(`label-${nanoid()}`);

    const toggleCheck = useCallback(() => {
      if (!disabled) {
        setChecked(!checked);
        onChange && onChange(checkBoxId.current, !checked);
      }
    }, [checked]);

    if (focusable) {
      useFocusNew(ref);
    }

    const iconClass = useMemo(
      () =>
        classNames('rc-checkbox-icon', {
          'rc-checkbox-checked': checked,
          [`rc-checkbox-${size}`]: true,
          [`rc-checkbox-${checkBoxStyle}`]: true,
        }),
      [checked]
    );

    const labelClass = useMemo(
      () =>
        classNames('rc-checkbox-label', {
          [`rc-checkbox-label-${size}`]: true,
          'rc-checkbox-label-rtl': RTL,
        }),
      []
    );

    const checkBoxClass = useMemo(
      () =>
        classNames('rc-checkbox', {
          'rc-checkbox-focus': focusIcon,
          [`rc-checkbox-${size}`]: true,
          'rc-disabled': disabled,
        }),
      [disabled]
    );

    const wrapperClass = useMemo(
      () =>
        classNames('rc-checkbox-wrapper', {
          [`rc-checkbox-${size}`]: true,
          'rc-checkbox-auto-height': autoHeight,
          'rc-checkbox-border': border,
          'rc-checkbox-disabled': disabled,
          'rc-checkbox-focus': !focusIcon,
          'rc-checkbox-hover': !noHoverStyle,
          'rc-checkbox-rtl': RTL,
        }),
      [size, disabled]
    );

    const focusProps = useMemo(
      () => ({
        ref: ref,
        tabIndex: disabled || !focusable ? -1 : 0,
      }),
      [disabled]
    );

    const wrapperProps = useMemo(
      () => (!focusIcon && !disabled ? focusProps : null),
      [disabled]
    );
    const iconProps = useMemo(() => (focusIcon ? focusProps : null), []);

    useEffect(() => {
      if (checked !== isChecked) {
        setChecked(isChecked);
      }
    }, [isChecked]);

    return (
      <div
        aria-checked={checked}
        aria-labelledby={checkBoxId.current}
        className={wrapperClass}
        onClick={toggleCheck}
        role="checkbox"
        style={style}
        aria-disabled={disabled}
        {...wrapperProps}
      >
        <div className={checkBoxClass} {...iconProps}>
          <span className={iconClass} role="img" aria-label="checkbox icon">
            <CheckIcon />
          </span>
        </div>
        <label className={labelClass} id={checkBoxId.current}>
          {label}
        </label>
      </div>
    );
  },
  (prev, next) => {
    return prev.isChecked === next.isChecked && prev.disabled === next.disabled;
  }
);

CheckBox.displayName = 'CheckBox';

export { CheckBox };
