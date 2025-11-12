import classNames from 'classnames';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { Button } from '..';
import { FormGroupProps, FormItemProps } from './form-group.model';
import styles from './form-group.module.scss';

const FormItem: FunctionComponent<FormItemProps> = ({ child }) => {
  return <div className={styles.form_item}>{child}</div>;
};

const FormGroup: FunctionComponent<FormGroupProps> = ({
  children = [],
  action,
  method,
  encType,
  noValidate,
  onSubmit,
  onCancel,
  RTL = false,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
}) => {
  // Derive elements from children prop (avoid props-to-state anti-pattern)
  const elements = useMemo<FormItemProps[]>(
    () =>
      Array.isArray(children)
        ? children.map((_, index) => ({
            id: `form-item-${index}`,
          }))
        : [
            {
              id: 'form-item-0',
            },
          ],
    [children]
  );

  const controlsClass = useMemo(
    () => classNames(styles.from_controls, RTL ? styles.left : styles.right),
    [RTL]
  );

  const handleSubmit = useCallback(
    (ev?: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
      ev?.preventDefault();
      onSubmit?.();
    },
    [onSubmit]
  );

  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const handleFormSubmit = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      handleSubmit(ev);
    },
    [handleSubmit]
  );

  return (
    <form
      className={styles.wrapper}
      action={action}
      method={method}
      encType={encType}
      noValidate={noValidate}
      onSubmit={handleFormSubmit}
    >
      {elements.length &&
        elements.map((element, index) => (
          <FormItem
            key={element.id}
            child={(children as []).length ? (children as [])[index] : children}
          />
        ))}
      <div className={controlsClass}>
        <div className={styles.form_control_wrapper}>
          <Button label={submitLabel} type="primary" onClick={() => handleSubmit()} />
        </div>
        <div className={styles.form_control_wrapper} onClick={handleCancel}>
          <Button label={cancelLabel} />
        </div>
      </div>
    </form>
  );
};

FormGroup.displayName = 'FormGroup';

export { FormGroup };
