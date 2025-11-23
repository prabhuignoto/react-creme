import { isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { Check, X, AlertCircle } from 'react-feather';
import { COMPARISON_DATA, LIBRARY_NAMES, ComparisonStatus } from '../constants';
import styles from '../styles/comparison-table.module.scss';

const ComparisonTable: FunctionComponent = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  const renderCell = (value: ComparisonStatus | string, isHighlight = false) => {
    if (value === 'yes') {
      return <Check className={cx(styles.icon, styles.check, isHighlight && styles.highlight)} size={20} />;
    }
    if (value === 'no') {
      return <X className={styles.icon_no} size={20} />;
    }
    if (value === 'partial') {
      return <AlertCircle className={styles.icon_partial} size={20} />;
    }
    return <span className={cx(styles.text_value, isHighlight && styles.highlight_text)}>{value}</span>;
  };

  const libraries = ['reactCreme', 'mui', 'antDesign', 'chakra', 'shadcn'] as const;

  return (
    <section className={cx(styles.comparison_section, isDarkMode ? styles.dark : '')}>
      <div className={styles.comparison_container}>
        <div className={styles.section_header}>
          <h2 className={styles.section_title}>How We Stack Up</h2>
          <p className={styles.section_subtitle}>
            Compare React Creme with popular alternatives
          </p>
        </div>

        {/* Desktop Table View */}
        <div className={styles.table_wrapper}>
          <table className={styles.comparison_table}>
            <thead>
              <tr>
                <th className={styles.feature_header}>Feature</th>
                <th className={cx(styles.library_header, styles.highlight_column)}>
                  <div className={styles.library_name}>
                    <span>React Creme</span>
                    <span className={styles.badge}>⭐</span>
                  </div>
                </th>
                <th className={styles.library_header}>Material-UI</th>
                <th className={styles.library_header}>Ant Design</th>
                <th className={styles.library_header}>Chakra UI</th>
                <th className={styles.library_header}>shadcn/ui</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, index) => (
                <tr key={index} className={styles.data_row}>
                  <td className={styles.feature_cell}>{row.feature}</td>
                  <td className={cx(styles.value_cell, styles.highlight_column)}>
                    {renderCell(row.reactCreme, true)}
                  </td>
                  <td className={styles.value_cell}>{renderCell(row.mui)}</td>
                  <td className={styles.value_cell}>{renderCell(row.antDesign)}</td>
                  <td className={styles.value_cell}>{renderCell(row.chakra)}</td>
                  <td className={styles.value_cell}>{renderCell(row.shadcn)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className={styles.mobile_comparison}>
          {COMPARISON_DATA.map((row, index) => (
            <div key={index} className={styles.comparison_card}>
              <div className={styles.card_feature}>{row.feature}</div>
              <div className={styles.card_libraries}>
                {libraries.map((lib) => (
                  <div
                    key={lib}
                    className={cx(
                      styles.library_comparison,
                      lib === 'reactCreme' && styles.highlight
                    )}
                  >
                    <span className={styles.library_name_mobile}>
                      {LIBRARY_NAMES[lib]}
                      {lib === 'reactCreme' && <span className={styles.badge}>⭐</span>}
                    </span>
                    <span className={styles.library_value}>
                      {renderCell(row[lib], lib === 'reactCreme')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.table_legend}>
          <div className={styles.legend_item}>
            <Check className={cx(styles.icon, styles.check)} size={16} />
            <span>Full Support</span>
          </div>
          <div className={styles.legend_item}>
            <AlertCircle className={styles.icon_partial} size={16} />
            <span>Partial Support</span>
          </div>
          <div className={styles.legend_item}>
            <X className={styles.icon_no} size={16} />
            <span>Not Supported</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ComparisonTable };
