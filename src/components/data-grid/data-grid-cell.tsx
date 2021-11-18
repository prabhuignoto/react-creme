import React from "react";
import { DataGridCell as CellModel } from "./data-grid-model";

const DataGridCell: React.FunctionComponent<CellModel> = React.memo(
  ({ name, value }: CellModel) => {
    return (
      <div className="rc-data-grid-column">
        <span className="rc-data-grid-column-val">{value}</span>
      </div>
    );
  }
);

DataGridCell.displayName = "DataGridCell";

export { DataGridCell };
