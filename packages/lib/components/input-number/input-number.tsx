import { ChevronDownIcon } from '@icons';
import classNames from 'classnames';
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
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
  maxLength = Number.MAX_VALUE,
  onDelete,
}) => {
  const isDarkMode = useMemo(() => isDark(), []);

  const initialValue = useMemo(() => {
    if (!honorBoundaries) return value;
    if (!value) return start;
    if (value > end) return end;
    if (value < start) return start;
    return value;
  }, [value, honorBoundaries, start, end]);

  const [number, setNumber] = useState(initialValue);

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
    [number, end, onChange]
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
    [number, start, onChange]
  );

  const inputClass = useMemo(
    () =>
      classNames(styles.input_number, {
        [styles[size]]: true,
        [styles.border]: border,
        [styles.rtl]: RTL,
        [styles.dark]: isDarkMode,
      }),
    [size, border, RTL, isDarkMode]
  );

  const handleKeyUp = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === 'Delete' || ev.key === 'Backspace') {
        ev.preventDefault();
        onDelete?.();
      }
    },
    [onDelete]
  );

  const handleChange = useCallback(
    (val: string) => {
      const num = Number.parseInt(val);
      if (!Number.isNaN(num)) {
        setNumber(num);
        onChange?.(num);
      }
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
        ev.preventDefault();
        if (ev.key === 'ArrowUp') {
          onIncrement(ev);
        } else {
          onDecrement(ev);
        }
      }
    },
    [onIncrement, onDecrement]
  );

  return (
    <div
      className={inputClass}
      role="spinbutton"
      aria-label="number input"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
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
            aria-label="increment value"
            style={{
              marginBottom: 'var(--rc-space-1)',
              transform: 'rotate(180deg)',
            }}
          >
            <ChevronDownIcon />
          </Button>
          <Button
            type="icon"
            onClick={onDecrement}
            size={size}
            label="decrement"
            aria-label="decrement value"
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
