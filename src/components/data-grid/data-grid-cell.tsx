import classNames from "classnames";
import React, { useMemo } from "react";
import { DataGridCell as CellModel } from "./data-grid-model";

const DataGridCell: React.FunctionComponent<CellModel> = React.memo(
  ({ name, value, border }: CellModel) => {
    const columnClass = useMemo(() => {
      return classNames("rc-data-grid-column", {
        "rc-data-grid-column-border": border,
      });
    }, [border]);

    return (
      <div className={columnClass}>
        <span className="rc-data-grid-column-val">{value}</span>
      </div>
    );
  }
);

DataGridCell.displayName = "DataGridCell";

export { DataGridCell };
