import { nanoid } from 'nanoid';
import React, { useRef } from 'react';
import { BreadCrumbItem } from './breadcrumb-item';
import { BreadCrumbProps } from './breadcrumb-model';
import './breadcrumb.scss';

const BreadCrumb: React.FunctionComponent<BreadCrumbProps> = ({
  children,
  onClick,
  icon = 'chevron',
  size = 'sm',
}) => {
  const items = useRef(
    Array.isArray(children)
      ? children.map(() => ({
          id: nanoid(),
        }))
      : []
  );
  return (
    <ul
      className="bread-crumbs-wrapper"
      role="navigation"
      aria-label="breadcrumbs"
    >
      {items.current.map((item, index) => (
        <BreadCrumbItem
          child={Array.isArray(children) && children[index]}
          id={item.id}
          onClick={onClick}
          showChevron={index < items.current.length - 1}
          key={item.id}
          icon={icon}
          size={size}
        />
      ))}
    </ul>
  );
};

export { BreadCrumb };
