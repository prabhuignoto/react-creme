/**
 * Pin Component - Secure PIN code input with support for multiple digits
 *
 * Features:
 * - Controlled and uncontrolled modes
 * - Auto-jump between inputs on digit entry
 * - Keyboard navigation (arrows, home/end)
 * - Paste support for full PIN
 * - Optional masking for security
 * - Full accessibility support (WCAG 2.1 AA)
 * - RTL support
 * - Validation and error states
 *
 * @example
 * // Uncontrolled
 * <Pin length={4} onChange={(val) => console.log(val)} />
 *
 * // Controlled
 * const [pin, setPin] = useState('');
 * <Pin value={pin} onChange={setPin} />
 *
 * // With ref for imperative access
 * const pinRef = useRef<PinHandle>(null);
 * <Pin ref={pinRef} />
 * pinRef.current?.reset();
 */

import classNames from 'classnames';
import { nanoid } from 'nanoid';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  ClipboardEvent,
  KeyboardEvent,
} from 'react';
import { useFirstRender } from '../common/effects/useFirstRender';
import styles from './pin.module.scss';
import { PinProps, PinHandle } from './pin.model';

const Pin = forwardRef<PinHandle, PinProps>(
  (
    {
      length = 4,
      size = 'sm',
      border: _border = false, // eslint-disable-line @typescript-eslint/no-unused-vars
      RTL = false,
      autoJump = true,
      disabled = false,
      readOnly = false,
      loading = false,
      mask = false,
      maskChar = '●',
      maskDelay = 0,
      autoFocus = false,
      label,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      error,
      status = 'default',
      helperText,
      // Controlled/Uncontrolled
      value: controlledValue,
      defaultValue = '',
      onChange,
      onComplete,
      onStatusChange: _onStatusChange, // eslint-disable-line @typescript-eslint/no-unused-vars
    },
    ref
  ) => {
    // Initialize items once with lazy initialization
    const itemsRef = useRef<Array<{ id: string }> | null>(null);
    if (!itemsRef.current || itemsRef.current.length !== length) {
      itemsRef.current = Array.from({ length }, () => ({ id: nanoid() }));
    }

    // State management
    const isFirstRender = useFirstRender();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [_focusedIndex, setFocusedIndex] = useState<number>(-1); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [visibleDigits, setVisibleDigits] = useState<Set<number>>(new Set());
    const [maskTimeouts, setMaskTimeouts] = useState<Map<number, ReturnType<typeof setTimeout>>>(
      new Map()
    );

    // Use controlled value if provided, otherwise use internal
    const pinValue = controlledValue !== undefined ? controlledValue : internalValue;

    // Create refs for each input dynamically
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const wrapperRef = useRef<HTMLUListElement>(null);
    const liveRegionRef = useRef<HTMLDivElement>(null);

    // Accessibility: announce changes to screen readers
    const announceStatus = useCallback((message: string) => {
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = message;
      }
    }, []);

    // Imperative handle for ref-based access
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          inputRefs.current[0]?.focus();
        },
        getValue: () => pinValue,
        isComplete: () => pinValue.length === length,
        reset: () => {
          if (controlledValue === undefined) {
            setInternalValue('');
          }
          inputRefs.current.forEach(input => {
            if (input) input.value = '';
          });
          announceStatus('PIN cleared');
        },
      }),
      [controlledValue, pinValue, length, announceStatus]
    );

    // Get display value (masked or unmasked)
    const getDisplayValue = useCallback(
      (digit: string, index: number): string => {
        if (!mask) return digit;
        if (visibleDigits.has(index)) return digit;
        return maskChar;
      },
      [mask, visibleDigits, maskChar]
    );

    // Handle single digit input
    const handleInputChange = useCallback(
      (inputValue: string, index: number) => {
        // Only allow single digit
        const digit = inputValue.slice(0, 1);

        // Reject non-numeric
        if (digit && !/^\d$/.test(digit)) {
          return;
        }

        // Build new PIN value
        const digitsArray = pinValue.split('');
        digitsArray[index] = digit;
        const newValue = digitsArray.join('');

        // Update state
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);

        // Show digit briefly if masking
        if (digit && mask && maskDelay > 0) {
          setVisibleDigits(prev => new Set(prev).add(index));

          // Clear timeout if exists
          const timeout = maskTimeouts.get(index);
          if (timeout) clearTimeout(timeout);

          // Set new timeout
          const newTimeout = setTimeout(() => {
            setVisibleDigits(prev => {
              const updated = new Set(prev);
              updated.delete(index);
              return updated;
            });
            setMaskTimeouts(prev => {
              const updated = new Map(prev);
              updated.delete(index);
              return updated;
            });
          }, maskDelay);

          setMaskTimeouts(prev => new Map(prev).set(index, newTimeout));
        }

        // Auto-jump to next input
        if (digit && index + 1 < length && autoJump) {
          setTimeout(() => {
            inputRefs.current[index + 1]?.focus();
            setFocusedIndex(index + 1);
          }, 0);
        }

        // Check for completion
        if (newValue.length === length) {
          onComplete?.(newValue);
          announceStatus(`PIN complete: ${newValue.length} digits entered`);
        } else {
          announceStatus(`${index + 1} of ${length} digits entered`);
        }
      },
      [
        pinValue,
        controlledValue,
        length,
        onChange,
        onComplete,
        autoJump,
        mask,
        maskDelay,
        maskTimeouts,
        announceStatus,
      ]
    );

    // Handle backspace and delete
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        const target = e.currentTarget;

        if (e.key === 'Backspace') {
          e.preventDefault();

          const digitsArray = pinValue.split('');

          if (target.value) {
            // Has value: clear it
            digitsArray[index] = '';
            const newValue = digitsArray.join('');

            if (controlledValue === undefined) {
              setInternalValue(newValue);
            }
            onChange?.(newValue);
            target.value = '';
            announceStatus(`${index + 1} of ${length} digits cleared`);
          } else if (index > 0) {
            // No value: move to previous and clear it
            digitsArray[index - 1] = '';
            const newValue = digitsArray.join('');

            if (controlledValue === undefined) {
              setInternalValue(newValue);
            }
            onChange?.(newValue);

            inputRefs.current[index - 1]!.value = '';
            inputRefs.current[index - 1]?.focus();
            setFocusedIndex(index - 1);
            announceStatus(
              `Moved to digit ${index} of ${length}, digit cleared`
            );
          }
        } else if (e.key === 'ArrowRight' || (RTL && e.key === 'ArrowLeft')) {
          e.preventDefault();
          if (index + 1 < length) {
            inputRefs.current[index + 1]?.focus();
            setFocusedIndex(index + 1);
          }
        } else if (e.key === 'ArrowLeft' || (RTL && e.key === 'ArrowRight')) {
          e.preventDefault();
          if (index > 0) {
            inputRefs.current[index - 1]?.focus();
            setFocusedIndex(index - 1);
          }
        } else if (e.key === 'Home') {
          e.preventDefault();
          inputRefs.current[0]?.focus();
          setFocusedIndex(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          inputRefs.current[length - 1]?.focus();
          setFocusedIndex(length - 1);
        }
      },
      [pinValue, controlledValue, length, onChange, RTL, announceStatus]
    );

    // Handle paste for full PIN
    const handlePaste = useCallback(
      (e: ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const pastedData = e.clipboardData?.getData('text') || '';

        // Extract digits only
        const digits = pastedData.replace(/\D/g, '').slice(0, length - index);

        if (!digits) return;

        // Fill remaining inputs
        const digitsArray = pinValue.split('');
        digits.split('').forEach((digit, i) => {
          digitsArray[index + i] = digit;
        });

        const newValue = digitsArray.join('').slice(0, length);

        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);

        // Update input elements
        digits.split('').forEach((digit, i) => {
          const inputIndex = index + i;
          if (inputRefs.current[inputIndex]) {
            inputRefs.current[inputIndex]!.value = digit;
          }
        });

        // Focus last filled input
        const lastFilledIndex = Math.min(index + digits.length - 1, length - 1);
        inputRefs.current[lastFilledIndex]?.focus();
        setFocusedIndex(lastFilledIndex);

        if (newValue.length === length) {
          onComplete?.(newValue);
          announceStatus(`PIN complete: ${newValue.length} digits entered`);
        }
      },
      [pinValue, controlledValue, length, onChange, onComplete, announceStatus]
    );

    // Handle focus
    const handleFocus = useCallback(
      (index: number) => {
        setFocusedIndex(index);
      },
      []
    );

    // Auto-focus first input on mount
    useEffect(() => {
      if (autoFocus && !isFirstRender.current) {
        inputRefs.current[0]?.focus();
      }
    }, [autoFocus, isFirstRender]);

    // Sync external value changes to inputs (controlled mode)
    useEffect(() => {
      if (controlledValue !== undefined) {
        const digits = controlledValue.split('');
        inputRefs.current.forEach((input, i) => {
          if (input) {
            input.value = digits[i] || '';
          }
        });
      }
    }, [controlledValue]);

    // Clean up mask timeouts on unmount
    useEffect(() => {
      return () => {
        maskTimeouts.forEach(timeout => clearTimeout(timeout));
      };
    }, [maskTimeouts]);

    // Build CSS classes
    const wrapperClass = classNames(
      styles.wrapper,
      RTL && styles.RTL,
      disabled && styles.disabled,
      loading && styles.loading,
      error && styles.error,
      status && styles[`status-${status}`]
    );

    const inputWrapperClass = classNames(styles.input_wrapper, styles[size]);

    const ariaLabelText =
      label || ariaLabel || `PIN code input, ${length} digits`;

    return (
      <div className={styles.container}>
        {/* Live region for screen reader announcements */}
        <div
          ref={liveRegionRef}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={styles.srOnly}
        />

        {/* PIN inputs */}
        <ul
          className={wrapperClass}
          ref={wrapperRef}
          role="group"
          aria-label={ariaLabelText}
          aria-describedby={
            ariaDescribedBy || (error ? `${pinValue}-error` : undefined)
          }
          aria-invalid={!!error}
        >
          {itemsRef.current.map((item, index) => (
            <li key={item.id} className={styles.item}>
              <div className={inputWrapperClass}>
                <input
                  ref={el => {
                    inputRefs.current[index] = el;
                  }}
                  type={mask ? 'password' : 'text'}
                  inputMode="numeric"
                  maxLength={1}
                  size={1}
                  disabled={disabled || loading}
                  readOnly={readOnly}
                  onChange={e => handleInputChange(e.currentTarget.value, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  onPaste={e => handlePaste(e, index)}
                  onFocus={() => handleFocus(index)}
                  aria-label={`PIN digit ${index + 1} of ${length}`}
                  aria-describedby={
                    helperText ? `${pinValue}-helper` : undefined
                  }
                  className={styles.input}
                  value={getDisplayValue(pinValue[index] || '', index)}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Helper text / Error message */}
        {helperText && (
          <div id={`${pinValue}-helper`} className={styles.helperText}>
            {helperText}
          </div>
        )}

        {error && (
          <div id={`${pinValue}-error`} className={styles.errorMessage}>
            {error}
          </div>
        )}
      </div>
    );
  }
);

Pin.displayName = 'Pin';

export { Pin, type PinHandle };
export type { PinProps } from './pin.model';
