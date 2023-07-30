// Import necessary libraries and components
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useCallback, useMemo, useState } from 'react';
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
  }, [layout, disabled]);

  // Initialize the state for the checkboxes in the group
  const [items, setItems] = useState(
    options.map(option => ({
      ...(!noUniqueIds ? { id: nanoid() } : { id: option.id }),
      ...option,
      isChecked: option.isChecked || false,
    }))
  );

  // Define the handler for checkbox state change
  const handleChange = useCallback(
    (id?: string, selected = false) => {
      if (!id) {
        return;
      }

      setItems(prevItems => {
        const updatedItems = prevItems.map(item => ({
          ...item,
          isChecked: item.id === id ? selected : !!item.isChecked,
        }));

        onChange?.(
          updatedItems.map(item => ({
            id: item.id,
            isChecked: item.isChecked,
            name: item.label,
          }))
        );

        return updatedItems;
      });
    },
    [onChange]
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
