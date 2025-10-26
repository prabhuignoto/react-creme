import { isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { STATS_DATA } from '../constants';
import styles from '../styles/stats-bar.module.scss';

const StatsBar: FunctionComponent = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  return (
    <div className={cx(styles.stats_bar, isDarkMode ? styles.dark : '')}>
      <div className={styles.stats_container}>
        {STATS_DATA.map((stat, index) => (
          <div key={index} className={styles.stat_item}>
            <div className={styles.stat_icon}>{stat.icon}</div>
            <div className={styles.stat_content}>
              <div className={styles.stat_value}>{stat.value}</div>
              <div className={styles.stat_label}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { StatsBar };
