import { ArrowRightIcon, ChevronRightIcon, MinusIcon } from '@icons';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { Link } from '../link/link';
import { BreadCrumbItemProps } from './breadcrumb-model';
import styles from './breadcrumb.module.scss';

/**
 * BreadCrumbItem Component
 *
 * Internal component representing a single item in the breadcrumb navigation trail.
 * Each item consists of a clickable link and an optional separator icon. This component
 * handles individual item rendering, accessibility attributes, and user interactions.
 *
 * @component
 * @internal
 *
 * @example
 * ```tsx
 * // Used internally by BreadCrumb component
 * <BreadCrumbItem
 *   id="breadcrumb-item-1"
 *   index={1}
 *   name="Products"
 *   size="md"
 *   icon="chevron"
 *   showChevron={true}
 *   selected={false}
 *   isLast={false}
 *   focusable={true}
 *   onSelected={(index, name) => handleClick(index, name)}
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic `<li>` element for list structure
 * - Last item marked with `aria-current="page"` for screen readers
 * - Separator icons marked with `aria-hidden="true"` (decorative only)
 * - Clickable link with proper focus indicators
 *
 * @param {BreadCrumbItemProps} props - Component properties
 * @param {string} props.id - Unique identifier for the breadcrumb item
 * @param {number} props.index - Zero-based position in the breadcrumb trail
 * @param {string} props.name - Display label for this breadcrumb item
 * @param {function} [props.onSelected] - Callback invoked when item is clicked
 * @param {boolean} [props.showChevron] - Whether to display separator icon after this item
 * @param {'chevron' | 'arrow' | 'slash'} [props.icon='chevron'] - Type of separator icon
 * @param {'sm' | 'md' | 'lg'} [props.size='sm'] - Visual size of the item
 * @param {boolean} [props.selected] - Whether this item is currently selected (highlighted)
 * @param {boolean} [props.isLast] - Whether this is the last item (current page)
 * @param {boolean} [props.RTL] - Right-to-left layout mode
 * @param {boolean} [props.focusable=true] - Whether the item can receive keyboard focus
 *
 * @returns {React.ReactElement} The rendered breadcrumb item
 */
const BreadCrumbItem = React.memo(
  React.forwardRef<HTMLAnchorElement, BreadCrumbItemProps>(
    (
      {
        index,
        onSelected,
        showChevron,
        icon = 'chevron',
        size = 'sm',
        selected,
        isLast,
        name,
        RTL,
        focusable = true,
      }: BreadCrumbItemProps,
      ref
    ) => {
      // Determine the icon CSS classes based on the provided props
      const breadCrumbIcon = useMemo(() => {
        return classNames(styles.bread_crumb_icon, RTL ? styles.rtl_icon : '', {
          [styles[`bread_crumb_icon_${size}`]]: true,
          [styles.slash]: icon === 'slash',
        });
      }, [RTL, size, icon]);

      // Determine the node CSS classes based on the provided props
      const breadCrumbNode = useMemo(() => {
        return classNames(styles.bread_crumb_node, {
          [styles[`bread_crumb_node_${size}`]]: true,
          [styles.selected]: selected,
        });
      }, [size, selected]);

      // Handle click events on the breadcrumb item
      const handleClick = useCallback(() => {
        onSelected?.(index, name);
      }, [onSelected, index, name]);

      // Render the breadcrumb item component
      return (
        <li
          className={styles.bread_crumb}
          aria-current={isLast ? 'page' : undefined}
        >
          <span className={breadCrumbNode}>
            <Link onClick={handleClick} focusable={focusable} ref={ref}>
              {name}
            </Link>
          </span>
          {showChevron && (
            <span className={breadCrumbIcon} aria-hidden="true">
              {icon === 'chevron' && <ChevronRightIcon />}
              {icon === 'arrow' && <ArrowRightIcon />}
              {icon === 'slash' && <MinusIcon />}
            </span>
          )}
        </li>
      );
    }
  )
);

BreadCrumbItem.displayName = 'BreadCrumbItem';

export { BreadCrumbItem };
