// Import necessary libraries and components
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckBox } from '../checkbox/checkbox';
import { CheckboxProps } from '../checkbox/checkbox-model';
import styles from './checkbox-group.module.scss';

/**
 * Props for the CheckboxGroup component
 */
export interface CheckboxGroupProps {
  /** Enable right-to-left text direction */
  RTL?: boolean;

  /** Add border around each checkbox */
  border?: boolean;

  /**
   * Visual style for all checkboxes in the group.
   * @default 'square'
   */
  checkboxStyle?: 'square' | 'round';

  /** Disable all checkboxes in the group */
  disabled?: boolean;

  /**
   * Layout direction for the checkbox group.
   * @default 'vertical'
   */
  layout?: 'horizontal' | 'vertical';

  /**
   * When true, uses the `id` from each option directly.
   * When false, generates unique IDs automatically.
   * @default false
   */
  noUniqueIds?: boolean;

  /**
   * Callback fired when any checkbox state changes.
   * Returns array of all checkboxes with their current state.
   * @param selected - Array of objects containing id, isChecked, and name for each checkbox
   */
  onChange?: (
    selected: {
      id?: string;
      isChecked: boolean;
      name?: string;
    }[]
  ) => void;

  /**
   * Array of checkbox configurations.
   * Each option should have a `label` (required) and can include:
   * - `isChecked`: Initial checked state
   * - `disabled`: Disable specific checkbox
   * - `id`: Custom ID (used when noUniqueIds is true)
   */
  options: CheckboxProps[];

  /** Size variant for all checkboxes */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * CheckBoxGroup Component
 *
 * This is a custom checkbox group component that supports various customization options.
 * It receives several props to handle its behavior and styling.
 *
 *
 * @param {boolean} RTL - If true, applies right-to-left styles to the checkbox group.
 * @param {boolean} border - Adds a border to the checkbox group.
 * @param {string} checkboxStyle - Determines the style of the checkboxes (e.g., 'square' or 'round').
 * @param {boolean} disabled - Disables the checkbox group if true.
 * @param {string} layout - Determines the layout of the checkbox group (e.g., 'horizontal' or 'vertical').
 * @param {boolean} noUniqueIds - If true, uses the provided ids as is without generating unique ids.
 * @param {function} onChange - The function to call when the checkbox state changes.
 * @param {Array} options - The array of CheckboxProps for each checkbox in the group.
 * @param {string} size - The size of the checkbox group ('sm', 'md', 'lg').
 *
 * @returns {JSX.Element} The CheckBoxGroup component.
 */
const CheckBoxGroup: React.FunctionComponent<CheckboxGroupProps> = ({
  options = [],
  disabled,
  layout = 'vertical',
  checkboxStyle = 'square',
  onChange,
  noUniqueIds = false,
  RTL = false,
  size = 'sm',
}) => {
  // Define the class for the checkbox group wrapper
  const wrapperClass = useMemo(() => {
    return classNames([
      styles.checkbox_group_wrapper,
      layout === 'horizontal'
        ? styles.checkbox_group_horizontal
        : styles.checkbox_group_vertical,
    ]);
  }, [layout]);

  // Track checked state separately to avoid props-to-state anti-pattern
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(
    () => {
      const initialState: Record<string, boolean> = {};
      options.forEach((option, index) => {
        const id = noUniqueIds ? option.id : `checkbox-${index}`;
        initialState[id || `checkbox-${index}`] = option.isChecked || false;
      });
      return initialState;
    }
  );

  // Derive items from options prop (no props-to-state anti-pattern)
  const items = useMemo(
    () =>
      options.map((option, index) => {
        const id = noUniqueIds ? option.id : `checkbox-${index}`;
        const itemId = id || `checkbox-${index}`;
        return {
          ...option,
          id: itemId,
          isChecked: checkedState[itemId] ?? option.isChecked ?? false,
        };
      }),
    [options, noUniqueIds, checkedState]
  );

  // Sync checkedState when options change
  useEffect(() => {
    setCheckedState(prevState => {
      const newState: Record<string, boolean> = {};
      options.forEach((option, index) => {
        const id = noUniqueIds ? option.id : `checkbox-${index}`;
        const itemId = id || `checkbox-${index}`;
        // Preserve existing state or use option's isChecked
        newState[itemId] = prevState[itemId] ?? option.isChecked ?? false;
      });
      return newState;
    });
  }, [options, noUniqueIds]);

  // Define the handler for checkbox state change
  const handleChange = useCallback(
    (id?: string, selected = false) => {
      if (!id) {
        return;
      }

      setCheckedState(prevState => {
        const newState = { ...prevState, [id]: selected };

        // Call onChange with updated items
        onChange?.(
          items.map(item => ({
            id: item.id,
            isChecked: item.id === id ? selected : (newState[item.id] ?? false),
            name: item.label,
          }))
        );

        return newState;
      });
    },
    [onChange, items]
  );

  // Render the checkbox group
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
