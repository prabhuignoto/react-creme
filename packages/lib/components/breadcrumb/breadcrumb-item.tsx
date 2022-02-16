import classNames from 'classnames';
import React, { FunctionComponent, useCallback, useMemo, useRef } from 'react';
import { ArrowRightIcon, ChevronRightIcon } from '../../icons';
import useFocusNew from '../common/effects/useFocusNew';
import { Link } from '../link/link';
import { BreadCrumbItemProps } from './breadcrumb-model';

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
      return classNames('rc-bread-crumb-icon', {
        [`rc-bread-crumb-icon-${size}`]: true,
      });
    }, []);

    const breadCrumbNode = useMemo(() => {
      return classNames('rc-bread-crumb-node', {
        [`rc-bread-crumb-node-${size}`]: true,
      });
    }, [selected]);

    const handleClick = useCallback((id, name) => {
      onSelected?.(id, name);
    }, []);

    return (
      <li className="rc-bread-crumb" key={id}>
        <span className={breadCrumbNode}>
          <Link onClick={() => handleClick(id, name)} highlight={selected}>
            {name}
          </Link>
        </span>
        {showChevron && (
          <span className={breadCrumbIcon}>
            {icon === 'chevron' && <ChevronRightIcon />}
            {icon === 'arrow' && <ArrowRightIcon />}
            {icon === 'slash' && '/'}
          </span>
        )}
      </li>
    );
  }
);

BreadCrumbItem.displayName = 'BreadCrumbItem';

export { BreadCrumbItem };
