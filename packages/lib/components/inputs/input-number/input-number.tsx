import { isDark } from '@common';
import { ChevronDownIcon } from '@common/icons';
import classNames from 'classnames';
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Button } from '../../core/button/button';
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
  maxLength = Number.MAX_VALUE,
  onDelete,
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

  const onIncrement = useCallback(
    (ev?: React.KeyboardEvent | React.MouseEvent) => {
      if (number + 1 <= end) {
        const newVal = number + 1;
        setNumber(newVal);
        onChange?.(newVal);
      } else {
        ev?.preventDefault();
        ev?.stopPropagation();
        setNumber(end);
      }
    },
    [number]
  );

  const onDecrement = useCallback(
    (ev?: React.KeyboardEvent | React.MouseEvent) => {
      if (number - 1 >= start) {
        const newVal = number - 1;
        setNumber(newVal);
        onChange?.(newVal);
      } else {
        ev?.preventDefault();
        setNumber(start);
      }
    },
    [number]
  );

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
      if (ev.key === 'Delete' || ev.key === 'Backspace') {
        ev.preventDefault();
        onDelete?.();
      }
    },
    [number, onIncrement, onDecrement]
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
        transparentBg
        focusable={focusable}
        size={size}
        type="number"
        min={start}
        max={end}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        onChange={handleChange}
        alignCenter={alignCenter}
        maxLength={maxLength}
      />
      {!disableControls && (
        <div className={styles.controls}>
          <Button
            type="icon"
            onClick={onIncrement}
            size={size}
            label="increment"
            style={{ marginBottom: '0.25rem', transform: 'rotate(180deg)' }}
          >
            <ChevronDownIcon />
          </Button>
          <Button
            type="icon"
            onClick={onDecrement}
            size={size}
            label="decrement"
          >
            <ChevronDownIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

InputNumber.displayName = 'InputNumber';

export { InputNumber };
