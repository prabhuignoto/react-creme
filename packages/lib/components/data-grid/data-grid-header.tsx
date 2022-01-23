import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { TriangleIcon } from '../../icons';
import { DataGridCell } from './data-grid-cell';
import './data-grid-header.scss';
import { DataGridHeaderProps, SortDirection } from './data-grid-model';

const DataGridHeader: React.FunctionComponent<DataGridHeaderProps> = ({
  columns,
  style,
  onSort,
  layoutStyle,
  border,
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
    return classNames('rc-data-grid-header', {
      [`rc-data-grid-header-${layoutStyle}`]: true,
    });
  }, [layoutStyle]);

  const headerCellClass = useMemo(() => {
    return classNames('rc-data-grid-header-cell', {
      'rc-data-grid-header-border': border,
    });
  }, []);

  return (
    <div className={headerClass} style={style}>
      {headerColumns.map(column => (
        <div className={headerCellClass} key={column.name}>
          <DataGridCell
            name={column.name}
            value={column.name}
            border={border}
          />
          {column.sortable && (
            <span className="rc-data-grid-header-sort-icon-wrapper">
              <span
                className={classNames('rc-data-grid-header-sort-icon', {
                  'rc-data-grid-header-sort-icon-active':
                    column.sortDirection === 'asc',
                })}
                role="button"
                onClick={() => handleSort(column.name, 'asc')}
              >
                <TriangleIcon />
              </span>
              <span
                className={classNames('rc-data-grid-header-sort-icon-desc', {
                  'rc-data-grid-header-sort-icon-active':
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
