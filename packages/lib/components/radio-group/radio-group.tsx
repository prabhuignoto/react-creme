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
import styles from './radio-group.module.scss';

/**
 * RadioGroup Component
 *    @property {Array} items - An array of objects containing radio item properties.
 *    @property {boolean} disabled - Whether the entire group is disabled (default: false).
 *    @property {Function} onSelected - Callback function called when the selection changes.
 *    @property {Object} style - Additional style to be applied to the radio group element.
 *    @property {string} layout - The layout direction of the radio group ('column' or 'row', default: 'column').
 *    @property {boolean} RTL - Whether the layout is right-to-left (default: false).
 *    @property {boolean} focusable - Whether the radio group is focusable (default: true).
 *    @property {string} size - The size of the radio buttons in the group (default: 'sm').
 * @returns {JSX.Element} The RadioGroup component.
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
  // State to manage the list of radio group items - derived from props
  const _items = useMemo(
    () =>
      Array.isArray(items)
        ? items.map(item => ({
            id: nanoid(),
            ...item,
            disabled:
              typeof disabled !== 'undefined' ? disabled : item.disabled,
          }))
        : [],
    [items, disabled]
  );

  const [items_state, setItems] =
    useState<RadioGroupItemProps<string>[]>(_items);

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

  // Sync items_state with derived _items when props change
  React.useEffect(() => {
    setItems(_items);
  }, [_items]);

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
