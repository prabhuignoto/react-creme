import { nanoid } from 'nanoid';
import React, { useCallback, useState } from 'react';
import { BreadCrumbItem } from './breadcrumb-item';
import { BreadCrumbProps } from './breadcrumb-model';
import './breadcrumb.scss';

interface BreadCrumbItemModel {
  id: string;
  selected: boolean;
}

const BreadCrumb: React.FunctionComponent<BreadCrumbProps> = ({
  children,
  onSelected,
  icon = 'chevron',
  size = 'sm',
  selectedCrumbIndex = 0,
}) => {
  const [items, setItems] = useState<BreadCrumbItemModel[]>(
    Array.isArray(children)
      ? children.map((_, index) => ({
          id: nanoid(),
          selected: selectedCrumbIndex === index,
        }))
      : []
  );

  const handleSelection = useCallback((id, index) => {
    setItems(prev =>
      prev.map(item => ({
        ...item,
        selected: item.id === id,
      }))
    );

    onSelected?.(index);
  }, []);

  return (
    <ul
      className="rc-bread-crumbs-wrapper"
      role="navigation"
      aria-label="breadcrumbs"
    >
      {items.map(({ id, selected }, index) => (
        <BreadCrumbItem
          child={Array.isArray(children) && children[index]}
          id={id}
          onSelected={handleSelection}
          showChevron={index < items.length - 1}
          key={id}
          icon={icon}
          size={size}
          selected={selected}
          index={index}
        />
      ))}
    </ul>
  );
};

BreadCrumb.displayName = 'BreadCrumb';

export { BreadCrumb };
