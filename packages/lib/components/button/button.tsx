/* eslint-disable react/prop-types */
import classNames from 'classnames';
import * as React from 'react';
import { useImperativeHandle, useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import { Spinner } from '../spinner/spinner';
import { ButtonProps } from './button-model';
import styles from './button.module.scss';

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
  } = props;

  const isDarkMode = useMemo(() => isDark(), []);

  const buttonClass = useMemo(
    () =>
      classNames(
        {
          [styles[`default`]]: type === 'progress',
          [styles.no_border]: !border,
          [styles.disabled]: disabled,
          [styles.dark]: isDarkMode,
        },
        [styles[size], styles[type], styles.btn]
      ),
    [disabled, isDarkMode]
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
      } as HTMLDivElement)
  );

  useFocusNew(focusable ? buttonRef : null);

  const focusableProps = useMemo(
    () => ({
      tabIndex: focusable ? 0 : -1,
    }),
    []
  );

  // handler for button click
  const handleClick = () => !disabled && onClick?.();

  const handleKeyUp = (ev: React.KeyboardEvent) =>
    ev.key === 'Enter' && handleClick();

  return (
    <div
      className={buttonClass}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      ref={buttonRef}
      role="button"
      style={style}
      {...focusableProps}
      aria-label={label}
    >
      {type === 'progress' && !disabled && (
        <span className={styles.progress_wrapper} role="img">
          {/* <CircularProgress size={'xs'} /> */}
          <Spinner />
        </span>
      )}
      {children && (
        <span className={styles.icon_container} role="img">
          {children}
        </span>
      )}
      {label && type !== 'icon' && (
        <span className={styles.label}>{label}</span>
      )}
    </div>
  );
});

Button.displayName = 'Button';

export { Button };
