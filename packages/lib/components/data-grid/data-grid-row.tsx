import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useMemo, useRef } from 'react';
import { isDark } from '../common/utils';
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
  const isDarkMode = useMemo(() => isDark(), []);
  const cellsData = useRef<{ [key: string]: string | number | boolean }[]>(
    Object.keys(data)
      .filter(k => k !== 'id')
      .map(key => ({
        id: nanoid(),
        name: key,
        value: data[key],
      }))
  );

  const rowClass = useMemo(() => {
    return classNames(styles.row, {
      [styles[`row_${layoutStyle}`]]: true,
      [styles.border]: border,
      rc_row_fixed_height: fixedHeight,
      // [styles.row_zebra]: zebra,
      [styles[`row_${size}`]]: true,
      [styles.dark]: isDarkMode,
    });
  }, [layoutStyle, zebra]);

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
              zebra={zebra}
            />
          );
        }
      })}
    </div>
  );
};

DataGridRow.displayName = 'DataGridRow';

export { DataGridRow };
