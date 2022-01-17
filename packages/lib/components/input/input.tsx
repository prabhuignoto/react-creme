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
import { CloseIcon } from '../../icons';
import { useFirstRender } from '../common/effects/useFirstRender';
import { InputProps } from './input-model';
import './input.scss';

const Input: React.FunctionComponent<InputProps> = React.forwardRef(
  (props: InputProps, ref) => {
    const {
      children,
      disabled = false,
      enableClear = false,
      onChange,
      onKeyUp,
      placeholder = 'Please enter a value ...',
      state = 'default',
      style,
      type = 'text',
      value = '',
      controlled = false,
      noUniqueId = false,
      id = '',
      isAutoComplete = false,
      border = false,
      focusable = false,
      RTL = false,
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
          disabled={disabled}
          {...focusProps}
        />
        <span onMouseDown={handleClear} className={clearClass} role="button">
          {enableClear && <CloseIcon />}
        </span>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
