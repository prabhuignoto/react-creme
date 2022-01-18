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
import { RadioProps } from './radio-model';
import './radio.scss';

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
    focusable = false,
    withGroup = false,
    fullWidth = true,
    RTL = false,
  }: RadioProps) => {
    const idRef = useRef<string>(id || nanoid());

    const labelID = useRef(`label-${idRef.current}`);

    const radioRef = useRef<HTMLDivElement | null>(null);

    const [checked, setChecked] = useState<boolean | null>(isChecked);

    const isFirstRender = useFirstRender();

    const canToggle = useMemo(() => !disabled, [disabled]);

    const toggleCheck = useCallback(() => {
      if (canToggle) {
        if (!withGroup) {
          setChecked((prev) => !prev);
        } else {
          setChecked(true);
        }
        onChange &&
          onChange({
            id,
            selected: !withGroup ? !checked : true,
            value,
          });
      }
    }, [canToggle, checked]);

    if (focusable) {
      useFocusNew(radioRef, toggleCheck);
    }

    const radioWrapperClass = useMemo(() => {
      return cls('rc-radio-wrapper', {
        [`rc-radio-${size}`]: true,
        'rc-radio-disabled': disabled,
        'rc-radio-full-width': fullWidth,
        'rc-radio-rtl': RTL,
      });
    }, [disabled, fullWidth]);

    const radioClass = useMemo(
      () =>
        cls(['rc-radio'], {
          'rc-radio-checked': checked,
          'rc-radio-disabled': disabled,
          [`rc-radio-${size}`]: true,
        }),
      [checked, disabled]
    );

    const radioIconClass = useMemo(() => {
      return cls(['rc-radio-icon'], {
        'rc-radio-ico-checked': checked,
        'rc-radio-ico-un-checked': !isFirstRender.current && !checked,
      });
    }, [checked]);

    const radioLabelClass = useMemo(() => {
      return cls(['rc-radio-label', `rc-radio-label-${size}`], {
        'rc-radio-disabled': disabled,
        'rc-radio-rtl': RTL,
      });
    }, [size, disabled]);

    useEffect(() => {
      if (!isFirstRender.current) {
        setChecked(isChecked);
      }
    }, [isChecked]);

    const focusableProps = useMemo(
      () => ({
        'aria-checked': !!checked,
        onClick: toggleCheck,
        ref: radioRef,
        tabIndex: !disabled && focusable ? 0 : -1,
      }),
      [checked]
    );

    const wrapperProps = useMemo(() => focusableProps, []);

    return (
      <div
        className={radioWrapperClass}
        aria-labelledby={labelID.current}
        role="radio"
        style={style}
        {...wrapperProps}
      >
        <div className={radioClass} id={idRef.current}>
          <span className={radioIconClass}></span>
        </div>
        <label className={radioLabelClass} id={labelID.current}>
          {label}
        </label>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.disabled === nextProps.disabled &&
      prevProps.isChecked === nextProps.isChecked
    );
  }
);

Radio.displayName = 'Radio';

export { Radio };
