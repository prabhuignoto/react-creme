import classNames from 'classnames';
import React, { CSSProperties, FunctionComponent, useMemo } from 'react';
import { SkeletonRowProps } from './skeleton-model';

const SkeletonRow: FunctionComponent<
  SkeletonRowProps & { animate?: boolean; rowHeight?: number }
> = ({ id, visible, width, animate, rowHeight, disableAnimation }) => {
  const skeletonRowClass = useMemo(
    () =>
      classNames('rc-skeleton-row', {
        'rc-skeleton-animate': animate,
        'rc-skeleton-disable-animation': disableAnimation,
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
