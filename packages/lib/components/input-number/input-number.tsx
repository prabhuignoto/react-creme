import classNames from 'classnames';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ChevronDownIcon } from '../../icons';
import { useFirstRender } from '../common/effects/useFirstRender';
import { isDark } from '../common/utils';
import { Input } from '../input/input';
import { InputNumberProps } from './input-number.model';
import styles from './input-number.module.scss';

const InputNumber: FunctionComponent<InputNumberProps> = ({
  end = Number.MAX_VALUE,
  start = 1,
  value = 0,
  onChange,
  size = 'sm',
  border = false,
  RTL = false,
}) => {
  const [number, setNumber] = useState(
    value ? (value > end ? end : value < start ? start : value) : start
  );

  const isFirstRender = useFirstRender();

  const increment = useCallback(() => {
    if (number + 1 <= end) {
      setNumber(number + 1);
    }
  }, [number, 1, end]);

  const decrement = useCallback(() => {
    if (number - 1 >= start) {
      setNumber(number - 1);
    }
  }, [number, 1, start]);

  useEffect(() => {
    if (!isFirstRender.current) {
      onChange?.(number);
    }
  }, [number]);

  const isDarkMode = useMemo(() => isDark(), []);

  const inputClass = useMemo(
    () =>
      classNames(styles.input_number, {
        [styles[size]]: true,
        [styles.border]: border,
        [styles.rtl]: RTL,
        [styles.dark]: isDarkMode,
      }),
    []
  );

  return (
    <div className={inputClass}>
      <Input
        controlled
        value={number + ''}
        enableClear={false}
        transparentBgColor
        focusable={false}
        size={size}
        type="number"
      />
      <div className={styles.controls}>
        <span
          role="button"
          tabIndex={0}
          className={classNames(styles.btn, styles.increment)}
          onClick={increment}
          aria-label="increment"
        >
          <ChevronDownIcon />
        </span>
        <span
          role="button"
          tabIndex={0}
          className={classNames(styles.btn, styles.decrement)}
          onClick={decrement}
          aria-label="decrement"
        >
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  );
};

export { InputNumber };
