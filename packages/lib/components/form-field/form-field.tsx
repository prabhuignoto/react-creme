import classNames from 'classnames';
import React, { FunctionComponent, useMemo } from 'react';
import { FormFieldProps } from './form-field.model';
import './form-field.scss';

const FormField: FunctionComponent<FormFieldProps> = ({
  RTL = false,
  disabled = false,
  icon,
  label,
  size,
  border = true,
  children,
  id,
}) => {
  const formFieldClass = useMemo(() => {
    return classNames('rc-form-field', {
      [`rc-form-field-${size}`]: true,
      'rc-form-field-border': border,
      'rc-form-field-disabled': disabled,
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

  return (
    <div className={formFieldClass}>
      <div className="rc-form-field-label-container">
        {icon && <span className={formIconClass}>{icon}</span>}
        <label className={formLabelClass} aria-label={label} htmlFor={id}>
          {label}
        </label>
      </div>
      <div className="rc-form-field-input-container">{children}</div>
    </div>
  );
};

export { FormField };
