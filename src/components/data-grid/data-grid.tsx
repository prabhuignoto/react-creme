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
import { useFirstRender } from "../common/effects/useFirstRender";
import { DataGridHeader } from "./data-grid-header";
import { DataGridProps, SortDirection } from "./data-grid-model";
import { DataGridRow } from "./data-grid-row";
import "./data-grid.scss";

const DataGrid: React.FunctionComponent<DataGridProps> = React.memo(
  ({
    columns = [],
    data,
    layoutStyle = "comfortable",
    border = false,
    gridWidth = 0,
    fixedHeight = false,
  }: DataGridProps) => {
    const [rowData] = useState<{ [key: string]: string | number }[]>(
      data.map((item) => ({ id: nanoid(), ...item }))
    );
    const gridRef = useRef<HTMLDivElement>();
    const [width, setWidth] = useState(gridWidth);
    const [sortData, setSortData] = useState<{
      column?: string;
      dir?: SortDirection;
    }>({});

    const isFirstRender = useFirstRender();

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
      let usedWidth = columns
        .map((c) => c.width || 0)
        .reduce((a, b) => a + b, 0);

      usedWidth += (columns.length - 1) * 2;

      return Math.floor(
        (width - usedWidth) /
          (columns.length - columns.filter((col) => col.width).length)
      );
    }, [width]);

    const onRef = useCallback(
      (node) => {
        if (node) {
          gridRef.current = node;

          if (!gridWidth) {
            setWidth((node as HTMLElement).clientWidth);
          }
        }
      },
      [gridWidth]
    );

    useEffect(() => {
      if (!isFirstRender.current && gridRef.current) {
        setWidth(gridWidth);
      }
    }, [gridWidth]);

    const style = useMemo(
      () =>
        ({
          display: "grid",
          columnGap: "2px",
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

    return (
      <div className={gridClass} ref={onRef}>
        <DataGridHeader
          columns={columns}
          style={style}
          onSort={handleSort}
          layoutStyle={layoutStyle}
          border={border}
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
                border={border}
                fixedHeight={fixedHeight}
              />
            );
          })}
      </div>
    );
  }
);

DataGrid.displayName = "DataGrid";

export { DataGrid };
