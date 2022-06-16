import classNames from 'classnames';
import { CSSProperties, FunctionComponent, useMemo } from 'react';
import { isDark } from '../common/utils';
import { SkeletonRowProps } from './skeleton-model';
import styles from './skeleton.module.scss';

const SkeletonRow: FunctionComponent<
  SkeletonRowProps & {
    animate?: boolean;
    rowHeight?: number;
  }
> = ({ id, width, animate, rowHeight, disableAnimation }) => {
  const isDarkMode = useMemo(() => isDark(), []);
  const skeletonRowClass = useMemo(
    () =>
      classNames(styles.row, 'rc-skeleton-row', {
        [styles.animate]: animate,
        [styles.disable_animation]: disableAnimation,
        [styles.dark]: isDarkMode,
      }),
    [disableAnimation, isDarkMode]
  );

  const rowStyle = useMemo(
    () =>
      ({
        '--height': `${rowHeight}px`,
      } as CSSProperties),
    [rowHeight]
  );

  return (
    <span
      className={skeletonRowClass}
      key={id}
      style={{ width: `${width}px`, ...rowStyle }}
    ></span>
  );
};

export { SkeletonRow };
