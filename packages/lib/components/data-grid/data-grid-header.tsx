import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { TriangleIcon } from '../../icons';
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
    return classNames(styles.data_grid_header, {
      [styles[`data_grid_header_${layoutStyle}`]]: true,
      [styles[`data_grid_header_${size}`]]: true,
    });
  }, [layoutStyle]);

  const headerCellClass = useMemo(() => {
    return classNames(styles.data_grid_header_cell, {
      [styles.data_grid_header_border]: border,
    });
  }, []);

  return (
    <div className={headerClass} style={style} role="row">
      {headerColumns.map(column => (
        <div className={headerCellClass} key={column.name}>
          <DataGridCell
            name={column.name}
            value={column.name}
            border={border}
          />
          {column.sortable && (
            <span className={styles.data_grid_header_sort_icon_wrapper}>
              <span
                className={classNames(styles.data_grid_header_sort_icon, {
                  [styles.data_grid_header_sort_icon_asc]:
                    column.sortDirection === 'asc',
                })}
                role="button"
                onClick={() => handleSort(column.name, 'asc')}
              >
                <TriangleIcon />
              </span>
              <span
                className={classNames(styles.data_grid_header_sort_icon_desc, {
                  [styles.data_grid_header_sort_icon_active]:
                    column.sortDirection === 'desc',
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
