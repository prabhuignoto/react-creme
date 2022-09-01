import classNames from 'classnames';
import React, { useMemo } from 'react';
import { isDark } from '../common/utils';
import { DataGridCell as CellModel } from './data-grid-model';
import styles from './data-grid.module.scss';

const DataGridCell: React.FunctionComponent<CellModel> = ({
  value,
  border,
  fixedHeight,
  formatter,
  isHeader,
  zebra,
}: CellModel) => {
  const isDarkMode = useMemo(() => isDark(), []);

  const columnClass = useMemo(() => {
    return classNames(styles.cell, {
      [styles.cell_border]: border,
      [styles.dark]: isDarkMode,
    });
  }, [border]);

  const cellClass = useMemo(() => {
    return classNames(
      styles.cell_val,
      {
        [styles.cell_val_fixed]: fixedHeight,
        [styles.dark]: isDarkMode,
      },
      isHeader ? styles.header : ''
    );
  }, [isHeader]);

  return (
    <div className={columnClass} role="cell">
      <span
        className={classNames(
          styles.outer,
          zebra ? styles.zebra : '',
          isDarkMode ? styles.dark : ''
        )}
      >
        <span
          className={cellClass}
          dangerouslySetInnerHTML={{
            __html: formatter
              ? (formatter(value) as string)
              : (value as string),
          }}
        ></span>
      </span>
    </div>
  );
};

DataGridCell.displayName = 'DataGridCell';

export { DataGridCell };
