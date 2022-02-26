import classNames from 'classnames';
import React, { useMemo } from 'react';
import { DataGridCell as CellModel } from './data-grid-model';
import styles from './data-grid.module.scss';

const DataGridCell: React.FunctionComponent<CellModel> = React.memo(
  ({ value, border, fixedHeight, formatter }: CellModel) => {
    const columnClass = useMemo(() => {
      return classNames(styles.data_grid_cell, {
        [styles.data_grid_cell_border]: border,
      });
    }, [border]);

    const cellClass = useMemo(() => {
      return classNames(styles.data_grid_cell_val, {
        [styles.data_grid_cell_val_fixed]: fixedHeight,
      });
    }, []);

    return (
      <div className={columnClass} role="cell">
        <span
          className={cellClass}
          dangerouslySetInnerHTML={{
            __html: formatter
              ? (formatter(value) as string)
              : (value as string),
          }}
        ></span>
      </div>
    );
  }
);

DataGridCell.displayName = 'DataGridCell';

export { DataGridCell };
