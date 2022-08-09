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
import { isDark } from '../common/utils';
import { RadioProps } from './radio-model';
import styles from './radio.module.scss';

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
    focusable = true,
    withGroup = false,
    fullWidth = true,
    RTL = false,
  }: RadioProps) => {
    const idRef = useRef<string>(id || nanoid());

    const labelID = useRef(`label-${idRef.current}`);

    const radioRef = useRef<HTMLLIElement | null>(null);

    const [checked, setChecked] = useState<boolean | null>(isChecked);

    const isFirstRender = useFirstRender();

    const canToggle = useMemo(() => !disabled, [disabled]);
    const isDarkMode = useMemo(() => isDark(), []);

    const toggleCheck = useCallback(() => {
      if (canToggle) {
        if (!withGroup) {
          setChecked(prev => !prev);
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

    const canFocus = useMemo(
      () => focusable && !disabled,
      [disabled, focusable]
    );

    useFocusNew(canFocus ? radioRef : null, canFocus ? toggleCheck : null);

    const radioWrapperClass = useMemo(() => {
      return cls(styles.wrapper, {
        [styles[size]]: true,
        [styles.disabled]: disabled,
        [styles.full_width]: fullWidth,
        [styles.rtl]: RTL,
        [styles.dark]: isDarkMode,
      });
    }, [disabled, fullWidth]);

    const radioClass = useMemo(
      () =>
        cls(styles.radio, {
          [styles.ico_checked]: checked,
          [styles.disabled]: disabled,
          [styles[size]]: true,
        }),
      [checked, disabled]
    );

    const radioIconClass = useMemo(() => {
      return cls(styles.icon, {
        [styles.ico_checked]: checked,
        [styles.ico_unchecked]: !isFirstRender.current && !checked,
        [styles.dark]: isDarkMode,
      });
    }, [checked]);

    const radioLabelClass = useMemo(() => {
      return cls([styles.label, styles[`label_${size}`]], {
        [styles.disabled]: disabled,
        [styles.rtl]: RTL,
        [styles.dark]: isDarkMode,
      });
    }, [size, disabled]);

    useEffect(() => {
      if (!isFirstRender.current) {
        setChecked(isChecked);
      }
    }, [isChecked]);

    const htmlAttrs = useMemo(
      () => ({
        'aria-checked': !!checked,
        ...(canFocus ? { onClick: toggleCheck } : null),
        ref: radioRef,
        role: 'radio',
        tabIndex: canFocus ? 0 : -1,
      }),
      [checked, disabled, canFocus]
    );

    return (
      <li
        className={radioWrapperClass}
        aria-labelledby={labelID.current}
        style={style}
        {...htmlAttrs}
      >
        <div className={radioClass} id={idRef.current}>
          <span className={radioIconClass}></span>
        </div>
        <label className={radioLabelClass} id={labelID.current}>
          {label}
        </label>
      </li>
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
