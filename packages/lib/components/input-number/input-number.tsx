import classNames from 'classnames';
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { ChevronDownIcon } from '../../icons';
import { Button } from '../button/button';
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
  placeholder = '',
  disableControls = false,
  focusable = true,
  honorBoundaries = true,
  alignCenter = true,
}) => {
  const [number, setNumber] = useState(
    honorBoundaries
      ? value
        ? value > end
          ? end
          : value < start
          ? start
          : value
        : start
      : value
  );

  const onIncrement = useCallback(() => {
    if (number + 1 <= end) {
      const newVal = number + 1;
      setNumber(newVal);
      onChange?.(newVal);
    }
  }, [number]);

  const onDecrement = useCallback(() => {
    if (number - 1 >= start) {
      const newVal = number - 1;
      setNumber(newVal);
      onChange?.(newVal);
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

  const handleKeyUp = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        onIncrement();
      } else if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        onDecrement();
      }
    },
    [number]
  );

  const handleChange = useCallback(
    (val: string) => {
      const num = Number.parseInt(val);
      setNumber(num);
      onChange?.(num);
    },
    [number]
  );

  return (
    <div className={inputClass}>
      <Input
        controlled
        value={number + ''}
        enableClear={false}
        transparentBgColor
        focusable={focusable}
        size={size}
        type="number"
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        onChange={handleChange}
        alignCenter={alignCenter}
      />
      {!disableControls && (
        <div className={styles.controls}>
          <Button
            type="icon"
            onClick={onIncrement}
            size={size}
            style={{ marginBottom: '0.25rem', transform: 'rotate(180deg)' }}
          >
            <ChevronDownIcon />
          </Button>
          <Button type="icon" onClick={onDecrement} size={size}>
            <ChevronDownIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

InputNumber.displayName = 'InputNumber';

export { InputNumber };
