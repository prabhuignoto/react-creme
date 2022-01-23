import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { CheckBox } from '../checkbox/checkbox';
import { CheckboxProps } from '../checkbox/checkbox-model';
import { useFirstRender } from '../common/effects/useFirstRender';
import './checkbox-group.scss';

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
}

const CheckBoxGroup: React.FunctionComponent<CheckboxGroupProps> = ({
  options = [],
  disabled,
  border,
  layout = 'vertical',
  checkboxStyle = 'square',
  onChange,
  noUniqueIds = false,
  RTL = false,
}) => {
  const wrapperClass = useMemo(() => {
    return classNames('rc-checkbox-group', {
      'rc-checkbox-group-border': border,
      'rc-checkbox-group-disabled': disabled,
      'rc-checkbox-group-horizontal': layout === 'horizontal',
      'rc-checkbox-group-vertical': layout === 'vertical',
    });
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
    (id: string, name: string, selected: boolean) => {
      setItems(items => {
        const _newItems = items.map(item => {
          return {
            ...item,
            isChecked: item.id === id ? selected : !!item.isChecked,
          };
        });

        return _newItems;
      });
    },
    []
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      onChange?.(
        items.map(item => ({
          id: item.id,
          isChecked: item.isChecked,
          name: item.label,
        }))
      );
    }
  }, [JSON.stringify(items.map(i => i.isChecked))]);

  const isFirstRender = useFirstRender();

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
          />
        );
      })}
    </div>
  );
};

CheckBoxGroup.displayName = 'CheckBoxGroup';

export { CheckBoxGroup };
