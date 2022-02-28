import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { TriangleIcon } from '../../icons';
import { isDark } from '../common/utils';
import { DataGridCell } from './data-grid-cell';
import styles from './data-grid-header.module.scss';
import { DataGridHeaderProps, SortDirection } from './data-grid-model';

const DataGridHeader: React.FunctionComponent<DataGridHeaderProps> = ({
  columns = [],
  style,
  onSort,
  layoutStyle,
  border,
  size,
}: DataGridHeaderProps) => {
  const isDarkMode = useMemo(() => isDark(), []);
  const [headerColumns, setHeaderColumns] = useState(
    columns.map(col => ({
      ...col,
      sortDirection: 'asc',
    }))
  );

  const handleSort = (column: string, dir: SortDirection) => {
    setHeaderColumns(columns =>
      columns.map(col => ({
        ...col,
        sortDirection: col.name === column ? dir : 'none',
      }))
    );

    onSort && onSort(column, dir);
  };

  const headerClass = useMemo(() => {
    return classNames(styles.header, {
      [styles[`${layoutStyle}`]]: true,
      [styles[`${size}`]]: true,
    });
  }, [layoutStyle]);

  const headerCellClass = useMemo(() => {
    return classNames(styles.cell, {
      [styles.border]: border,
      [styles.dark]: isDarkMode,
    });
  }, []);

  return (
    <div className={headerClass} style={style} role="row">
      {headerColumns.map(column => (
        <div className={headerCellClass} key={column.name}>
          <DataGridCell name={column.name} value={column.name} border={false} />
          {column.sortable && (
            <span className={styles.sort_icon_wrapper}>
              <span
                className={classNames(styles.sort_icon, {
                  [styles.sort_icon_asc]: column.sortDirection === 'asc',
                })}
                role="button"
                onClick={() => handleSort(column.name, 'asc')}
              >
                <TriangleIcon />
              </span>
              <span
                className={classNames(styles.sort_icon_desc, {
                  [styles.sort_icon_active]: column.sortDirection === 'desc',
                })}
                role="button"
                onClick={() => handleSort(column.name, 'desc')}
              >
                <TriangleIcon />
              </span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

DataGridHeader.displayName = 'DataGridHeader';

export { DataGridHeader };
