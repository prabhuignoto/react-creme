import classNames from 'classnames';
import DOMPurify from 'dompurify';
import React, { useMemo } from 'react';
import { isDark } from '../common/utils';
import { DataGridCell as CellModel } from './data-grid-model';
import styles from './data-grid.module.scss';

// Apply React.memo to prevent unnecessary re-renders
const DataGridCell: React.FunctionComponent<CellModel> = React.memo(
  ({
    value,
    border,
    fixedHeight,
    formatter,
    isHeader,
    zebra,
    parseHtml,
  }: CellModel) => {
    // Simple function call - no need for useMemo
    const isDarkMode = isDark();

    const columnClass = useMemo(() => {
      return classNames(styles.cell, {
        [styles.cell_border]: border,
        [styles.dark]: isDarkMode,
      });
    }, [border, isDarkMode]);

    const cellClass = useMemo(() => {
      return classNames(styles.cell_val, {
        [styles.cell_val_fixed]: fixedHeight,
        [styles.dark]: isDarkMode,
        [styles.header]: isHeader,
      });
    }, [fixedHeight, isDarkMode, isHeader]);

    const wrapperClass = useMemo(() => {
      return classNames(styles.cell_wrapper, {
        [styles.zebra]: zebra,
        [styles.dark]: isDarkMode && zebra,
      });
    }, [zebra, isDarkMode]);

    // Format the value only when needed
    const formattedValue = useMemo(() => {
      if (formatter) {
        return formatter(value);
      }
      return value;
    }, [value, formatter]);

    return (
      <div
        className={classNames(columnClass, {
          [styles.zebra]: zebra, // Ensure zebra class is applied here
        })}
      >
        <span className={wrapperClass}>
          <span className={cellClass}>
            {/* Render ReactNode directly or parse HTML if parseHtml is enabled */}
            {parseHtml && typeof formattedValue === 'string' ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(formattedValue),
                }}
              />
            ) : (
              formattedValue
            )}
          </span>
        </span>
      </div>
    );
  }
);

DataGridCell.displayName = 'DataGridCell';

export { DataGridCell };
