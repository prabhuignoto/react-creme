import classNames from 'classnames';
import React from 'react';
import { useImperativeHandle, useRef, useCallback, useMemo } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import { Spinner } from '../spinner/spinner';
import { ButtonProps } from './button-model';
import styles from './button.module.scss';

/**
 * Button Component - A customizable, accessible button component.
 *
 * @component
 *
 * @example
 * // Basic button with label
 * <Button label="Click me" onClick={handleClick} />
 *
 * @example
 * // Primary button with children
 * <Button type="primary" size="lg">
 *   <Icon name="plus" /> Add Item
 * </Button>
 *
 * @param {string} [props.label=''] - The text label for the button. Used for accessibility when no children.
 * @param {React.ReactNode} [props.children] - The content inside the button (can override or supplement label).
 * @param {boolean} [props.disabled=false] - Disables the button, preventing clicks and visual changes.
 * @param {boolean} [props.focusable=true] - Whether the button can receive keyboard focus.
 * @param {'default' | 'primary' | 'danger' | 'icon' | 'progress'} [props.type='default'] - The visual style type of the button.
 * @param {'sm' | 'md' | 'lg'} [props.size='sm'] - The size of the button.
 * @param {'rounded' | 'flat'} [props.accent='rounded'] - The border style accent.
 * @param {boolean} [props.border=true] - Whether the button shows a border.
 * @param {boolean} [props.primary=false] - Whether to render as a primary button (deprecated, use type="primary").
 * @param {boolean} [props.isBusy=false] - Whether the button is in a loading state (shows spinner, disables clicks).
 * @param {(event?: React.MouseEvent | React.KeyboardEvent) => void} [props.onClick] - Callback when button is clicked or activated via keyboard.
 * @param {React.CSSProperties} [props.style={}] - Inline styles to apply to the button.
 *
 * @returns {React.ReactElement} The rendered button element.
 */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    border = true,
    children,
    disabled = false,
    focusable = true,
    type = 'default',
    label = '',
    onClick,
    size = 'sm',
    style = {},
    accent = 'rounded',
    isBusy = false,
  } = props;

  // Check if the theme is dark mode (called once)
  const isDarkMode = isDark();

  // setup classnames for the button (memoized for performance)
  const buttonClass = useMemo(
    () =>
      classNames(
        {
          [styles['default']]: type === 'progress',
          [styles.no_border]: !border,
          [styles.disabled]: disabled || isBusy,
          [styles.dark]: isDarkMode,
          [styles[accent]]: true,
        },
        [styles[size], styles[type], styles.btn]
      ),
    [type, border, disabled, isBusy, isDarkMode, accent, size]
  );

  // Setup for focus management with useFocusNew hook
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useFocusNew(focusable ? (buttonRef as React.RefObject<HTMLElement>) : null);

  // Expose focus method via imperative handle
  useImperativeHandle(ref, () => buttonRef.current);

  // Handler for button click (prevents click when disabled or busy)
  const handleClick = useCallback(
    () => !disabled && !isBusy && onClick?.(),
    [disabled, isBusy, onClick]
  );

  // Handle keyboard 'Space' event (on keydown to prevent scroll)
  // Note: native button handles 'Enter' automatically
  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === ' ' && !disabled && !isBusy) {
        ev.preventDefault();
        handleClick();
      }
    },
    [handleClick, disabled, isBusy]
  );

  // Determine accessible label: use label prop if provided, otherwise children text
  const accessibleLabel = label || (typeof children === 'string' ? children : undefined);

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={buttonRef}
      disabled={disabled || isBusy}
      style={style}
      aria-label={accessibleLabel}
      aria-busy={isBusy}
      type="button"
      tabIndex={focusable ? undefined : -1}
    >
      {type === 'progress' && !disabled && (
        <span className={styles.progress_wrapper}>
          <Spinner />
        </span>
      )}
      {children && <span className={styles.icon_container}>{children}</span>}
      {label && type !== 'icon' && <span className={styles.label}>{label}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
