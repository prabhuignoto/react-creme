import classNames from 'classnames';
import { nanoid } from 'nanoid';
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { InputNumber } from '..';
import { useFirstRender } from '../../common/effects/useFirstRender';
import { PinProps } from './pin.model';
import styles from './pin.module.scss';

const Pin: FunctionComponent<PinProps> = ({
  length = 4,
  RTL = false,
  onChange,
  size = 'sm',
  border = false,
  autoJump = true,
}) => {
  const items = useRef(
    Array.from({ length }).map(() => ({
      id: nanoid(),
    }))
  );

  const [pinVal, setPinVal] = useState<string | null>(null);
  const isFirstRender = useFirstRender();

  const wrapperClass = useMemo(
    () => classNames(styles.wrapper, RTL ? styles.RTL : ''),
    []
  );

  const wrapperRef = useRef<HTMLUListElement | null>(null);

  const onRefLoad = useCallback((node: HTMLUListElement) => {
    if (node) {
      wrapperRef.current = node;
    }
  }, []);

  const handleChange = useCallback(
    (val: number, index: number) => {
      if (!Number.isNaN(val)) {
        if (index + 1 < length && wrapperRef.current && autoJump) {
          const ele = wrapperRef.current.querySelectorAll('li')[index + 1];
          ele.querySelector('input')?.focus();
        }
        setPinVal(prev => (prev || '') + val);
      }
    },
    [pinVal]
  );

  const handleDelete = useCallback(
    (idx: number) => {
      const _val = pinVal && pinVal.slice(0, idx);

      if (_val && _val.length < length && idx > 0 && autoJump) {
        wrapperRef.current
          ?.querySelectorAll('li')
          [idx - 1].querySelector('input')
          ?.focus();
      }
    },
    [pinVal]
  );

  useEffect(() => {
    if (!isFirstRender.current && pinVal) {
      onChange?.(Number.parseInt(pinVal));
    }
  }, [pinVal]);

  const inputWrapperClass = useMemo(
    () => classNames(styles.input_wrapper, { [styles[size]]: true }),
    []
  );

  return (
    <ul className={wrapperClass} ref={onRefLoad}>
      {items.current.map(({ id }, index) => (
        <li key={id} className={styles.item}>
          <div className={inputWrapperClass}>
            <InputNumber
              size={size}
              onChange={value => handleChange(value, index)}
              disableControls
              value={NaN}
              honorBoundaries={false}
              border={border}
              onDelete={() => handleDelete(index)}
              start={1}
              end={9}
              maxLength={1}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

Pin.displayName = 'Pin';

export { Pin };
