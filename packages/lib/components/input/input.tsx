/* eslint-disable react/prop-types */
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
import { CloseIcon } from '../../icons';
import { useFirstRender } from '../common/effects/useFirstRender';
import { InputProps } from './input-model';
import './input.scss';

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
      controlled = false,
      disabled = false,
      enableClear = true,
      focusable = true,
      id = '',
      isAutoComplete = false,
      noUniqueId = false,
      onChange,
      onFocus,
      onKeyUp,
      placeholder = 'Please enter a value ...',
      showSpinner = false,
      size = 'sm',
      state = 'default',
      style,
      type = 'text',
      value = '',
      transparentBgColor = false,
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
          const val = ev.target.value;
          setInputValue(val);
          onChange?.(val);
        }
      },
      [controlled]
    );

    const handleUnControlled = useCallback(
      (ev: React.ChangeEvent<HTMLInputElement>) => {
        const val = ev.target.value;
        onChange?.(val);
      },
      []
    );

    const clearClass = useMemo(
      () => classNames(['rc-input-clear', !inputValue ? 'hidden' : '']),
      [inputValue]
    );

    const inputClass = useMemo(
      () =>
        classNames('rc-input', {
          [`rc-input-${state}`]: true,
          'rc-input-border': border,
          'rc-input-disabled': disabled,
          'rc-input-focus': hasFocus,
          'rc-input-no-icon': !children,
          'rc-input-rtl': RTL,
          [`rc-input-${accent}`]: true,
          [`rc-input-${size}`]: true,
          'rc-input-transparent-bg-color': transparentBgColor,
        }),
      [disabled, hasFocus]
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
              role: 'combobox',
            }
          : null,
      [isAutoComplete]
    );

    const focusProps = useMemo(() => {
      if (focusable) {
        return {
          onBlur: () => setHasFocus(false),
          onFocus: (ev: React.FocusEvent) => {
            setHasFocus(true);
            onFocus?.(ev);
          },
        };
      } else {
        return {};
      }
    }, [focusable]);

    const inputDisabled = useMemo(() => {
      return disabled;
    }, [disabled]);

    const clearProps = useMemo(
      () => ({
        'aria-hidden': !showSpinner && !inputValue,
        'aria-label': 'Clear',
        hidden: !showSpinner && !inputValue,
      }),
      [inputValue, showSpinner]
    );

    return (
      <div
        className={inputClass}
        role="textbox"
        ref={containerRef}
        style={style}
        aria-label={placeholder}
        {...autoCompleteProps}
      >
        <span className={'rc-input-icon'}>{children}</span>
        <input
          type={type}
          placeholder={placeholder}
          {...focusProps}
          {...controlledProps}
          onKeyUp={onKeyUp}
          ref={inputRef}
          id={inputId.current}
          disabled={inputDisabled}
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
          <span
            className={'rc-input-loading'}
            role="img"
            data-testid="rc-input-spinner"
          >
            <CircularProgress size="xs" />
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
