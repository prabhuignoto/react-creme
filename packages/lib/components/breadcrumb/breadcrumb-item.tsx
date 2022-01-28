import classNames from 'classnames';
import React, { FunctionComponent, useMemo, useRef } from 'react';
import { ArrowRightIcon, ChevronRightIcon } from '../../icons';
import useFocusNew from '../common/effects/useFocusNew';
import { BreadCrumbItemProps } from './breadcrumb-model';

const BreadCrumbItem: FunctionComponent<BreadCrumbItemProps> = React.memo(
  ({
    id,
    onSelected,
    child,
    showChevron,
    icon = 'chevron',
    size = 'sm',
    selected,
    index,
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
        'rc-bread-crumb-node-selected': selected,
      });
    }, [selected]);

    return (
      <li className="rc-bread-crumb" key={id}>
        <span
          className={breadCrumbNode}
          ref={ref}
          tabIndex={0}
          onClick={() => onSelected?.(id, index)}
          role="button"
        >
          {child}
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
