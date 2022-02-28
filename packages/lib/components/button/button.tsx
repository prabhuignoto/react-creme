/* eslint-disable react/prop-types */
import classNames from 'classnames';
import * as React from 'react';
import { useImperativeHandle, useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import { CircularProgress } from '../progress/circular-progress';
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

  // classes
  const buttonClass = useMemo(
    () =>
      classNames(
        {
          [styles[`btn_default`]]: type === 'progress',
          [styles.btn_no_border]: !border,
          [styles.disabled]: disabled,
          [styles.dark]: isDarkMode,
        },
        [styles[`btn_${size}`], styles[`btn_${type}`], styles['btn']]
      ),
    [disabled]
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

  if (focusable) {
    // useFocusNew(ref, onClick);
    useFocusNew(buttonRef);
  }

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
        <span className={styles.btn_progress_wrapper} role="img">
          <CircularProgress size={'xs'} />
        </span>
      )}
      {children && (
        <span className={styles.btn_icon_container} role="img">
          {children}
        </span>
      )}
      {label && type !== 'icon' && (
        <span className={styles.btn_label}>{label}</span>
      )}
    </div>
  );
});

Button.displayName = 'Button';

export { Button };
