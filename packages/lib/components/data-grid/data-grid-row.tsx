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
  zebra,
}: DataRow) => {
  const cellsData = useRef<{ [key: string]: string | number }[]>(
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
      "rc-data-grid-row-zebra": zebra,
    });
  }, [layoutStyle]);

  return (
    <div className={rowClass} style={style} role="row">
      {columnConfigs?.map((col) => {
        const { value, id, name } = cellsData.current.find(
          (cell) => cell.name === col.name
        )!;
        const formatter = col.formatter;
        return (
          <DataGridCell
            value={value}
            key={id}
            name={name + ""}
            border={border}
            fixedHeight={fixedHeight}
            formatter={formatter}
          />
        );
      })}
    </div>
  );
};

DataGridRow.displayName = "DataGridRow";

export { DataGridRow };
