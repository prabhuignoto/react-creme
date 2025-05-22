import cls from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFirstRender } from '../common/effects/useFirstRender';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import { RadioProps } from './radio-model';
import styles from './radio.module.scss';

/**
 * Radio Component
 *    @property {boolean} disabled - Whether the radio is disabled (default: false).
 *    @property {string} id - An optional ID for the radio element.
 *    @property {boolean} isChecked - Whether the radio is checked (default: false).
 *    @property {string} label - The label text for the radio button.
 *    @property {Function} onChange - Callback function called when the radio state changes.
 *    @property {any} value - The value associated with the radio button.
 *    @property {string} size - The size of the radio button (default: 'sm').
 *    @property {Object} style - Additional style to be applied to the radio element.
 *    @property {boolean} focusable - Whether the radio is focusable (default: true).
 *    @property {boolean} withGroup - Whether the radio is part of a group (default: false).
 *    @property {boolean} fullWidth - Whether the radio button should occupy full width (default: true).
 *    @property {boolean} RTL - Whether the layout is right-to-left (default: false).
 * @returns {JSX.Element} The Radio component.
 */
const Radio: React.FunctionComponent<RadioProps> = React.memo(
  ({
    disabled,
    id,
    isChecked = false,
    label,
    onChange,
    value,
    size = 'sm',
    style,
    focusable = true,
    withGroup = false,
    fullWidth = true,
    RTL = false,
  }: RadioProps) => {
    // Generate a unique ID for the radio if not provided
    const idRef = useRef<string>(id || nanoid());

    // Reference to the label element for accessibility
    const labelID = useRef(`label-${idRef.current}`);

    // Reference to the radio container element for focus handling
    const radioRef = useRef<HTMLLIElement>(null);

    // State to manage the checked state of the radio
    const [checked, setChecked] = useState<boolean | null>(isChecked);

    // Detect if it's the first render of the component
    const isFirstRender = useFirstRender();

    // Determine whether the radio can be toggled (not disabled)
    const canToggle = useMemo(() => !disabled, [disabled]);

    // Detect if the theme is dark mode
    const isDarkMode = useMemo(() => isDark(), []);

    // Function to toggle the checked state of the radio
    const toggleCheck = useCallback(() => {
      if (canToggle) {
        if (!withGroup) {
          setChecked(prev => !prev);
        } else {
          setChecked(true);
        }
        onChange?.({
          id,
          selected: !withGroup ? !checked : true,
          value,
        });
      }
    }, [canToggle, checked, onChange, value, withGroup]);

    // Determine if the radio is focusable (not disabled and focusable)
    const canFocus = useMemo(
      () => focusable && !disabled,
      [disabled, focusable]
    );

    // Set up focus management using custom hook
    useFocusNew(
      canFocus ? (radioRef as React.RefObject<HTMLElement>) : null,
      canFocus ? toggleCheck : null
    );

    // Calculate classes for the radio wrapper element
    const radioWrapperClass = useMemo(() => {
      return cls(styles.wrapper, {
        [styles[size]]: true,
        [styles.disabled]: disabled,
        [styles.full_width]: fullWidth,
        [styles.rtl]: RTL,
        [styles.dark]: isDarkMode,
      });
    }, [disabled, fullWidth, RTL, size, isDarkMode]);

    // Calculate classes for the radio input element
    const radioClass = useMemo(
      () =>
        cls(styles.radio, {
          [styles.ico_checked]: checked,
          [styles.disabled]: disabled,
          [styles[size]]: true,
        }),
      [checked, disabled, size]
    );

    // Calculate classes for the radio icon element
    const radioIconClass = useMemo(() => {
      return cls(styles.icon, {
        [styles.ico_checked]: checked,
        [styles.ico_unchecked]: !isFirstRender.current && !checked,
        [styles.dark]: isDarkMode,
      });
    }, [checked, isFirstRender, isDarkMode]);

    // Calculate classes for the radio label element
    const radioLabelClass = useMemo(() => {
      return cls([styles.label, styles[`label_${size}`]], {
        [styles.disabled]: disabled,
        [styles.rtl]: RTL,
        [styles.dark]: isDarkMode,
      });
    }, [size, disabled, RTL, isDarkMode]);

    // Handle updates to the isChecked prop after the first render
    useEffect(() => {
      if (!isFirstRender.current) {
        setChecked(isChecked);
      }
    }, [isChecked, isFirstRender]);

    // Calculate HTML attributes for the radio input element
    const htmlAttrs = useMemo(
      () => ({
        'aria-checked': !!checked,
        ...(canFocus ? { onClick: toggleCheck } : null),
        ref: radioRef,
        role: 'radio',
        tabIndex: canFocus ? 0 : -1,
      }),
      [canFocus, checked, toggleCheck]
    );

    return (
      <li
        className={radioWrapperClass}
        aria-labelledby={labelID.current}
        style={style}
        {...htmlAttrs}
      >
        <div className={radioClass} id={idRef.current}>
          <span className={radioIconClass}></span>
        </div>
        <label className={radioLabelClass} id={labelID.current}>
          {label}
        </label>
      </li>
    );
  },
  // Memoization function for React.memo to optimize rendering
  (prevProps, nextProps) => {
    return (
      prevProps.disabled === nextProps.disabled &&
      prevProps.isChecked === nextProps.isChecked
    );
  }
);

// Set a display name for the component (useful for debugging)
Radio.displayName = 'Radio';

export { Radio };
