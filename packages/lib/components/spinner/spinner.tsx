import classNames from 'classnames';
import { CSSProperties, FunctionComponent, useMemo } from 'react';
import { SpinnerIcon } from '../../icons';
import { isDark } from '../common/utils';
import styles from './spinner.module.scss';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'medium' | 'fast';
}

const Spinner: FunctionComponent<SpinnerProps> = ({
  size = 'sm',
  speed = 'medium',
}) => {
  const isDarkMode = useMemo(() => isDark(), []);

  const spinnerClass = useMemo(
    () =>
      classNames(
        styles.spinner,
        styles[`spinner_${size}`],
        styles[`spinner_${speed}`],
        {
          [styles.dark]: isDarkMode,
        }
      ),
    []
  );

  return (
    <span
      className={spinnerClass}
      style={{ '--rc-spinner-speed': speed } as CSSProperties}
      role="img"
    >
      <SpinnerIcon />
    </span>
  );
};

Spinner.displayName = 'Spinner';

export { Spinner };
