import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DataGridHeader } from "./data-grid-header";
import {
  DataGridColumn,
  DataGridProps,
  Record,
  SortDirection,
} from "./data-grid-model";
import { DataGridRow } from "./data-grid-row";
import "./data-grid.scss";

const DataGrid: React.FunctionComponent<DataGridProps> = ({
  border = false,
  columns = [],
  data,
  fixedHeight = false,
  gridWidth = 0,
  layoutStyle = "comfortable",
  rowHeight,
  zebra = false,
}: DataGridProps) => {
  const sortableColumns = useRef(columns.filter((col) => col.sortable));
  const sortableColumnFirst = useRef<DataGridColumn>(
    sortableColumns.current.length ? sortableColumns.current[0] : null
  );

  const rowData = useRef<Record[]>(
    sortableColumnFirst.current !== null
      ? data
          .map((item) => ({ id: nanoid(), ...item }))
          .sort((a: Record, b: Record) => {
            const name = sortableColumnFirst.current?.name;

            if (name) {
              return a[name] < b[name] ? -1 : 1;
            } else {
              return 0;
            }
          })
      : data.map((item) => ({ id: nanoid(), ...item }))
  );

  const [width, setWidth] = useState(gridWidth);

  const [sortData, setSortData] = useState<{
    column?: string;
    dir?: SortDirection;
  }>(
    sortableColumns.current.length > 0
      ? { column: sortableColumns.current[0].name, dir: "asc" }
      : {}
  );
  const gridRef = useRef<HTMLDivElement>();

  const resizeObserver = useRef<ResizeObserver>();

  const gridClass = useMemo(() => {
    return classNames("rc-data-grid", {
      "rc-data-grid-border": border,
      "rc-data-grid-zebra": zebra,
    });
  }, []);

  const handleSort = useCallback((column: string, dir: SortDirection) => {
    setSortData({ column, dir });
  }, []);

  const columnWidth = useMemo(() => {
    if (width) {
      const usedWidth = columns
        .map((c) => c.width || 0)
        .reduce((a, b) => a + b, 0);

      // usedWidth += (columns.length - 2) * 1;

      return Math.floor(
        (width - usedWidth) /
          (columns.length - columns.filter((col) => col.width).length)
      );
    }
  }, [width]);

  const onRef = useCallback(
    (node: HTMLDivElement) => {
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
      resizeObserver.current = new ResizeObserver((entries) => {
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
      display: "grid",
      width: gridWidth ? `${gridWidth}px` : "100%",
      ...(rowHeight ? { "--row-height": `${rowHeight}px` } : {}),
      gridTemplateColumns: columns
        .map((column) => {
          if (column.width) {
            return `${column.width}px`;
          } else {
            return `${columnWidth}px`;
          }
        })
        .join(" "),
    }),
    [width, columnWidth]
  );

  const sortedData = useMemo(() => {
    return rowData.current.sort((a, b) => {
      if (sortData.dir === "asc" && sortData.column) {
        if (a[sortData.column] < b[sortData.column]) {
          return -1;
        } else if (a[sortData.column] > b[sortData.column]) {
          return 1;
        }

        return 0;
      } else if (sortData.column) {
        console.log(a[sortData.column], b[sortData.column]);
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

  return (
    <div className={gridClass} ref={onRef} role="table">
      <DataGridHeader
        columns={columns}
        style={style}
        onSort={handleSort}
        layoutStyle={layoutStyle}
        border={border}
      />
      {sortedData.map((row) => {
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
          />
        );
      })}
    </div>
  );
};

DataGrid.displayName = "DataGrid";

export { DataGrid };
