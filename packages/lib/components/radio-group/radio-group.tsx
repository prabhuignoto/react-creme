import classNames from 'classnames';
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
import styles from './radio-group.module.scss';

const buildItems = (
  items: RadioGroupItemProps<string>[],
  disabled?: boolean
) =>
  Array.isArray(items)
    ? items.map((item, index) => {
        const derivedId =
          item.id ||
          (typeof item.value !== 'undefined'
            ? String(item.value)
            : `${item.label}-${index}`);

        return {
          id: derivedId,
          ...item,
          disabled: typeof disabled !== 'undefined' ? disabled : item.disabled,
        };
      })
    : [];

/**
 * RadioGroup Component
 */
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
  const [items_state, setItems] = useState<
    Array<RadioGroupItemProps<string> & { isChecked?: boolean }>
  >(() => buildItems(items, disabled));

  // State to track changes in the radio group items
  const [changeTracker, setChangeTracker] = useState<number>();

  // Reference to the currently active radio item
  const active = useRef<string | null>(null);

  // Function to handle changes in the radio group selection
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
        active.current = id ?? null;
        setChangeTracker(Date.now());
      }
    },
    []
  );

  // Detect if it's the first render of the component
  const isFirstRender = useFirstRender();

  // Calculate the class for the radio group container based on layout
  const radioGroupClass = useMemo(
    () =>
      classNames(styles.radio_group, {
        [styles.column]: layout === 'column',
        [styles.row]: layout === 'row',
      }),
    [layout]
  );

  // Sync items_state with derived items when props change
  React.useEffect(() => {
    setItems(prev => {
      const nextItems = buildItems(items, disabled);

      const merged = nextItems.map(item => {
        const previous =
          prev.find(prevItem => prevItem.id === item.id) ??
          prev.find(prevItem => prevItem.value === item.value);

        if (previous) {
          return {
            ...item,
            checked: previous.checked ?? item.checked ?? null,
          };
        }

        return item;
      });

      const foundActive = merged.find(item => item.checked)?.id ?? null;
      active.current = foundActive;

      return merged;
    });
  }, [items, disabled]);

  // useEffect to trigger onSelected when a radio item is changed (excluding the first render)
  useEffect(() => {
    if (!isFirstRender.current) {
      const foundItem = items_state.find(item => item.checked);
      const value = foundItem ? foundItem.value : undefined;

      if (value && onSelected) {
        onSelected(value);
      }
    }
  }, [changeTracker, items_state, onSelected]);

  return (
    <div
      className={radioGroupClass}
      role="radiogroup"
      aria-label="radio group options"
      style={style}
    >
      {items_state.map(({ id, disabled, label, checked }) => (
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
    </div>
  );
};

// Set a display name for the component (useful for debugging)
RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
