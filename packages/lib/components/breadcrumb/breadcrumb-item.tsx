import { ArrowRightIcon, ChevronRightIcon, MinusIcon } from '@icons';
import classNames from 'classnames';
import React, { FunctionComponent, useCallback, useMemo, useRef } from 'react';
import useFocusNew from '../common/effects/useFocusNew';
import { Link } from '../link/link';
import { BreadCrumbItemProps } from './breadcrumb-model';
import styles from './breadcrumb.module.scss';

/**
 * BreadCrumbItem Component.
 *
 * An individual breadcrumb item, which consists of a link and an optional icon.
 *
 * @param {object} props - Properties passed down from parent
 * @param {string} props.id - Unique identifier for the breadcrumb item
 * @param {function} props.onSelected - Callback to handle selection events
 * @param {boolean} props.showChevron - Flag to control the display of chevron icon
 * @param {string} props.icon - The type of icon for the breadcrumb item
 * @param {'sm'|'md'|'lg'} props.size - The size of the breadcrumb item
 * @param {boolean} props.selected - The state of the breadcrumb item, whether it is selected or not
 * @param {string} props.name - The name of the breadcrumb item
 * @param {boolean} props.RTL - Flag for rendering right-to-left layout
 *
 * @returns {ReactNode} The BreadCrumbItem component
 */
const BreadCrumbItem: FunctionComponent<BreadCrumbItemProps> = React.memo(
  ({
    id,
    onSelected,
    showChevron,
    icon = 'chevron',
    size = 'sm',
    selected,
    name,
    RTL,
  }: BreadCrumbItemProps) => {
    // Ref to access the DOM node of the component
    const ref = useRef<HTMLSpanElement>(null);

    // Hook to set the focus
    useFocusNew(ref);

    // Determine the icon CSS classes based on the provided props
    const breadCrumbIcon = useMemo(() => {
      return classNames(styles.bread_crumb_icon, RTL ? styles.rtl_icon : '', {
        [styles[`bread_crumb_icon_${size}`]]: true,
        [styles.slash]: icon === 'slash',
      });
    }, [RTL, size, icon]); // Add dependencies to the array

    // Determine the node CSS classes based on the provided props
    const breadCrumbNode = useMemo(() => {
      return classNames(styles.bread_crumb_node, {
        [styles[`bread_crumb_node_${size}`]]: true,
      });
    }, [size]); // Add size to dependencies array

    // Handle click events on the breadcrumb item
    const handleClick = useCallback(
      (id: string, name: string) => {
        onSelected?.(id, name);
      },
      [onSelected]
    );

    // Render the breadcrumb item component
    return (
      <li className={styles.bread_crumb} key={id}>
        <span className={breadCrumbNode}>
          <Link onClick={() => handleClick(id, name)} highlight={selected}>
            {name}
          </Link>
        </span>
        {showChevron && (
          <span className={breadCrumbIcon}>
            {icon === 'chevron' && <ChevronRightIcon />}
            {icon === 'arrow' && <ArrowRightIcon />}
            {icon === 'slash' && <MinusIcon />}
          </span>
        )}
      </li>
    );
  }
);

BreadCrumbItem.displayName = 'BreadCrumbItem';

export { BreadCrumbItem };
