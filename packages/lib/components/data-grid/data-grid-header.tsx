import { TriangleIcon } from '@icons';
import classNames from 'classnames';
import React, { useMemo, useState, useCallback } from 'react';
import { isDark } from '../common/utils';
import { DataGridCell } from './data-grid-cell';
import styles from './data-grid-header.module.scss';
import iconStyles from './data-grid-icons.module.scss';
import { DataGridHeaderProps, SortDirection } from './data-grid-model';

const DataGridHeader: React.FunctionComponent<DataGridHeaderProps> = ({
  columns = [],
  style,
  onSort,
  layoutStyle,
  border,
  size,
  searchable,
}: DataGridHeaderProps) => {
  const isDarkMode = useMemo(() => isDark(), []);
  const [headerColumns, setHeaderColumns] = useState(() =>
    columns.map(col => ({
      ...col,
      sortDirection: 'asc',
      sortable: col.sortable ?? false, // Ensure sortable property exists
    }))
  );

  const handleSort = useCallback(
    (column: string, dir: SortDirection) => {
      setHeaderColumns(prevColumns =>
        prevColumns.map(col => ({
          ...col,
          sortDirection: col.name === column ? dir : 'none',
        }))
      );

      if (onSort) {
        onSort(column, dir);
      }
    },
    [onSort]
  );

  // Handle keyboard events for sort icons
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, column: string, direction: SortDirection) => {
      // Trigger on Enter or Space key
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // Prevent scrolling on Space
        handleSort(column, direction);
      }
    },
    [handleSort]
  );

  const headerClass = useMemo(() => {
    return classNames(styles.header, {
      [styles[`${layoutStyle}`]]: true,
      [styles[`${size}`]]: true,
    });
  }, [layoutStyle, size]);

  const headerCellClass = useMemo(() => {
    return classNames(styles.cell, {
      [styles.border]: border,
      [styles.dark]: isDarkMode,
      [styles.searchable]: searchable,
    });
  }, [border, isDarkMode, searchable]);

  // Memoize the sort icon rendering for better performance
  const renderSortIcons = useCallback(
    (column: { name: string; sortDirection: string; sortable: any }) => {
      if (!column.sortable) return null;

      return (
        <span className={iconStyles.sort_icon_wrapper}>
          <span
            className={classNames(iconStyles.sort_icon_asc, {
              [iconStyles.sort_icon_active]: column.sortDirection === 'asc',
            })}
            role="button"
            onClick={() => handleSort(column.name, 'asc')}
            onKeyDown={e => handleKeyDown(e, column.name, 'asc')}
            aria-label={`Sort ${column.name} ascending`}
            tabIndex={0}
          >
            <TriangleIcon />
          </span>
          <span
            className={classNames(iconStyles.sort_icon_desc, {
              [iconStyles.sort_icon_active]: column.sortDirection === 'desc',
            })}
            role="button"
            onClick={() => handleSort(column.name, 'desc')}
            onKeyDown={e => handleKeyDown(e, column.name, 'desc')}
            aria-label={`Sort ${column.name} descending`}
            tabIndex={0}
          >
            <TriangleIcon />
          </span>
        </span>
      );
    },
    [handleSort, handleKeyDown]
  );

  return (
    <div className={headerClass} style={style} role="row">
      {headerColumns.map(column => (
        <div className={headerCellClass} key={column.name}>
          <DataGridCell
            name={column.name}
            value={column.name}
            border={false}
            isHeader
          />
          {renderSortIcons(column)}
        </div>
      ))}
    </div>
  );
};

DataGridHeader.displayName = 'DataGridHeader';

export { DataGridHeader };
