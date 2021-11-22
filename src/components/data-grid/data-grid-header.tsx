import classNames from "classnames";
import React, { startTransition, useMemo, useState } from "react";
import { TriangleIcon } from "../../icons";
import { DataGridCell } from "./data-grid-cell";
import { DataGridHeaderProps, SortDirection } from "./data-grid-model";
import "./data-grid.scss";

const DataGridHeader: React.FunctionComponent<DataGridHeaderProps> = React.memo(
  ({
    columns,
    columnWidth,
    style,
    onSort,
    layoutStyle,
    border,
  }: DataGridHeaderProps) => {
    const [headerColumns, setHeaderColumns] = useState(
      columns.map((col) => ({ ...col, sortDirection: "none" }))
    );

    const handleSort = (column: string, dir: SortDirection) => {
      startTransition(() => {
        setHeaderColumns((columns) =>
          columns.map((col) => ({
            ...col,
            sortDirection: col.name === column ? dir : "none",
          }))
        );
      });

      onSort && onSort(column, dir);
    };

    const headerClass = useMemo(() => {
      return classNames("rc-data-grid-header", {
        [`rc-data-grid-header-${layoutStyle}`]: true,
      });
    }, []);

    return (
      <div className={headerClass} style={style}>
        {headerColumns.map((column) => (
          <div
            className="rc-data-grid-header-cell"
            key={column.name}
            style={{ width: `${columnWidth}px` }}
          >
            <DataGridCell
              name={column.name}
              value={column.name}
              border={border}
            />
            {column.sortable && (
              <span className="rc-data-grid-header-sort-icon-wrapper">
                <span
                  className={classNames("rc-data-grid-header-sort-icon", {
                    "rc-data-grid-header-sort-icon-active":
                      column.sortDirection === "asc",
                  })}
                  onClick={() => handleSort(column.name, "asc")}
                >
                  <TriangleIcon />
                </span>
                <span
                  className={classNames("rc-data-grid-header-sort-icon-desc", {
                    "rc-data-grid-header-sort-icon-active":
                      column.sortDirection === "desc",
                  })}
                  onClick={() => handleSort(column.name, "desc")}
                >
                  <TriangleIcon />
                </span>
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }
);

DataGridHeader.displayName = "DataGridHeader";

export { DataGridHeader };
