import classNames from 'classnames';
import React, { FunctionComponent, useCallback, useMemo, useRef } from 'react';
import { ArrowRightIcon, ChevronRightIcon, MinusIcon } from '../../icons';
import useFocusNew from '../common/effects/useFocusNew';
import { Link } from '../link/link';
import { BreadCrumbItemProps } from './breadcrumb-model';
import styles from './breadcrumb.module.scss';

const BreadCrumbItem: FunctionComponent<BreadCrumbItemProps> = React.memo(
  ({
    id,
    onSelected,
    showChevron,
    icon = 'chevron',
    size = 'sm',
    selected,
    name,
  }: BreadCrumbItemProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    useFocusNew(ref);

    const breadCrumbIcon = useMemo(() => {
      return classNames(styles.bread_crumb_icon, {
        [styles[`bread_crumb_icon_${size}`]]: true,
        [styles.slash]: icon === 'slash',
      });
    }, []);

    const breadCrumbNode = useMemo(() => {
      return classNames(styles.bread_crumb_node, {
        [styles[`bread_crumb_node_${size}`]]: true,
      });
    }, [selected]);

    const handleClick = useCallback((id, name) => {
      onSelected?.(id, name);
    }, []);

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
