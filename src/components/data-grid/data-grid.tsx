import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DataGridHeader } from "./data-grid-header";
import { DataGridProps, SortDirection } from "./data-grid-model";
import { DataGridRow } from "./data-grid-row";
import "./data-grid.scss";

const DataGrid: React.FunctionComponent<DataGridProps> = ({
  columns = [],
  data,
  layoutStyle = "comfortable",
  border = false,
  gridWidth = 0,
  fixedHeight = false,
}: DataGridProps) => {
  const [rowData, setRowData] = useState<{ [key: string]: string | number }[]>(
    data.map((item) => ({ id: nanoid(), ...item }))
  );
  const [width, setWidth] = useState(gridWidth);
  const [sortData, setSortData] = useState<{
    column?: string;
    dir?: SortDirection;
  }>({});
  const gridRef = useRef<HTMLDivElement>();

  // const isFirstRender = useFirstRender();

  const resizeObserver = useRef<ResizeObserver>();

  const gridClass = useMemo(() => {
    return classNames("rc-data-grid", {
      "rc-data-grid-border": border,
    });
  }, []);

  const handleSort = useCallback(
    (column: string, dir: SortDirection) => {
      startTransition(() => {
        setSortData({ column, dir });
      });
    },
    [rowData.length]
  );

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
    (node) => {
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
    () =>
      ({
        display: "grid",
        width: gridWidth ? `${gridWidth}px` : "100%",
        gridTemplateColumns: columns
          .map((column) => {
            if (column.width) {
              return `${column.width}px`;
            } else {
              return `${columnWidth}px`;
            }
          })
          .join(" "),
      } as CSSProperties),
    [width, columnWidth]
  );

  useEffect(() => {
    startTransition(() => {
      setRowData((prev) => {
        const data = prev.sort((a, b) => {
          if (sortData.column) {
            if (sortData.dir === "asc") {
              return a[sortData.column] < b[sortData.column] ? 1 : -1;
            } else {
              return a[sortData.column] > b[sortData.column] ? 1 : -1;
            }
          } else {
            return 0;
          }
        });
        return data;
      });
    });
  }, [JSON.stringify(sortData)]);

  return (
    <div className={gridClass} ref={onRef}>
      <DataGridHeader
        columns={columns}
        style={style}
        onSort={handleSort}
        layoutStyle={layoutStyle}
        border={border}
      />
      {rowData.map((row) => {
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
          />
        );
      })}
    </div>
  );
};

DataGrid.displayName = "DataGrid";

export { DataGrid };
