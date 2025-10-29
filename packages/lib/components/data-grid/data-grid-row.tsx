import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useMemo } from 'react';
import { isDark } from '../common/utils';
import { DataGridCell } from './data-grid-cell';
import { DataRow } from './data-grid-model';
import styles from './data-grid.module.scss';

// Implement React.memo to prevent unnecessary re-renders
const DataGridRow: React.FunctionComponent<DataRow> = React.memo(
  ({
    data,
    columnConfigs,
    style,
    layoutStyle,
    border,
    fixedHeight,
    zebra,
    size,
    rowIndex,
  }: DataRow) => {
    // Simple function call - no need for useMemo
    const isDarkMode = isDark();

    // Process cell data once and memoize it
    const cellsData = useMemo(
      () =>
        Object.keys(data)
          .filter(k => k !== 'id')
          .map(key => ({
            id: nanoid(),
            name: key,
            value: data[key],
          })),
      [data]
    );

    const rowClass = useMemo(() => {
      return classNames(styles.row, {
        [styles[`row_${layoutStyle}`]]: true,
        [styles.border]: border,
        rc_row_fixed_height: fixedHeight,
        [styles.zebra]: zebra,
        [styles[`row_${size}`]]: true,
        [styles.dark]: isDarkMode,
      });
    }, [layoutStyle, border, fixedHeight, zebra, size, isDarkMode]);

    return (
      <div
        className={rowClass}
        style={style}
        role="row"
        aria-rowindex={rowIndex}
      >
        {columnConfigs?.map((col, colIndex) => {
          const cellData = cellsData.find(cell => cell.name === col.name);

          if (cellData) {
            const { value, id, name } = cellData;
            const formatter = col.formatter;
            return (
              <div key={id} role="cell" aria-colindex={colIndex + 1}>
                <DataGridCell
                  value={value ?? ''}
                  name={name}
                  border={border}
                  fixedHeight={fixedHeight}
                  formatter={formatter}
                  zebra={zebra}
                  parseHtml={col.parseHtml}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
);

DataGridRow.displayName = 'DataGridRow';

export { DataGridRow };
