import { CheckIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import { SwitchProps } from './switch-model';
import styles from './switch.module.scss';

/**
 * Switch (Toggle) Component with full accessibility support
 *
 * Keyboard support:
 * - Space/Enter: Toggle switch
 * - Tab: Focus switch
 *
 * Accessibility:
 * - Implements WAI-ARIA switch pattern
 * - Supports screen readers with proper ARIA attributes
 * - Visible focus indicator for keyboard navigation
 * - Requires accessible name via label or aria-label
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Switch label="Dark Mode" checked={isDark} onChange={setIsDark} />
 *
 * // With different sizes
 * <Switch label="Enable notifications" size="md" checked />
 *
 * // Read-only state
 * <Switch label="Premium feature" checked readOnly />
 * ```
 */
const Switch: React.FunctionComponent<SwitchProps> = ({
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  checked = false,
  disabled = false,
  focusable = true,
  label,
  loading = false,
  onChange,
  readOnly = false,
  size = 'sm',
  style,
  width = 50,
  showCheckIcon = false,
}) => {
  const [state, setState] = useState(checked);
  const ref = useRef<HTMLDivElement>(null);
  const id = useRef(`rc-switch-${nanoid()}`);

  // flag to check if the component is rendering the first time
  const isFirstRender = useRef(true);

  // Warn in development if no accessible name is provided
  useEffect(() => {
    if (import.meta.env.DEV && !label && !ariaLabel) {
      console.warn(
        'Switch: No accessible name provided. Please provide either "label" or "aria-label" prop for accessibility.'
      );
    }
  }, [label, ariaLabel]);

  // handler
  const handleToggle = () => {
    if (!disabled && !readOnly && !loading) {
      setState(prev => {
        if (onChange) {
          onChange(!prev);
        }
        return !prev;
      });
    }
  };

  useFocusNew(
    focusable ? (ref as React.RefObject<HTMLElement>) : null,
    focusable ? handleToggle : null
  );

  const isDarkMode = useMemo(() => isDark(), []);

  // CSS
  const switchKnobClass = useMemo(
    () =>
      classNames([styles.knob], {
        [styles.disabled]: disabled,
        [styles.loading]: loading,
        [styles.off]: !state && !isFirstRender.current,
        [styles[`knob_${size}`]]: true,
        [styles.on]: state && !isFirstRender.current,
        [styles.on_load]: state && isFirstRender.current,
        [styles.dark]: isDarkMode,
      }),
    [state, size, disabled, loading, isDarkMode]
  );

  const switchClass = useMemo(
    () =>
      classNames(styles.switch, {
        [styles.disabled]: disabled,
        [styles.read_only]: readOnly,
        [styles[`${size}`]]: true,
        [styles.label_outside]: true,
        [styles.dark]: isDarkMode,
      }),
    [size, disabled, readOnly, isDarkMode]
  );

  const switchTrackClass = useMemo(
    () =>
      classNames(styles.track, {
        [styles.track_off]: !state,
        [styles.track_on]: state,
        [styles[`${size}`]]: true,
        [styles.track_disabled]: disabled,
        [styles.track_read_only]: readOnly,
        [styles.dark]: isDarkMode,
      }),
    [state, size, disabled, readOnly, isDarkMode]
  );

  const switchLabelClass = useMemo(
    () =>
      classNames([styles.label], {
        [styles.label_off]: !state,
        [styles.label_on]: state,
        [styles[`label_${size}`]]: true,
        [styles.label_outside]: true,
      }),
    [state, size]
  );

  const switchStyle = useMemo(
    () =>
      ({
        '--min-width': `${width}px`,
        ...style,
      }) as React.CSSProperties,
    [width, style]
  );

  // Effects
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  // Sync internal state with external checked prop
  useEffect(() => {
    setState(checked);
  }, [checked]);

  const switchTabIndex = useMemo(
    () => ({ tabIndex: !disabled && !readOnly && focusable ? 0 : -1 }),
    [disabled, readOnly, focusable]
  );

  // Determine which accessible name to use
  const accessibleNameProps = useMemo(() => {
    if (label) {
      return { 'aria-labelledby': id.current };
    } else if (ariaLabel) {
      return { 'aria-label': ariaLabel };
    }
    return {};
  }, [label, ariaLabel]);

  return (
    <div
      className={switchClass}
      onClick={handleToggle}
      role="switch"
      aria-checked={state}
      aria-disabled={disabled || undefined}
      aria-readonly={readOnly || undefined}
      aria-describedby={ariaDescribedby}
      {...accessibleNameProps}
      style={switchStyle}
      ref={ref}
      {...switchTabIndex}
    >
      <span className={switchTrackClass}>
        <span className={switchKnobClass}>
          {showCheckIcon && state && <CheckIcon />}
          {loading && (
            <span className={styles.loading_spinner} aria-label="Loading">
              ⋯
            </span>
          )}
        </span>
      </span>
      {label && (
        <span className={switchLabelClass} id={id.current}>
          {label}
        </span>
      )}
    </div>
  );
};

Switch.displayName = 'Switch';

export { Switch };
