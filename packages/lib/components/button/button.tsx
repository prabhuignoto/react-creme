import classNames from 'classnames';
import React, { useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { CircularProgress } from '../progress/circular-progress';
import { ButtonProps } from './button-model';
import './button.scss';

const Button: React.FunctionComponent<ButtonProps> = ({
  border = true,
  children,
  disabled = false,
  focusable = true,
  type = 'default',
  label = '',
  onClick,
  size = 'sm',
  style = {},
}) => {
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
  const ref = useRef(null);

  if (focusable) {
    // useFocusNew(ref, onClick);
    useFocusNew(ref);
  }

  const focusableProps = useMemo(
    () => ({
      tabIndex: focusable ? 0 : -1,
    }),
    []
  );

  // handler for button click
  const handleClick = () => !disabled && onClick?.();

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      ref={ref}
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
    </button>
  );
};

Button.displayName = 'Button';

export { Button };
