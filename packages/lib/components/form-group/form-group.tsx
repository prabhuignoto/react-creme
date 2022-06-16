import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { FunctionComponent, useCallback, useMemo, useRef } from 'react';
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
}) => {
  const elements = useRef<FormItemProps[]>(
    Array.isArray(children)
      ? children.map(() => ({
          id: nanoid(),
        }))
      : [
          {
            id: nanoid(),
          },
        ]
  );

  const formRef = useRef<HTMLFormElement>(null);

  const controlsClass = useMemo(
    () => classNames(styles.from_controls, RTL ? styles.left : styles.right),
    []
  );

  const handleSubmit = useCallback(() => {
    formRef.current?.submit();
    onSubmit?.();
  }, []);

  const handleCancel = useCallback(() => {
    onCancel?.();
  }, []);

  return (
    <form
      className={styles.wrapper}
      action={action}
      method={method}
      encType={encType}
      ref={formRef}
      noValidate={noValidate}
    >
      {elements.current.length &&
        elements.current.map((element, index) => (
          <FormItem
            key={element.id}
            child={(children as []).length ? (children as [])[index] : children}
          />
        ))}
      <div className={controlsClass}>
        <div className={styles.form_control_wrapper}>
          <Button label={'Submit'} type="primary" onClick={handleSubmit} />
        </div>
        <div className={styles.form_control_wrapper} onClick={handleCancel}>
          <Button label={'Cancel'} />
        </div>
      </div>
    </form>
  );
};

FormGroup.displayName = 'FormGroup';

export { FormGroup };
