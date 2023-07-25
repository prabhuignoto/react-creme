/* eslint-disable react/prop-types */
import classNames from 'classnames';
import React from 'react';
import { useImperativeHandle, useRef, useCallback } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import { Spinner } from '../spinner/spinner';
import { ButtonProps } from './button-model';
import styles from './button.module.scss';

/**
 * Button Component - A customizable button component.
 *
 * @component
 *
 * @param {object} props - The component's props
 * @param {boolean} props.border - Determines whether the button has a border. Default is true.
 * @param {ReactNode} props.children - The content inside the button. Can be text or an element.
 * @param {boolean} props.disabled - Determines whether the button is disabled. Default is false.
 * @param {boolean} props.focusable - Determines whether the button can be focused. Default is true.
 * @param {'default'|'progress'} props.type - The type of the button. Default is 'default'.
 * @param {string} props.label - The label of the button. Default is ''.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {'sm'|'md'|'lg'} props.size - The size of the button. Default is 'sm'.
 * @param {object} props.style - The style to apply to the button. Default is {}.
 * @param {'rounded'|'otherAccent'} props.accent - The accent of the button. Default is 'rounded'.
 * @param {boolean} props.isBusy - Determines whether the button is in a "busy" state (e.g., waiting for a response). Default is false.
 *
 * @returns {ReactNode} React component
 */

const Button = React.forwardRef<HTMLDivElement, ButtonProps>((props, ref) => {
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

  // check if the theme is dark mode
  const isDarkMode = isDark();

  // setup classnames for the button
  const buttonClass = classNames(
    {
      [styles['default']]: type === 'progress',
      [styles.no_border]: !border,
      [styles.disabled]: disabled || isBusy,
      [styles.dark]: isDarkMode,
      [styles[accent]]: true,
    },
    [styles[size], styles[type], styles.btn]
  );

  // setup for focus
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(
    ref,
    () =>
      ({
        focus: () => {
          buttonRef.current?.focus();
        },
      }) as HTMLDivElement
  );

  useFocusNew(focusable ? buttonRef : null);

  // determine if the button can be focused
  const tabIndex = focusable ? 0 : -1;

  // handler for button click
  const handleClick = useCallback(
    () => !disabled && onClick?.(),
    [disabled, onClick]
  );

  // handle keyboard 'Enter' event
  const handleKeyUp = useCallback(
    (ev: React.KeyboardEvent) => ev.key === 'Enter' && handleClick(),
    [handleClick]
  );

  // render the spinner
  const renderSpinner = () => (
    <span className={styles.progress_wrapper}>
      {/* <CircularProgress size={'xs'} /> */}
      <Spinner />
    </span>
  );

  // render the children
  const renderChildren = () => (
    <span className={styles.icon_container}>{children}</span>
  );

  // render the label
  const renderLabel = () => <span className={styles.label}>{label}</span>;

  return (
    <div
      className={buttonClass}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      ref={buttonRef}
      role="button"
      style={style}
      tabIndex={tabIndex}
      aria-label={label}
      aria-disabled={disabled}
      aria-busy={isBusy}
    >
      {type === 'progress' && !disabled && renderSpinner()}
      {children && renderChildren()}
      {label && type !== 'icon' && renderLabel()}
    </div>
  );
});

Button.displayName = 'Button';

export { Button };
