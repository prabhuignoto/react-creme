import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CheckIcon } from '../../icons';
import { useFocus } from '../common/effects/useFocus';
import { SwitchProps } from './switch-model';
import './switch.scss';

const Switch: React.FunctionComponent<SwitchProps> = ({
  checked = false,
  disabled = false,
  focusable = false,
  label,
  labelOutside = false,
  onChange,
  size = 'sm',
  style,
  width = 50,
  showCheckIcon = false,
}) => {
  const [state, setState] = useState(checked);
  const ref = useRef(null);
  const id = useRef(`rc-switch-${nanoid()}`);

  // flag to check if the component is rendering the first time
  const isFirstRender = useRef(true);

  // handler
  const handleToggle = () => {
    if (!disabled) {
      setState((prev) => {
        if (onChange) {
          onChange(!prev);
        }
        return !prev;
      });
    }
  };

  if (focusable) {
    useFocus(ref, handleToggle);
  }

  // CSS
  const switchKnobClass = useMemo(
    () =>
      classNames(['rc-switch-knob'], {
        'rc-switch-check-icon': showCheckIcon,
        'rc-switch-disabled': disabled,
        'rc-switch-off': !state && !isFirstRender.current,
        [`rc-switch-knob-${size}`]: true,
        'rc-switch-on': state && !isFirstRender.current,
        'rc-switch-on-load': state && isFirstRender.current,
      }),
    [state, size, disabled, showCheckIcon]
  );

  const switchClass = useMemo(
    () =>
      classNames('rc-switch', {
        'rc-disabled': disabled,
        [`rc-switch-${size}`]: true,
        'rc-switch-label-outside': labelOutside,
      }),
    [size, labelOutside, disabled]
  );

  const switchTrackClass = useMemo(
    () =>
      classNames('rc-switch-track', {
        'rc-switch-label-outside': labelOutside,
        'rc-switch-off': !state,
        'rc-switch-on': state,
        [`rc-switch-${size}`]: true,
        'rc-switch-track-disabled': disabled,
      }),
    [state, size, disabled, labelOutside]
  );

  const switchLabelClass = useMemo(
    () =>
      classNames(['rc-switch-label'], {
        'rc-switch-label-off': !state,
        'rc-switch-label-on': state,
        [`rc-switch-label-${size}`]: true,
        'rc-switch-label-outside': labelOutside,
      }),
    [state, labelOutside]
  );

  const switchStyle = useMemo(
    () =>
      ({
        '--min-width': `${width}px`,
        ...style,
      } as React.CSSProperties),
    []
  );

  // Effects
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  const switchTabIndex = useMemo(
    () => !disabled && focusable && { tabIndex: 0 },
    [disabled]
  );

  return (
    <div
      className={switchClass}
      onClick={handleToggle}
      role="switch"
      aria-checked={state}
      aria-labelledby={id.current}
      style={switchStyle}
      ref={ref}
      {...switchTabIndex}
    >
      <span className={switchTrackClass}>
        <span className={switchKnobClass}>
          {showCheckIcon && <CheckIcon />}
        </span>
        {label && !labelOutside && (
          <span className={switchLabelClass} id={id.current}>
            {label}
          </span>
        )}
      </span>
      {labelOutside && (
        <span className={switchLabelClass} id={id.current}>
          {label}
        </span>
      )}
    </div>
  );
};

export { Switch };
