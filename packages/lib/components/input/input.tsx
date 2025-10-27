import { CloseIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CircularProgress } from '..';
import { useFirstRender } from '../common/effects/useFirstRender';
import { isDark } from '../common/utils';
import { InputProps } from './input-model';
import styles from './input.module.scss';

export type RCInputElementProps =
  | (Partial<HTMLInputElement> & {
      focus: () => void;
      getValue: () => string;
      setValue: (value: string) => void;
    })
  | null;

const Input = React.forwardRef<RCInputElementProps, InputProps>(
  (props, ref) => {
    const {
      RTL = false,
      accent = 'flat',
      border = false,
      children,
      controlled = true,
      disabled = false,
      enableClear = true,
      focusable = true,
      id = '',
      isAutoComplete = false,
      ariaExpanded = false,
      noUniqueId = false,
      onChange,
      onFocus,
      onKeyUp,
      onKeyDown,
      placeholder = 'Please enter a value ...',
      showSpinner = false,
      size = 'sm',
      state = 'default',
      style,
      type = 'text',
      value = '',
      transparentBg = false,
      alignCenter = false,
      min = 0,
      max = Number.MAX_VALUE,
      maxLength = Number.MAX_VALUE,
    } = props;

    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isFirstRender = useFirstRender();

    const inputId = useRef(noUniqueId ? id : nanoid());
    const [hasFocus, setHasFocus] = useState(false);

    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus();
      },
      getValue() {
        return inputRef.current?.value || '';
      },
      setValue(val: string) {
        setInputValue(val);
      },
    }));

    /**
     * Handler for clearing the input value
     */
    const handleClear = useCallback((ev: React.MouseEvent) => {
      ev.preventDefault();
      setInputValue('');

      if (inputRef.current) {
        inputRef.current.focus();
      }
      onChange?.('');
    }, []);

    /**
     * Handler for handling the input change
     */
    const handleInput = useCallback(
      (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (controlled) {
          const val = ev.target.value.slice(0, maxLength);
          setInputValue(val);
          onChange?.(val);
        }
      },
      [controlled, inputValue]
    );

    const handleUnControlled = useCallback(
      (ev: React.ChangeEvent<HTMLInputElement>) => {
        const val = ev.target.value;
        onChange?.(val);
      },
      []
    );

    const clearClass = useMemo(
      () =>
        classNames([
          styles.clear,
          styles.icon,
          !inputValue ? styles.hidden : '',
        ]),
      [inputValue]
    );

    const isDarkMode = useMemo(() => isDark(), []);

    const inputClass = useMemo(
      () =>
        classNames(styles.input, {
          [styles[state]]: true,
          [styles.border]: border,
          [styles.disabled]: disabled,
          [styles.focus]: hasFocus,
          [styles['no_icon']]: !children,
          [styles.rtl]: RTL,
          [styles[accent]]: true,
          [styles[size]]: true,
          [styles.transparent_bg_color]: transparentBg,
          [styles.input_dark]: isDarkMode,
          [styles.no_clear]: !enableClear,
        }),
      [disabled, hasFocus, isDarkMode]
    );

    const inputTextClass = useMemo(
      () =>
        classNames(
          styles.input_text,
          isDarkMode ? styles.input_dark : '',
          alignCenter ? styles.align_center : '',
          children ? styles.with_icon : '',
          RTL ? styles.RTL : ''
        ),
      []
    );

    useEffect(() => {
      if (controlled && !isFirstRender.current) {
        setInputValue(value);
      }
    }, [value]);

    const controlledProps = controlled
      ? {
          onChange: handleInput,
          value: inputValue,
        }
      : { onChange: handleUnControlled };

    const autoCompleteProps = useMemo(
      () =>
        isAutoComplete
          ? {
              'aria-controls': id,
              'aria-expanded': ariaExpanded,
              role: 'combobox',
            }
          : null,
      [isAutoComplete, id, ariaExpanded]
    );

    const focusProps = useMemo(() => {
      if (focusable) {
        return {
          onBlur: () => {
            setHasFocus(false);
          },
          onFocus: (ev: React.FocusEvent) => {
            // setHasFocus(true);
            onFocus?.(ev);
          },
        };
      } else {
        // alert("kunj")
        return {};
      }
    }, [focusable, hasFocus]);

    const numProps = useMemo(() => {
      if (type === 'number') {
        return {
          max,
          min,
        };
      } else {
        return {};
      }
    }, []);

    const inputDisabled = useMemo(() => {
      return disabled;
    }, [disabled]);

    const clearProps = useMemo(
      () => ({
        'aria-hidden': !showSpinner && !inputValue,
        'aria-label': 'clear input',
        hidden: !showSpinner && !inputValue,
      }),
      [inputValue, showSpinner]
    );

    const handleKeyUp = (ev: React.KeyboardEvent) => {
      if (!hasFocus) {
        setHasFocus(true);
        inputRef.current?.focus();
      }
      onKeyUp?.(ev);
    };

    return (
      <div
        className={inputClass}
        role="textbox"
        ref={containerRef}
        style={style}
        aria-label={placeholder}
        {...autoCompleteProps}
      >
        {children && <span className={styles.icon}>{children}</span>}
        <input
          type={type}
          placeholder={placeholder}
          {...focusProps}
          {...controlledProps}
          {...numProps}
          onKeyUp={handleKeyUp}
          onKeyDown={onKeyDown}
          ref={inputRef}
          id={inputId.current}
          disabled={inputDisabled}
          className={inputTextClass}
        />
        {!showSpinner && (
          <span
            onMouseDown={handleClear}
            className={clearClass}
            role="button"
            data-testid="rc-clear-input"
            {...clearProps}
          >
            {enableClear && <CloseIcon />}
          </span>
        )}
        {showSpinner && (
          <span role="img" data-testid="rc-input-spinner">
            <CircularProgress size="xs" />
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
