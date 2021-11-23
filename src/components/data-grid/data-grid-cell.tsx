import classNames from "classnames";
import React, { useMemo } from "react";
import { DataGridCell as CellModel } from "./data-grid-model";

const DataGridCell: React.FunctionComponent<CellModel> = React.memo(
  ({ name, value, border, fixedHeight }: CellModel) => {
    const columnClass = useMemo(() => {
      return classNames("rc-data-grid-column", {
        "rc-data-grid-column-border": border,
      });
    }, [border]);

    const cellClass = useMemo(() => {
      return classNames("rc-data-grid-column-val", {
        "rc-data-grid-column-val-fixed": fixedHeight,
      });
    }, []);

    return (
      <div className={columnClass}>
        <span className={cellClass}>{value}</span>
      </div>
    );
  }
);

DataGridCell.displayName = "DataGridCell";

export { DataGridCell };
