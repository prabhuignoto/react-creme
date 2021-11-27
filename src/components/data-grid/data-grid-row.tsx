import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useMemo, useRef } from "react";
import { DataGridCell } from "./data-grid-cell";
import { DataRow } from "./data-grid-model";
import "./data-grid.scss";

const DataGridRow: React.FunctionComponent<DataRow> = ({
  data,
  columnWidth,
  columnConfigs,
  style,
  layoutStyle,
  border,
  fixedHeight,
}: DataRow) => {
  const cellsData = useRef(
    Object.keys(data)
      .filter((k) => k !== "id")
      .map((key) => ({
        id: nanoid(),
        name: key,
        value: data[key],
      }))
  );

  const rowClass = useMemo(() => {
    return classNames("rc-data-grid-row", {
      [`rc-data-grid-row-${layoutStyle}`]: true,
      "rc-data-grid-row-border": border,
      "rc-data-grid-row-fixed-height": fixedHeight,
    });
  }, []);

  return (
    <div className={rowClass} style={style}>
      {cellsData.current.map((cell) => {
        return (
          <DataGridCell
            value={cell.value}
            key={cell.id}
            name={cell.name}
            border={border}
            fixedHeight={fixedHeight}
          />
        );
      })}
    </div>
  );
};

DataGridRow.displayName = "DataGridRow";

export { DataGridRow };
