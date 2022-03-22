import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { InputNumber } from '..';
import { useFirstRender } from '../common/effects/useFirstRender';
import styles from './pin.module.scss';

export type PinProps = {
  RTL?: boolean;
  border?: boolean;
  length?: number;
  onChange?: (val: number) => void;
  size?: 'sm' | 'md' | 'lg';
};

const Pin: FunctionComponent<PinProps> = ({
  length = 4,
  RTL = false,
  onChange,
  size = 'sm',
  border = false,
}) => {
  const items = useRef(
    Array.from({ length }).map(() => ({
      id: nanoid(),
    }))
  );

  const [val, setVal] = useState<string>('');
  const isFirstRender = useFirstRender();

  const wrapperClass = useMemo(
    () => classNames(styles.wrapper, { [styles.RTL]: RTL }),
    []
  );

  const wrapperRef = useRef<HTMLUListElement | null>(null);

  const handleChange = useCallback(
    (val, index) => {
      if (!Number.isNaN(val)) {
        if (index + 1 < length && wrapperRef.current) {
          const ele = wrapperRef.current.querySelectorAll('li')[index + 1];
          ele.querySelector('input')?.focus();
        }
        setVal(prev => prev + val);
      }
    },
    [val]
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      onChange?.(Number.parseInt(val));
    }
  }, [val]);

  const inputWrapperClass = useMemo(
    () => classNames(styles.input_wrapper, { [styles[size]]: true }),
    []
  );

  return (
    <ul className={wrapperClass} ref={wrapperRef}>
      {items.current.map(({ id }, index) => (
        <li key={id} className={styles.item}>
          <div className={inputWrapperClass}>
            <InputNumber
              size={size}
              onChange={val => handleChange(val, index)}
              disableControls
              value={NaN}
              honorBoundaries={false}
              border={border}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export { Pin };
