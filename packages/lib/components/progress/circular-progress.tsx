import classNames from 'classnames';
import React, { useMemo } from 'react';
import { isDark } from '../common/utils';
import styles from './circular-progress.module.scss';

export interface CircularProgressProps {
  _innerCircleColor?: string;
  /**
   * Accessibility label for the progress indicator
   * @default 'Loading'
   */
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  style?: 'double-ring' | 'default';
  type?: 'infinite' | 'progressive';
}

const CircularProgress: React.FunctionComponent<CircularProgressProps> = ({
  size = 'sm',
  style = 'default',
  label = 'Loading',
}) => {
  const isDarkMode = isDark();
  const wrapperClass = useMemo(() => {
    return classNames(
      styles.circular_progress,
      styles[`circular_progress_${size}`],
      {
        [styles.dark]: isDarkMode,
      }
    );
  }, [isDarkMode, size]);
  return (
    <span className={wrapperClass} role="progressbar" aria-label={label}>
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
