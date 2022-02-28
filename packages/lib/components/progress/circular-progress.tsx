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
    return classNames('circular-progress', `circular-progress-${size}`);
  }, []);
  return (
    <span className={wrapperClass}>
      {style === 'double-ring' && <span className="inner-circle"></span>}
      {style === 'default' && (
        <span
          className={classNames('inner-circle-2', {
            [styles.dark]: isDarkMode,
          })}
        ></span>
      )}
    </span>
  );
};

export { CircularProgress };
