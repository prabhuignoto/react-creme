import { useFirstRender } from '@common';
import { Radio } from '@core';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RadioGroupItemProps, RadioGroupProps } from './radio-group-model';
import styles from './radio-group.module.scss';

const RadioGroup: React.FunctionComponent<RadioGroupProps> = ({
  items,
  disabled,
  onSelected,
  style,
  layout = 'column',
  RTL = false,
  focusable = true,
  size = 'sm',
}) => {
  const [_items, setItems] = useState<RadioGroupItemProps<string>[]>(
    Array.isArray(items)
      ? items.map(item => ({
          id: nanoid(),
          ...item,
          disabled: typeof disabled !== 'undefined' ? disabled : item.disabled,
        }))
      : []
  );
  const [changeTracker, setChangeTracker] = useState<number>();
  const active = useRef<string>();

  const handleChange = useCallback(
    ({ id }: { checked?: boolean; id?: string }) => {
      if (active.current !== id) {
        setItems(prev =>
          prev.map(item => ({
            ...item,
            checked: item.id === id || false,
            isChecked: item.id === id || false,
          }))
        );
        active.current = id;
        setChangeTracker(Date.now());
      }
    },
    []
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      const foundItem = _items.find(item => item.checked);
      const value = foundItem ? foundItem.value : undefined;

      if (value && onSelected) {
        onSelected(value);
      }
    }
  }, [changeTracker]);

  const isFirstRender = useFirstRender();

  const radioGroupClass = useMemo(
    () =>
      classNames(styles.radio_group, {
        [styles.column]: layout === 'column',
        [styles.row]: layout === 'row',
      }),
    []
  );

  return (
    <ul className={radioGroupClass} role="radiogroup" style={style}>
      {_items.map(({ id, disabled, label, checked }) => (
        <Radio
          key={id}
          onChange={handleChange}
          label={label}
          id={id}
          isChecked={checked}
          disabled={disabled}
          isControlled
          withGroup
          size={size}
          fullWidth={layout === 'column'}
          RTL={RTL}
          focusable={focusable}
        />
      ))}
    </ul>
  );
};

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
