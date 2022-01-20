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

const Input: React.FunctionComponent<InputProps> = React.forwardRef(
  (props: InputProps, ref) => {
    const {
      children,
      RTL = false,
      accent = 'flat',
      border = false,
      controlled = false,
      disabled = false,
      enableClear = false,
      focusable = false,
      id = '',
      isAutoComplete = false,
      noUniqueId = false,
      onChange,
      onKeyUp,
      placeholder = 'Please enter a value ...',
      showSpinner = false,
      state = 'default',
      style,
      type = 'text',
      value = '',
    } = props;
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isFirstRender = useFirstRender();

    const inputId = useRef(noUniqueId ? id : nanoid());
    const [hasFocus, setHasFocus] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        focus: () => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        },
      };
    });

    const handleClear = useCallback((ev: React.MouseEvent) => {
      ev.preventDefault();
      setInputValue('');

      if (inputRef.current) {
        inputRef.current.focus();
      }
      onChange?.('');
    }, []);

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
        }),
      [disabled, hasFocus]
    );

    useEffect(() => {
      if (controlled && !isFirstRender.current) {
        setInputValue(value);
      }
    }, [value]);

    const controlledProps = controlled
      ? { onChange: handleInput, value: inputValue }
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
          onFocus: () => setHasFocus(true),
        };
      } else {
        return {};
      }
    }, [focusable]);

    const inputDisabled = useMemo(() => {
      return disabled;
    }, [disabled]);

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
          {...controlledProps}
          onKeyUp={onKeyUp}
          ref={inputRef}
          id={inputId.current}
          disabled={inputDisabled}
          {...focusProps}
        />
        {!showSpinner && (
          <span onMouseDown={handleClear} className={clearClass} role="button">
            {enableClear && <CloseIcon />}
          </span>
        )}
        {showSpinner && (
          <span className={'rc-input-loading'}>
            <CircularProgress size="xs" />
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
