import classNames from 'classnames';
import React, { useMemo } from 'react';
import './circular-progress.scss';

export interface CircularProgressProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  style?: 'double-ring' | 'default';
  type?: 'infinite' | 'progressive';
}

const CircularProgress: React.FunctionComponent<CircularProgressProps> = ({
  size = 'sm',
  style = 'default',
  type = 'infinite',
}) => {
  const wrapperClass = useMemo(() => {
    return classNames('rc-circular-progress', `rc-circular-progress-${size}`);
  }, []);
  return (
    <span className={wrapperClass}>
      {style === 'double-ring' && <span className="inner-circle"></span>}
      {style === 'default' && <span className="inner-circle-2"></span>}
    </span>
  );
};

export { CircularProgress };
