import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  startTransition,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { DataGridHeader } from "./data-grid-header";
import { DataGridProps, SortDirection } from "./data-grid-model";
import { DataGridRow } from "./data-grid-row";
import "./data-grid.scss";

const DataGrid: React.FunctionComponent<DataGridProps> = React.memo(
  ({ columns = [], data, layoutStyle = "comfortable" }: DataGridProps) => {
    const [rowData] = useState<{ [key: string]: string | number }[]>(
      data.map((item) => ({ id: nanoid(), ...item }))
    );
    const gridRef = useRef();
    const [width, setWidth] = useState(0);
    const [sortData, setSortData] = useState<{
      column?: string;
      dir?: SortDirection;
    }>({});

    const handleSort = useCallback(
      (column: string, dir: SortDirection) => {
        startTransition(() => {
          setSortData({ column, dir });
        });
      },
      [rowData.length]
    );

    const columnWidth = useMemo(() => {
      const usedWidth = columns
        .map((c) => c.width || 0)
        .reduce((a, b) => a + b, 0);

      // usedWidth += (columns.length - 1) * 2;

      return Math.round(
        (width - usedWidth) /
          (rowData.length - 1 - columns.filter((col) => col.width).length)
      );
    }, [width]);

    const onRef = useCallback((node) => {
      if (node) {
        gridRef.current = node;
        setWidth((node as HTMLElement).clientWidth);
      }
    }, []);

    const style = useMemo(
      () =>
        ({
          display: "grid",
          columnGap: "2px",
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

    return (
      <div className="rc-data-grid" ref={onRef}>
        <DataGridHeader
          columns={columns}
          style={style}
          onSort={handleSort}
          layoutStyle={layoutStyle}
        />
        {rowData
          .sort((a, b) => {
            if (sortData.column) {
              if (sortData.dir === "asc") {
                return a[sortData.column] < b[sortData.column] ? -1 : 1;
              } else {
                return a[sortData.column] > b[sortData.column] ? -1 : 1;
              }
            } else {
              return 0;
            }
          })
          .map((row) => {
            return (
              <DataGridRow
                data={row}
                key={row.id}
                columnWidth={columnWidth}
                columnConfigs={columns}
                style={style}
                layoutStyle={layoutStyle}
              />
            );
          })}
      </div>
    );
  }
);

DataGrid.displayName = "DataGrid";

export { DataGrid };
