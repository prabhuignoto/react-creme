import classNames from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { isDark } from '../../common/utils';
import { FormFieldProps } from './form-field.model';
import styles from './form-field.module.scss';

const FormField: FunctionComponent<FormFieldProps> = ({
  RTL = false,
  disabled = false,
  icon,
  label,
  size = 'sm',
  border = true,
  children,
  id,
}) => {
  const isDarkMode = useMemo(() => isDark(), []);

  const formFieldClass = useMemo(() => {
    return classNames(styles.form_field, {
      [styles[size]]: true,
      [styles.border]: border,
      [styles.disabled]: disabled,
      [styles.rtl]: RTL,
      [styles.dark]: isDarkMode,
    });
  }, []);

  const formLabelClass = useMemo(() => {
    return classNames(styles.label, {
      [styles[`label_${size}`]]: true,
      [styles.dark]: isDarkMode,
    });
  }, []);

  const formIconClass = useMemo(() => {
    return classNames(styles.icon, {
      [styles[`rc_icon_${size}`]]: true,
    });
  }, []);

  return (
    <div className={formFieldClass}>
      <div className={styles.label_container}>
        {icon && <span className={formIconClass}>{icon}</span>}
        <label className={formLabelClass} aria-label={label} htmlFor={id}>
          {label}
        </label>
      </div>
      <div className={styles.input_container}>{children}</div>
    </div>
  );
};

FormField.displayName = 'FormField';

export { FormField };
