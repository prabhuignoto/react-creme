import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { FunctionComponent, useMemo, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../input/input';
import { FormFieldProps } from './form-field.model';
import './form-field.scss';

const FormField: FunctionComponent<FormFieldProps> = ({
  RTL = false,
  disabled = false,
  icon,
  label,
  onChange,
  placeholder,
  size,
  state,
  debounce = 200,
  border = true,
  value = '',
}) => {
  const formFieldClass = useMemo(() => {
    return classNames('rc-form-field', {
      [`rc-form-field-${size}`]: true,
      'rc-form-field-border': border,
      'rc-form-field-rtl': RTL,
    });
  }, []);

  const formLabelClass = useMemo(() => {
    return classNames('rc-form-field-label', {
      [`rc-form-field-label-${size}`]: true,
    });
  }, []);

  const formIconClass = useMemo(() => {
    return classNames('rc-form-field-icon', {
      [`rc-form-field-icon-${size}`]: true,
    });
  }, []);

  const id = useRef(`rc-form-field-${nanoid()}`);

  const debouncedOnChange =
    onChange && useDebouncedCallback(onChange, debounce);

  return (
    <div className={formFieldClass}>
      <div className="rc-form-field-label-container">
        {icon && <span className={formIconClass}>{icon}</span>}
        <label
          className={formLabelClass}
          aria-label={label}
          htmlFor={id.current}
        >
          {label}
        </label>
      </div>
      <div className="rc-form-field-input-container">
        <Input
          placeholder={placeholder}
          onChange={debouncedOnChange}
          size={size}
          state={state}
          noUniqueId
          id={id.current}
          RTL={RTL}
          enableClear
          disabled={disabled}
          value={value}
        />
      </div>
    </div>
  );
};

export { FormField };