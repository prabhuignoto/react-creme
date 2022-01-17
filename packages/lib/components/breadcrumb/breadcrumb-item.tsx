import classNames from 'classnames';
import React, { FunctionComponent, useMemo, useRef } from 'react';
import { ArrowRightIcon, ChevronRightIcon } from '../../icons';
import { useFocus } from '../common/effects/useFocus';
import { useKey } from '../common/effects/useKey';
import { BreadCrumbItemProps } from './breadcrumb-model';

const BreadCrumbItem: FunctionComponent<BreadCrumbItemProps> = React.memo(
  ({
    id,
    onClick,
    child,
    showChevron,
    icon = 'chevron',
    size = 'sm',
  }: BreadCrumbItemProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    useFocus(ref);

    useKey(ref, () => {
      if (ref.current) {
        ref.current.querySelector('a')?.click();
      }
    });

    const breadCrumbIcon = useMemo(() => {
      return classNames('bread-crumb-icon', {
        [`bread-crumb-icon-${size}`]: true,
      });
    }, []);

    const breadCrumbNode = useMemo(() => {
      return classNames('bread-crumb-node', {
        [`bread-crumb-node-${size}`]: true,
      });
    }, []);

    return (
      <li className="bread-crumb" key={id}>
        <span
          className={breadCrumbNode}
          ref={ref}
          tabIndex={0}
          onClick={onClick}
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
