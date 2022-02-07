/* eslint-disable react/prop-types */
import classNames from 'classnames';
import * as React from 'react';
import { useImperativeHandle, useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { CircularProgress } from '../progress/circular-progress';
import { ButtonProps } from './button-model';
import './button.scss';

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
  // classes
  const buttonClass = useMemo(
    () =>
      classNames(
        {
          'rc-btn-default': type === 'progress',
          'rc-btn-no-border': !border,
          'rc-disabled': disabled,
        },
        [`rc-btn-${size}`, `rc-btn-${type}`, 'rc-btn']
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
        <span className="rc-btn-progress-wrapper">
          <CircularProgress size={'xs'} />
        </span>
      )}
      {children && <span className="rc-btn-icon-container">{children}</span>}
      {label && type !== 'icon' && (
        <span className="rc-btn-label">{label}</span>
      )}
    </div>
  );
});

Button.displayName = 'Button';

export { Button };
