/**
 * Pin
 * @property {number} length - The number of pins.
 * @property {boolean} RTL - Right-to-left layout.
 * @property {(value: number) => void} onChange - Function to handle value change.
 * @property {string} size - The size of the pins.
 * @property {boolean} border - Whether the pins have a border.
 * @property {boolean} autoJump - Whether to jump to the next pin automatically.
 * @returns {JSX.Element} The Pin component.
 */
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  FunctionComponent,
} from 'react';
import { InputNumber } from '..';
import { useFirstRender } from '../common/effects/useFirstRender';
import { useKeyNavigation } from '../common/effects/useKeyNavigation';
import styles from './pin.module.scss';
import { PinProps } from './pin.model';

const Pin: FunctionComponent<PinProps> = ({
  length = 4,
  RTL = false,
  onChange,
  size = 'sm',
  border = false,
  autoJump = true,
}) => {
  const items = useRef(Array.from({ length }, () => ({ id: nanoid() })));
  const [pinVal, setPinVal] = useState<string | null>(null);
  const isFirstRender = useFirstRender();
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Define class for wrapper
  const wrapperClass = useMemo(
    () => classNames(styles.wrapper, RTL ? styles.RTL : ''),
    [RTL]
  );

  const wrapperRef = useRef<HTMLElement>(null!);

  // Handle reference load
  const onRefLoad = useCallback((node: HTMLElement) => {
    if (node) wrapperRef.current = node;
  }, []);

  // Keyboard navigation between PIN inputs
  useKeyNavigation(wrapperRef, focusedIndex, length, {
    orientation: 'horizontal',
    rtl: RTL,
    wrap: true,
    onNavigate: (index: number) => {
      setFocusedIndex(index);
      // Auto-focus the input at the new index
      setTimeout(() => {
        wrapperRef.current
          ?.querySelectorAll('li')
          [index]?.querySelector('input')?.focus();
      }, 0);
    },
  });

  // Handle input change
  const handleChange = useCallback(
    (val: number, index: number) => {
      if (!Number.isNaN(val)) {
        // Auto jump to next input
        if (index + 1 < length && wrapperRef.current && autoJump) {
          const ele = wrapperRef.current.querySelectorAll('li')[index + 1];
          ele?.querySelector('input')?.focus();
        }
        setPinVal(prev => (prev || '') + val);
      }
    },
    [length, autoJump]
  );

  // Handle input delete
  const handleDelete = useCallback(
    (idx: number) => {
      const _val = pinVal && pinVal.slice(0, idx);
      if (_val && _val.length < length && idx > 0 && autoJump) {
        wrapperRef.current
          ?.querySelectorAll('li')
          [idx - 1]?.querySelector('input')
          ?.focus();
      }
    },
    [pinVal, length, autoJump]
  );

  // Invoke onChange callback on pin value change
  useEffect(() => {
    if (!isFirstRender.current && pinVal) {
      onChange?.(Number.parseInt(pinVal));
    }
  }, [pinVal, isFirstRender, onChange]);

  // Define class for input wrapper
  const inputWrapperClass = useMemo(
    () => classNames(styles.input_wrapper, { [styles[size]]: true }),
    [size]
  );

  return (
    <ul
      className={wrapperClass}
      ref={onRefLoad as React.Ref<HTMLUListElement>}
      role="group"
      aria-label="PIN code input"
      tabIndex={-1}
    >
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
