import { SearchIcon } from '@icons';
import classNames from 'classnames';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { isDark } from '../common/utils';
import { Input } from '../input/input';
import { DataGridHeader } from './data-grid-header';
import { DataGridProps, SortDirection } from './data-grid-model';
import { DataGridRow } from './data-grid-row';
import styles from './data-grid.module.scss';
import ResizeObserver from 'resize-observer-polyfill';

const DataGrid: React.FunctionComponent<DataGridProps> = ({
  ariaLabel = 'Data grid',
  border = false,
  columns = [],
  data,
  fixedHeight = false,
  gridWidth = 0,
  layoutStyle = 'comfortable',
  rowHeight,
  searchPlaceholder = 'Search...',
  zebra = false,
  size = 'sm',
}: DataGridProps) => {
  // Memoize sortable columns to avoid recalculation on every render
  const sortableColumns = useMemo(() => {
    return columns.filter(col => col.sortable);
  }, [columns]);

  const sortableColumnFirst = useMemo(() => {
    return sortableColumns.length > 0 ? sortableColumns[0] : null;
  }, [sortableColumns]);

  // Use useMemo instead of useState + useEffect to avoid props-to-state anti-pattern
  // Transform data and add stable IDs
  const rowData = useMemo(() => {
    const newData = data.map((item, index) => ({
      // Use index-based stable ID instead of random nanoid for better performance
      id: `row-${index}`,
      ...item,
    }));

    // Apply initial sort if first column is sortable
    if (sortableColumnFirst && sortableColumnFirst.name) {
      newData.sort((a, b) => {
        const name = sortableColumnFirst.name;
        const aVal = a[name as keyof typeof a] ?? '';
        const bVal = b[name as keyof typeof b] ?? '';
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      });
    }

    return newData;
  }, [data, sortableColumnFirst]);

  const [width, setWidth] = useState(gridWidth);
  const [searchInput, setSearchInput] = useState('');
  const [sortData, setSortData] = useState<{
    column?: string;
    dir?: SortDirection;
  }>(
    sortableColumns.length > 0
      ? {
          column: sortableColumns[0]?.name,
          dir: 'asc' as SortDirection,
        }
      : {}
  );

  const resizeObserver = useRef<ResizeObserver | null>(null);
  // Simple function call - no need for useMemo
  const isDarkMode = isDark();

  const gridClass = useMemo(() => {
    return classNames(styles.data_grid, {
      [styles.border]: border,
      'data-grid-zebra': zebra,
      [styles.dark]: isDarkMode,
    });
  }, [border, zebra, isDarkMode]);

  const searchableColumns = useMemo(
    () => columns.filter(col => col.searchable).map(c => c.name),
    [columns]
  );

  const handleSort = useCallback((column: string, dir: SortDirection) => {
    setSortData({ column, dir });
  }, []);

  const columnWidth = useMemo(() => {
    if (!width) return 100;

    const usedWidth = columns.map(c => c.width || 0).reduce((a, b) => a + b, 0);

    const remainingColumns = columns.filter(col => !col.width).length;

    // Avoid division by zero
    if (remainingColumns === 0) return 100;

    return Math.floor((width - usedWidth) / remainingColumns);
  }, [width, columns]);

  // Replace onRef with a callback ref that does not assign to .current
  const handleGridRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        if (!gridWidth) {
          setWidth(node.offsetWidth);
        }
        // Attach resize observer here
        resizeObserver.current = new ResizeObserver(() => {
          setWidth(node.offsetWidth);
        });
        resizeObserver.current.observe(node);
      } else {
        if (resizeObserver.current) {
          resizeObserver.current.disconnect();
        }
      }
    },
    [gridWidth]
  );

  const style = useMemo(
    () => ({
      display: 'grid',
      width: gridWidth ? `${gridWidth}px` : '100%',
      ...(rowHeight ? { '--row-height': `${rowHeight}px` } : {}),
      gridTemplateColumns: columns
        .map(column => {
          if (column.width) {
            return `${column.width}px`;
          } else {
            return `${columnWidth}px`;
          }
        })
        .join(' '),
    }),
    [gridWidth, rowHeight, columns, columnWidth]
  );

  // Memoize sorted data to prevent unnecessary re-renders
  const sortedData = useMemo(() => {
    if (!sortData.column) return rowData;

    return [...rowData].sort((a, b) => {
      const { column, dir } = sortData;
      if (!column) return 0;

      const aVal =
        (a as Record<string, string | number | undefined>)[column] ?? '';
      const bVal =
        (b as Record<string, string | number | undefined>)[column] ?? '';

      const compareResult = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return dir === 'asc' ? compareResult : -compareResult;
    });
  }, [rowData, sortData]);

  // Optimize search filtering
  const filteredData = useMemo(() => {
    if (!searchInput) return sortedData;

    const searchRegExp = new RegExp(searchInput, 'ig');

    return sortedData.filter(dat => {
      const record = dat as Record<string, string | number | undefined>;
      // Only search through searchable columns if specified
      if (searchableColumns.length > 0) {
        return searchableColumns.some(key => {
          const value = record[key];
          return value !== undefined && String(value).match(searchRegExp);
        });
      }

      // Otherwise search through all columns
      return Object.keys(record)
        .filter(key => key !== 'id')
        .some(key => {
          const value = record[key];
          return value !== undefined && String(value).match(searchRegExp);
        });
    });
  }, [sortedData, searchInput, searchableColumns]);

  const searchable = useMemo(
    () => searchableColumns.length > 0,
    [searchableColumns]
  );

  const handleSearchInput = useDebouncedCallback(
    (val: string) => setSearchInput(val),
    350
  );

  return (
    <div
      className={gridClass}
      ref={handleGridRef}
      role="table"
      aria-label={ariaLabel}
      aria-rowcount={filteredData.length + 1} // +1 for header row
    >
      {searchable && (
        <div className={styles.data_grid_search_box_wrapper}>
          <Input
            placeholder={searchPlaceholder}
            onChange={handleSearchInput}
            accent="rounded"
            size={size}
            aria-label="Search data grid"
          >
            <SearchIcon />
          </Input>
          {/* Live region for announcing search results */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {searchInput
              ? `${filteredData.length} ${filteredData.length === 1 ? 'result' : 'results'} found`
              : ''}
          </div>
        </div>
      )}
      <DataGridHeader
        columns={columns}
        style={style}
        onSort={handleSort}
        layoutStyle={layoutStyle}
        border={border}
        size={size}
        searchable={searchable}
        sortData={sortData}
      />
      {filteredData.length > 0 ? (
        filteredData.map((row, index) => (
          <DataGridRow
            data={row}
            key={row.id}
            columnWidth={columnWidth}
            columnConfigs={columns}
            style={style}
            layoutStyle={layoutStyle}
            border={border}
            fixedHeight={fixedHeight}
            zebra={zebra && index % 2 === 1}
            rowHeight={rowHeight}
            size={size}
            rowIndex={index + 2} // +1 for 1-based index, +1 for header row
          />
        ))
      ) : (
        <div role="row" className={styles.empty_state} aria-rowindex={2}>
          <div role="cell" aria-colspan={columns.length}>
            {searchInput ? 'No results found' : 'No data available'}
          </div>
        </div>
      )}
    </div>
  );
};

DataGrid.displayName = 'DataGrid';

export { DataGrid };
