import classNames from 'classnames';
import React, { useMemo } from 'react';
import { DataGridCell as CellModel } from './data-grid-model';

const DataGridCell: React.FunctionComponent<CellModel> = React.memo(
  ({ value, border, fixedHeight, formatter }: CellModel) => {
    const columnClass = useMemo(() => {
      return classNames('rc-data-grid-cell', {
        'rc-data-grid-cell-border': border,
      });
    }, [border]);

    const cellClass = useMemo(() => {
      return classNames('rc-data-grid-cell-val', {
        'rc-data-grid-cell-val-fixed': fixedHeight,
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
