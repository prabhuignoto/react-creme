import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFirstRender } from '../common/effects/useFirstRender';
import { Radio } from '../radio/radio';
import { RadioGroupItemProps, RadioGroupProps } from './radio-group-model';
import './radio-group.scss';

const RadioGroup: React.FunctionComponent<RadioGroupProps> = ({
  items,
  disabled,
  onSelected,
  style,
  layout = 'column',
  RTL = false,
  focusable = false,
}) => {
  const [_items, setItems] = useState<RadioGroupItemProps[]>(
    Array.isArray(items)
      ? items.map((item) => ({
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
        setItems((prev) =>
          prev.map((item) => ({
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
      const foundItem = _items.find((item) => item.checked);
      const value = foundItem ? foundItem.value : undefined;

      if (value && onSelected) {
        onSelected(value);
      }
    }
  }, [changeTracker]);

  const isFirstRender = useFirstRender();

  const radioGroupClass = useMemo(
    () =>
      classNames('rc-radio-group', {
        'rc-radio-group-column': layout === 'column',
        'rc-radio-group-row': layout === 'row',
      }),
    []
  );

  return (
    <ul className={radioGroupClass} role="radiogroup" style={style}>
      {_items.map(({ id, disabled, label, checked }) => (
        <li
          key={id}
          className={classNames('rc-radio-grp-item', {
            'rc-radio-grp-item-disabled': disabled,
          })}
          aria-checked={!!checked}
        >
          <Radio
            onChange={handleChange}
            label={label}
            id={id}
            isChecked={checked}
            disabled={disabled}
            isControlled
            withGroup
            size="sm"
            fullWidth={layout === 'column'}
            RTL={RTL}
            focusable={focusable}
          />
        </li>
      ))}
    </ul>
  );
};

export { RadioGroup };
