import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckIcon } from '../../icons';
import useFocusNew from '../common/effects/useFocusNew';
import { isDark } from '../common/utils';
import { SwitchProps } from './switch-model';
import styles from './switch.module.scss';

const Switch: React.FunctionComponent<SwitchProps> = ({
  checked = false,
  disabled = false,
  focusable = true,
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
      setState(prev => {
        if (onChange) {
          onChange(!prev);
        }
        return !prev;
      });
    }
  };

  if (focusable) {
    useFocusNew(ref, handleToggle);
  }

  const isDarkMode = useMemo(() => isDark(), []);

  // CSS
  const switchKnobClass = useMemo(
    () =>
      classNames([styles.knob], {
        // [styles.check]: showCheckIcon,
        [styles.disabled]: disabled,
        [styles.off]: !state && !isFirstRender.current,
        [styles[`knob_${size}`]]: true,
        [styles.on]: state && !isFirstRender.current,
        [styles.on_load]: state && isFirstRender.current,
        [styles.dark]: isDarkMode,
      }),
    [state, size, disabled, showCheckIcon]
  );

  const switchClass = useMemo(
    () =>
      classNames(styles.switch, {
        [styles.disabled]: disabled,
        [styles[`${size}`]]: true,
        [styles.label_outside]: labelOutside,
        [styles.dark]: isDarkMode,
      }),
    [size, labelOutside, disabled]
  );

  const switchTrackClass = useMemo(
    () =>
      classNames(styles.track, {
        [styles.label_outside]: labelOutside,
        [styles.track_off]: !state,
        [styles.track_on]: state,
        [styles[`${size}`]]: true,
        [styles.track_disabled]: disabled,
        [styles.dark]: isDarkMode,
      }),
    [state, size, disabled, labelOutside]
  );

  const switchLabelClass = useMemo(
    () =>
      classNames([styles.label], {
        [styles.label_off]: !state,
        [styles.label_on]: state,
        [styles[`label_${size}`]]: true,
        [styles.label_outside]: labelOutside,
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

Switch.displayName = 'Switch';

export { Switch };
