import { nanoid } from 'nanoid';
import React, { useCallback, useState } from 'react';
import { BreadCrumbItem } from './breadcrumb-item';
import { BreadCrumbProps } from './breadcrumb-model';
import styles from './breadcrumb.module.scss';

interface BreadCrumbItemModel {
  id: string;
  name: string;
  selected: boolean;
}

const BreadCrumb: React.FunctionComponent<BreadCrumbProps> = ({
  children,
  onSelected,
  icon = 'chevron',
  size = 'sm',
  focusable = true,
  selectedCrumbIndex = 0,
  links = [],
}) => {
  const [items, setItems] = useState<BreadCrumbItemModel[]>(
    links.map((link, index) => ({
      id: nanoid(),
      name: link,
      selected: selectedCrumbIndex === index,
    }))
  );

  const handleSelection = useCallback((id, name) => {
    setItems(prev =>
      prev.map(item => ({
        ...item,
        selected: item.id === id,
      }))
    );

    onSelected?.(name);
  }, []);

  return (
    <ul
      className={styles.bread_crumbs_wrapper}
      role="navigation"
      aria-label="breadcrumbs"
    >
      {items.map(({ id, selected, name }, index) => (
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
          focusable={focusable}
          name={name}
        />
      ))}
    </ul>
  );
};

BreadCrumb.displayName = 'BreadCrumb';

export { BreadCrumb };
