import classNames from 'classnames';
import React, { useMemo } from 'react';
import { isDark } from '../common/utils';
import styles from './circular-progress.module.scss';

export interface CircularProgressProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  style?: 'double-ring' | 'default';
  type?: 'infinite' | 'progressive';
}

const CircularProgress: React.FunctionComponent<CircularProgressProps> = ({
  size = 'sm',
  style = 'default',
}) => {
  const isDarkMode = useMemo(() => isDark(), []);
  const wrapperClass = useMemo(() => {
    return classNames(
      styles.circular_progress,
      styles[`circular_progress_${size}`],
      {
        [styles.dark]: isDarkMode,
      }
    );
  }, []);
  return (
    <span className={wrapperClass}>
      {/* {style === 'double-ring' && <span className={styles.inner}></span>} */}
      {style === 'default' && (
        <span
          className={classNames(styles.inner_circle_2, {
            [styles.dark]: isDarkMode,
          })}
        ></span>
      )}
    </span>
  );
};

export { CircularProgress };
