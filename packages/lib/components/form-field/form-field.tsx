import classNames from 'classnames';
import React, { FunctionComponent, useMemo } from 'react';
import { FormFieldProps } from './form-field.model';
import styles from './form-field.module.scss';

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
    return classNames(styles.form_field, {
      [styles[`form-field-${size}`]]: true,
      [styles.form_field_border]: border,
      [styles.form_field_disabled]: disabled,
      [styles.form_field_rtl]: RTL,
    });
  }, []);

  const formLabelClass = useMemo(() => {
    return classNames(styles.form_field_label, {
      [styles[`form-field-label-${size}`]]: true,
    });
  }, []);

  const formIconClass = useMemo(() => {
    return classNames(styles.form_field_icon, {
      [styles[`rc-form-field-icon-${size}`]]: true,
    });
  }, []);

  return (
    <div className={formFieldClass}>
      <div className={styles.form_field_label_container}>
        {icon && <span className={formIconClass}>{icon}</span>}
        <label className={formLabelClass} aria-label={label} htmlFor={id}>
          {label}
        </label>
      </div>
      <div className={styles.form_field_input_container}>{children}</div>
    </div>
  );
};

export { FormField };
