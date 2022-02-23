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
import { Input } from '../input/input';
import { InputNumberProps } from './input-number.model';
import './input-number.scss';

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

  const inputClass = useMemo(
    () =>
      classNames('rc-input-number', {
        [`rc-input-number-${size}`]: true,
        'rc-input-number-border': border,
        'rc-input-number-rtl': RTL,
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
      <div className="rc-input-number-controls">
        <span
          role="button"
          tabIndex={0}
          className="rc-input-number-btn increment"
          onClick={increment}
          aria-label="increment"
        >
          <ChevronDownIcon />
        </span>
        <span
          role="button"
          tabIndex={0}
          className="rc-input-number-btn decrement"
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
