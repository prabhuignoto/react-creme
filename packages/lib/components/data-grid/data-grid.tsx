import { SearchIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { isDark } from '../common/utils';
import { Input } from '../input/input';
import { DataGridHeader } from './data-grid-header';
import { DataGridProps, Record, SortDirection } from './data-grid-model';
import { DataGridRow } from './data-grid-row';
import styles from './data-grid.module.scss';
import ResizeObserver from 'resize-observer-polyfill';

const DataGrid: React.FunctionComponent<DataGridProps> = ({
  border = false,
  columns = [],
  data,
  fixedHeight = false,
  gridWidth = 0,
  layoutStyle = 'comfortable',
  rowHeight,
  zebra = false,
  size = 'sm',
}: DataGridProps) => {
  // Move these to useMemo to avoid recalculation on every render
  const sortableColumns = useMemo(() => {
    return [...columns].filter(col => col.sortable);
  }, [columns]);

  const sortableColumnFirst = useMemo(() => {
    return sortableColumns.length ? sortableColumns[0] : null;
  }, [sortableColumns]);

  // Transform data once when component mounts or when data changes
  const [rowData, setRowData] = useState<Record[]>([]);

  useEffect(() => {
    const newData = data.map(item => ({
      id: nanoid(),
      ...item,
    }));

    if (sortableColumnFirst && sortableColumnFirst.name) {
      newData.sort((a, b) => {
        const name = sortableColumnFirst.name;
        return (a[name as keyof typeof a] ?? '') <
          (b[name as keyof typeof b] ?? '')
          ? -1
          : 1;
      });
    }

    setRowData(newData);
  }, [data, sortableColumnFirst]);

  const [width, setWidth] = useState(gridWidth);
  const [searchInput, setSearchInput] = useState('');
  const [sortData, setSortData] = useState<{
    column?: string;
    dir?: SortDirection;
  }>(
    sortableColumns.length > 0
      ? {
          column: sortableColumns[0].name,
          dir: 'asc',
        }
      : {}
  );

  const resizeObserver = useRef<ResizeObserver | null>(null);
  const isDarkMode = useMemo(() => isDark(), []);

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
    if (width) {
      const usedWidth = columns
        .map(c => c.width || 0)
        .reduce((a, b) => a + b, 0);

      const remainingColumns = columns.filter(col => !col.width).length;

      // Avoid division by zero
      if (remainingColumns === 0) return 100;

      return Math.floor((width - usedWidth) / remainingColumns);
    }
    return 100; // Default width
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

      const aVal = a[column] ?? '';
      const bVal = b[column] ?? '';

      const compareResult = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return dir === 'asc' ? compareResult : -compareResult;
    });
  }, [rowData, sortData]);

  // Optimize search filtering
  const filteredData = useMemo(() => {
    if (!searchInput) return sortedData;

    const searchRegExp = new RegExp(searchInput, 'ig');

    return sortedData.filter(dat => {
      // Only search through searchable columns if specified
      if (searchableColumns.length > 0) {
        return searchableColumns.some(
          key => dat[key] && String(dat[key]).match(searchRegExp)
        );
      }

      // Otherwise search through all columns
      return Object.keys(dat)
        .filter(key => key !== 'id')
        .some(key => dat[key] && String(dat[key]).match(searchRegExp));
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
    <div className={gridClass} ref={handleGridRef} role="table">
      {searchable && (
        <div className={styles.data_grid_search_box_wrapper}>
          <Input
            placeholder="Search..."
            onChange={handleSearchInput}
            accent="rounded"
            size={size}
          >
            <SearchIcon />
          </Input>
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
      />
      {filteredData.map((row, index) => (
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
        />
      ))}
    </div>
  );
};

DataGrid.displayName = 'DataGrid';

export { DataGrid };
