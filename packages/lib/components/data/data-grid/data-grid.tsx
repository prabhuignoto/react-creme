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
import { SearchIcon } from '../../common/icons';
import { isDark } from '../../common/utils';
import { Input } from '../../inputs/input/input';
import { DataGridHeader } from './data-grid-header';
import {
  DataGridColumn,
  DataGridProps,
  Record,
  SortDirection,
} from './data-grid-model';
import { DataGridRow } from './data-grid-row';
import styles from './data-grid.module.scss';

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
  const sortableColumns = useRef(columns.filter(col => col.sortable));
  const sortableColumnFirst = useRef<DataGridColumn>(
    sortableColumns.current.length ? sortableColumns.current[0] : null
  );

  const rowData = useRef<Record[]>(
    sortableColumnFirst.current !== null
      ? data
          .map(item => ({
            id: nanoid(),
            ...item,
          }))
          .sort((a: Record, b: Record) => {
            const name = sortableColumnFirst.current?.name;

            if (name) {
              return a[name] < b[name] ? -1 : 1;
            } else {
              return 0;
            }
          })
      : data.map(item => ({
          id: nanoid(),
          ...item,
        }))
  );

  const [width, setWidth] = useState(gridWidth);

  const [searchInput, setSearchInput] = useState('');

  const [sortData, setSortData] = useState<{
    column?: string;
    dir?: SortDirection;
  }>(
    sortableColumns.current.length > 0
      ? {
          column: sortableColumns.current[0].name,
          dir: 'asc',
        }
      : {}
  );
  const gridRef = useRef<HTMLDivElement>();

  const resizeObserver = useRef<ResizeObserver>();

  const isDarkMode = useMemo(() => isDark(), []);

  const gridClass = useMemo(() => {
    return classNames(styles.data_grid, {
      [styles.border]: border,
      'data-grid-zebra': zebra,
      [styles.dark]: isDarkMode,
    });
  }, []);

  const searchableColumns = useMemo(
    () => columns.filter(col => col.searchable).map(c => c.name),
    []
  );

  const handleSort = useCallback((column: string, dir: SortDirection) => {
    setSortData({ column, dir });
  }, []);

  const columnWidth = useMemo(() => {
    if (width) {
      const usedWidth = columns
        .map(c => c.width || 0)
        .reduce((a, b) => a + b, 0);

      return Math.floor(
        (width - usedWidth) /
          (columns.length - columns.filter(col => col.width).length)
      );
    }
  }, [width]);

  const onRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        gridRef.current = node;

        if (!gridWidth) {
          setWidth((node as HTMLElement).offsetWidth);
        }
      }
    },
    [gridWidth]
  );

  useEffect(() => {
    if (gridRef.current) {
      resizeObserver.current = new ResizeObserver(() => {
        setWidth((gridRef.current as HTMLElement).offsetWidth);
      });

      resizeObserver.current.observe(document.body);
    }

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, [width]);

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
    [width, columnWidth]
  );

  const sortedData = useMemo<Record[]>(() => {
    return rowData.current.sort((a, b) => {
      if (sortData.dir === 'asc' && sortData.column) {
        if (a[sortData.column] < b[sortData.column]) {
          return -1;
        } else if (a[sortData.column] > b[sortData.column]) {
          return 1;
        }

        return 0;
      } else if (sortData.column) {
        if (a[sortData.column] < b[sortData.column]) {
          return 1;
        } else if (a[sortData.column] > b[sortData.column]) {
          return -1;
        }

        return 0;
      }

      return 0;
    });
  }, [sortData.dir]);

  const filteredData = useMemo(() => {
    if (searchInput) {
      const searchRegExp = new RegExp(searchInput, 'ig');

      return sortedData.filter(dat => {
        const keys = Object.keys(dat);
        return keys.some(key =>
          (String(dat[key]) as string).match(searchRegExp)
        );
      });
    } else {
      return sortedData;
    }
  }, [sortedData.length, searchableColumns.length, searchInput]);

  const searchable = useMemo(
    () => searchableColumns.length > 0,
    [searchableColumns.length]
  );

  const handleSearchInput = useDebouncedCallback(
    (val: string) => setSearchInput(val),
    350
  );

  return (
    <div className={gridClass} ref={onRef} role="table">
      {searchable ? (
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
      ) : null}
      <DataGridHeader
        columns={columns}
        style={style}
        onSort={handleSort}
        layoutStyle={layoutStyle}
        border={border}
        size={size}
        searchable={searchable}
      />
      {filteredData.map(row => {
        return (
          <DataGridRow
            data={row}
            key={row.id}
            columnWidth={columnWidth}
            columnConfigs={columns}
            style={style}
            layoutStyle={layoutStyle}
            border={border}
            fixedHeight={fixedHeight}
            zebra={zebra}
            rowHeight={rowHeight}
            size={size}
          />
        );
      })}
    </div>
  );
};

DataGrid.displayName = 'DataGrid';

export { DataGrid };
