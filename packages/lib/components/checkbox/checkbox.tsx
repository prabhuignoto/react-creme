import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckIcon } from '../../icons';
import useFocusNew from '../common/effects/useFocusNew';
import { CheckboxProps } from './checkbox-model';
import styles from './checkbox.module.scss';

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
    size = 'sm',
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

    const toggleCheck = useCallback(
      (ev: React.MouseEvent) => {
        ev.preventDefault();
        ev.stopPropagation();

        if (!disabled) {
          setChecked(!checked);
          onChange && onChange(checkBoxId.current, !checked);
        }
      },
      [checked]
    );

    if (focusable) {
      useFocusNew(ref);
    }

    const iconClass = useMemo(
      () =>
        classNames(styles.checkbox_icon, {
          [styles.checkbox_checked]: checked,
          [styles[`checkbox_${size}`]]: true,
          [styles[`checkbox_${checkBoxStyle}`]]: true,
        }),
      [checked]
    );

    const labelClass = useMemo(
      () =>
        classNames(styles.checkbox_label, {
          [styles[`checkbox_label_${size}`]]: true,
          [styles.checkbox_label_rtl]: RTL,
        }),
      []
    );

    const checkBoxClass = useMemo(
      () =>
        classNames(styles.checkbox, {
          'rc-checkbox-focus': focusIcon,
          [styles[`checkbox_${size}`]]: true,
          [styles.disabled]: disabled,
        }),
      [disabled]
    );

    const wrapperClass = useMemo(
      () =>
        classNames(styles.checkbox_wrapper, {
          [styles[`checkbox_${size}`]]: true,
          [styles.checkbox_auto_height]: autoHeight,
          [styles.checkbox_border]: border,
          [styles.checkbox_disabled]: disabled,
          [styles.checkbox_focus]: !focusIcon,
          [styles.checkbox_hover]: !noHoverStyle,
          [styles.checkbox_rtl]: RTL,
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
