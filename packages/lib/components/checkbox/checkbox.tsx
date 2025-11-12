import { CheckIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import { CheckboxProps } from './checkbox-model';
import styles from './checkbox.module.scss';

/**
 * CheckBox is a React Function Component for displaying a custom checkbox with various customization options.
 * It receives several props to handle its behavior and styling.
 *
 * @returns {JSX.Element} The CheckBox component.
 *
 * @param {boolean} autoHeight - Adjusts the height of the checkbox automatically.
 * @param {boolean} border - Adds a border to the checkbox.
 * @param {string} checkBoxStyle - Determines the style of the checkbox (e.g., 'square').
 * @param {boolean} disabled - Disables the checkbox if true.
 * @param {boolean} focusIcon - Determines whether the focus is on the icon.
 * @param {boolean} focusable - Determines whether the checkbox is focusable.
 * @param {string} id - The id of the checkbox.
 * @param {boolean} isChecked - The initial checked state of the checkbox.
 * @param {string} label - The label for the checkbox.
 * @param {boolean} noHoverStyle - Removes the hover style from the checkbox if true.
 * @param {boolean} noUniqueId - If true, uses the provided id as is without generating a unique id.
 * @param {function} onChange - The function to call when the checkbox state changes.
 * @param {string} size - The size of the checkbox ('sm', 'md', 'lg').
 * @param {Object} style - The custom styles to apply to the checkbox.
 * @param {boolean} RTL - If true, applies right-to-left styles to the checkbox.
 */
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
    // State for checkbox checked status
    const [checked, setChecked] = useState(isChecked);

    // Ref for checkbox
    const ref = useRef<HTMLDivElement>(null);

    // Memoized value for dark mode status
    const isDarkMode = useMemo(() => isDark(), []);

    // Unique ID for checkbox
    const checkBoxId = useRef(noUniqueId ? id : `label-${nanoid()}`);

    // Function to toggle checkbox state
    const toggleCheck = (
      ev: PointerEvent | KeyboardEvent | React.MouseEvent
    ) => {
      ev.preventDefault();
      ev.stopPropagation();

      if (!disabled) {
        setChecked(val => {
          if (onChange) {
            onChange(checkBoxId.current, !val);
          }
          return !val;
        });
      }
    };

    // Custom hook for focus management
    useFocusNew(focusable ? (ref as React.RefObject<HTMLElement>) : null, ev =>
      toggleCheck(ev)
    );

    // Class names for different elements, memoized for performance
    const iconClass = useMemo(
      () =>
        classNames(styles.icon, {
          [styles.checked]: checked,
          [styles[`${size}`]]: true,
          [styles[`${checkBoxStyle}`]]: true,
          [styles.dark]: isDarkMode,
        }),
      [checked, size, checkBoxStyle, isDarkMode]
    );

    const labelClass = useMemo(
      () =>
        classNames(styles.label, {
          [styles[`label_${size}`]]: true,
          [styles.label_rtl]: RTL,
          [styles.dark]: isDarkMode,
        }),
      [size, RTL, isDarkMode]
    );

    const checkBoxClass = useMemo(
      () =>
        classNames(styles.checkbox, {
          'rc-checkbox-focus': focusIcon,
          [styles[size]]: true,
          [styles.disabled]: disabled,
        }),
      [focusIcon, size, disabled]
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
      [
        size,
        autoHeight,
        border,
        disabled,
        focusIcon,
        noHoverStyle,
        RTL,
        isDarkMode,
      ]
    );

    // Props for focus management
    const focusProps = useMemo(
      () => ({
        ref: ref,
        tabIndex: disabled || !focusable ? -1 : 0,
      }),
      [disabled, focusable]
    );

    const wrapperProps = useMemo(
      () =>
        !focusIcon && !disabled
          ? focusProps
          : { tabIndex: disabled || !focusable ? -1 : 0 },
      [focusIcon, disabled, focusProps, focusable]
    );
    const iconProps = useMemo(
      () => (focusIcon ? focusProps : null),
      [focusIcon, focusProps]
    );

    // Effect to sync checked state with prop
    useEffect(() => {
      if (checked !== isChecked) {
        setChecked(isChecked);
      }
    }, [isChecked]);

    // Render checkbox component
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
