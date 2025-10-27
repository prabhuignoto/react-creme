import { SpinnerIcon } from '@icons';
import classNames from 'classnames';
import { CSSProperties, FunctionComponent, useMemo } from 'react';
import { isDark } from '../common/utils';
import { SpinnerProps } from './spinner-model';
import styles from './spinner.module.scss';

const Spinner: FunctionComponent<SpinnerProps> = ({
  size = 'sm',
  speed = 'slow',
  label = 'Loading',
}) => {
  const isDarkMode = isDark();

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
    [isDarkMode, size, speed]
  );

  return (
    <span
      className={spinnerClass}
      style={{ '--rc-spinner-speed': speed } as CSSProperties}
      role="img"
      aria-label={label}
    >
      <SpinnerIcon />
    </span>
  );
};

Spinner.displayName = 'Spinner';

export { Spinner };
