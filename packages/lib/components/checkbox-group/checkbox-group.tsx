import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React from 'react';
import { useCallback, useMemo } from 'react';
import { CheckBox } from '../checkbox/checkbox';
import { CheckboxProps } from '../checkbox/checkbox-model';
import styles from './checkbox-group.module.scss';

export interface CheckboxGroupProps {
  RTL?: boolean;
  border?: boolean;
  checkboxStyle?: 'square' | 'round';
  disabled?: boolean;
  layout?: 'horizontal' | 'vertical';
  noUniqueIds?: boolean;
  onChange?: (
    selected: {
      id?: string;
      isChecked: boolean;
      name?: string;
    }[]
  ) => void;
  options: CheckboxProps[];
  size?: 'sm' | 'md' | 'lg';
}

const CheckBoxGroup: React.FunctionComponent<CheckboxGroupProps> = ({
  options = [],
  disabled,
  // border,
  layout = 'vertical',
  checkboxStyle = 'square',
  onChange,
  noUniqueIds = false,
  RTL = false,
  size = 'sm',
}) => {
  const wrapperClass = useMemo(() => {
    return classNames([
      styles.checkbox_group_wrapper,
      layout === 'horizontal'
        ? styles.checkbox_group_horizontal
        : styles.checkbox_group_vertical,
    ]);
  }, [layout, disabled]);

  const [items, setItems] = React.useState(
    options
      ? options.map(option => ({
          ...(!noUniqueIds ? { id: nanoid() } : { id: option.id }),
          ...option,
          isChecked: option.isChecked || false,
        }))
      : []
  );

  const handleChange = useCallback(
    (id?: string, selected = false) => {
      if (!id) {
        return;
      }

      setItems(items => {
        const _newItems = items.map(item => {
          return {
            ...item,
            isChecked: item.id === id ? selected : !!item.isChecked,
          };
        });

        onChange?.(
          _newItems.map(item => ({
            id: item.id,
            isChecked: item.isChecked,
            name: item.label,
          }))
        );

        return _newItems;
      });
    },
    [items.length]
  );

  return (
    <div className={wrapperClass} role="group">
      {items.map(item => {
        const { id, ...rest } = item;
        return (
          <CheckBox
            key={id}
            {...rest}
            disabled={disabled || item.disabled}
            onChange={handleChange}
            checkBoxStyle={checkboxStyle}
            noUniqueId={true}
            id={item.id}
            RTL={RTL}
            size={size}
          />
        );
      })}
    </div>
  );
};

CheckBoxGroup.displayName = 'CheckBoxGroup';

export { CheckBoxGroup };
