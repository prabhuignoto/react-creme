import { isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { Package, Layers, Zap, Code } from 'react-feather';
import styles from '../styles/stats-bar.module.scss';

export type StatItem = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const StatsBar: FunctionComponent = () => {
  const isDarkMode = useMemo(() => isDark(), []);

  const stats: StatItem[] = [
    {
      icon: <Package size={20} />,
      label: 'Bundle Size',
      value: '~55kb',
    },
    {
      icon: <Layers size={20} />,
      label: 'Components',
      value: '45+',
    },
    {
      icon: <Zap size={20} />,
      label: 'React Version',
      value: '19',
    },
    {
      icon: <Code size={20} />,
      label: 'CSS Approach',
      value: 'Modules',
    },
  ];

  return (
    <div className={cx(styles.stats_bar, isDarkMode ? styles.dark : '')}>
      <div className={styles.stats_container}>
        {stats.map((stat, index) => (
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
