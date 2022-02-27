import classNames from 'classnames';
import React, { CSSProperties, FunctionComponent, useMemo } from 'react';
import { SkeletonRowProps } from './skeleton-model';
import styles from './skeleton.module.scss';

const SkeletonRow: FunctionComponent<
  SkeletonRowProps & {
    animate?: boolean;
    rowHeight?: number;
  }
> = ({ id, width, animate, rowHeight, disableAnimation }) => {
  const skeletonRowClass = useMemo(
    () =>
      classNames(styles.skeleton_row, {
        [styles.skeleton_animate]: animate,
        [styles.skeleton_disable_animation]: disableAnimation,
      }),
    [disableAnimation]
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
