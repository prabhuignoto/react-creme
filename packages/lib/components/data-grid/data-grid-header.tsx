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
  sortData,
}: DataGridHeaderProps) => {
  // Simple function call - no need for useMemo
  const isDarkMode = isDark();
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
    (column: { name: string; sortDirection: string; sortable: boolean | undefined }) => {
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

  // Get ARIA sort value for a column
  const getAriaSort = useCallback(
    (columnName: string): 'ascending' | 'descending' | 'none' => {
      if (sortData?.column === columnName) {
        return sortData.dir === 'asc'
          ? 'ascending'
          : sortData.dir === 'desc'
            ? 'descending'
            : 'none';
      }
      return 'none';
    },
    [sortData]
  );

  return (
    <div className={headerClass} style={style} role="row" aria-rowindex={1}>
      {headerColumns.map((column, index) => (
        <div
          className={headerCellClass}
          key={column.name}
          role="columnheader"
          aria-sort={column.sortable ? getAriaSort(column.name) : undefined}
          aria-colindex={index + 1}
        >
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
