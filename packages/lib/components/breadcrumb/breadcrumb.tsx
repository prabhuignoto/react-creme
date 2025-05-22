import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useCallback, useMemo, useState } from 'react';
import { BreadCrumbItem } from './breadcrumb-item';
import { BreadCrumbProps } from './breadcrumb-model';
import styles from './breadcrumb.module.scss';

const BreadCrumb: React.FunctionComponent<BreadCrumbProps> = React.memo(
  ({
    children,
    onSelected,
    icon = 'chevron',
    size = 'sm',
    focusable = true,
    selectedCrumbIndex = 0,
    links = [],
    RTL = false,
  }) => {
    const [items, setItems] = useState(
      links.map((link, index) => ({
        id: nanoid(),
        name: link,
        selected: selectedCrumbIndex === index,
      }))
    );

    const handleSelection = useCallback(
      (id: string, name: string) => {
        setItems(prev =>
          prev.map(item => ({
            ...item,
            selected: item.id === id,
          }))
        );
        onSelected?.(name);
      },
      [onSelected]
    );

    const wrapperClass = useMemo(
      () => classNames(styles.bread_crumbs_wrapper, { [styles.rtl]: RTL }),
      [RTL]
    );

    return (
      <ul className={wrapperClass} role="navigation" aria-label="breadcrumbs">
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
            RTL={RTL}
          />
        ))}
      </ul>
    );
  }
);

BreadCrumb.displayName = 'BreadCrumb';

export { BreadCrumb };
