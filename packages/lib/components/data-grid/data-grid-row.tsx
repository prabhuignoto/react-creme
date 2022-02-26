import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useMemo, useRef } from 'react';
import { DataGridCell } from './data-grid-cell';
import { DataRow } from './data-grid-model';
import styles from './data-grid.module.scss';

const DataGridRow: React.FunctionComponent<DataRow> = ({
  data,
  columnConfigs,
  style,
  layoutStyle,
  border,
  fixedHeight,
  zebra,
  size,
}: DataRow) => {
  const cellsData = useRef<{ [key: string]: string | number }[]>(
    Object.keys(data)
      .filter(k => k !== 'id')
      .map(key => ({
        id: nanoid(),
        name: key,
        value: data[key],
      }))
  );

  const rowClass = useMemo(() => {
    return classNames(styles.data_grid_row, {
      [styles[`data_grid_row_${layoutStyle}`]]: true,
      [styles.data_grid_border]: border,
      rc_data_grid_row_fixed_height: fixedHeight,
      [styles.data_grid_row_zebra]: zebra,
      [styles[`data_grid_row_${size}`]]: true,
    });
  }, [layoutStyle]);

  return (
    <div className={rowClass} style={style} role="row">
      {columnConfigs?.map(col => {
        const data = cellsData.current.find(cell => cell.name === col.name);

        if (data) {
          const { value, id, name } = data;
          const formatter = col.formatter;
          return (
            <DataGridCell
              value={value}
              key={id}
              name={name + ''}
              border={border}
              fixedHeight={fixedHeight}
              formatter={formatter}
            />
          );
        }
      })}
    </div>
  );
};

DataGridRow.displayName = 'DataGridRow';

export { DataGridRow };
