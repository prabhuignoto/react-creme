import { isDark, useFocusNew } from '@common';
import { CheckIcon } from '@common/icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    const isDarkMode = useMemo(() => isDark(), []);
    const checkBoxId = useRef(noUniqueId ? id : `label-${nanoid()}`);

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

    useFocusNew(focusable ? ref : null);

    const iconClass = useMemo(
      () =>
        classNames(styles.icon, {
          [styles.checked]: checked,
          [styles[`${size}`]]: true,
          [styles[`${checkBoxStyle}`]]: true,
          [styles.dark]: isDarkMode,
        }),
      [checked]
    );

    const labelClass = useMemo(
      () =>
        classNames(styles.label, {
          [styles[`label_${size}`]]: true,
          [styles.label_rtl]: RTL,
          [styles.dark]: isDarkMode,
        }),
      []
    );

    const checkBoxClass = useMemo(
      () =>
        classNames(styles.checkbox, {
          'rc-checkbox-focus': focusIcon,
          [styles[size]]: true,
          [styles.disabled]: disabled,
        }),
      [disabled]
    );

    const wrapperClass = useMemo(
      () =>
        classNames(styles.wrapper, {
          [styles[size]]: true,
          [styles.auto_height]: autoHeight,
          [styles.border]: border,
          [styles.disabled]: disabled,
          [styles.focus]: !focusIcon,
          [styles.hover]: !noHoverStyle,
          [styles.rtl]: RTL,
          [styles.dark]: isDarkMode,
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
