import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useCallback, useMemo, useState } from 'react';
import { BreadCrumbItem } from './breadcrumb-item';
import { BreadCrumbProps } from './breadcrumb-model';
import styles from './breadcrumb.module.scss';

// An interface representing a single breadcrumb item
interface BreadCrumbItemModel {
  id: string;
  name: string;
  selected: boolean;
}

/**
 * BreadCrumb Component.
 *
 * A list of links that help indicate the current page's location in the app navigation hierarchy.
 *
 * @param {object} props - Properties passed down from parent
 * @param {ReactNode} props.children - React nodes for the breadcrumb's content
 * @param {function} props.onSelected - Callback to handle selection events
 * @param {string} props.icon - The icon type for the breadcrumbs
 * @param {'sm'|'md'|'lg'} props.size - The size of the breadcrumb
 * @param {boolean} props.focusable - Defines if the breadcrumb can be focused
 * @param {number} props.selectedCrumbIndex - Index of the initially selected breadcrumb
 * @param {string[]} props.links - List of breadcrumb link names
 * @param {boolean} props.RTL - Flag for rendering right-to-left layout
 *
 * @returns {ReactNode} The Breadcrumb component
 */
const BreadCrumb: React.FunctionComponent<BreadCrumbProps> = ({
  children,
  onSelected,
  icon = 'chevron',
  size = 'sm',
  focusable = true,
  selectedCrumbIndex = 0,
  links = [],
  RTL = false,
}) => {
  // Generate the initial state for the breadcrumb items
  const [items, setItems] = useState<BreadCrumbItemModel[]>(
    links.map((link, index) => ({
      id: nanoid(), // Generate a unique ID for each breadcrumb item
      name: link,
      selected: selectedCrumbIndex === index, // Only the selected breadcrumb index is initially marked as selected
    }))
  );

  // Function to handle selection events
  const handleSelection = useCallback(
    (id: string, name: string) => {
      // Update the breadcrumb items' selected states
      setItems(prev =>
        prev.map(item => ({
          ...item,
          selected: item.id === id, // The selected state is true only for the selected item
        }))
      );

      // Call the onSelected callback if provided
      onSelected?.(name);
    },
    [onSelected]
  ); // Add onSelected to dependencies array

  // Generate the CSS classes for the breadcrumb wrapper
  const wrapperClass = useMemo(
    () => classNames(styles.bread_crumbs_wrapper, RTL ? styles.rtl : ''),
    [RTL] // Add RTL to dependencies array
  );

  // Render the breadcrumb component
  return (
    <ul className={wrapperClass} role="navigation" aria-label="breadcrumbs">
      {items.map(({ id, selected, name }, index) => (
        <BreadCrumbItem
          child={Array.isArray(children) && children[index]}
          id={id}
          onSelected={handleSelection}
          showChevron={index < items.length - 1} // Only show the chevron for breadcrumb items that aren't the last
          key={id}
          icon={icon}
          size={size}
          selected={selected}
          index={index}
          focusable={focusable}
          name={name}
          RTL={RTL}
        />
      ))}
    </ul>
  );
};

BreadCrumb.displayName = 'BreadCrumb';

export { BreadCrumb };
