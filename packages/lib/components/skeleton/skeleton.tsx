import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { FunctionComponent, useCallback, useState } from 'react';
import { SkeletonBlockProps, SkeletonProps } from './skeleton-model';
import { SkeletonRow } from './skeleton-row';
import './skeleton.scss';

const Skeleton: FunctionComponent<SkeletonProps> = ({
  rows = 4,
  rowHeight = 10,
  blocks = 1,
  showCircle = false,
  animate = false,
  style,
  RTL = false,
}) => {
  const [skeletonBlocks, setSkeletonBlocks] = useState<SkeletonBlockProps[]>(
    Array.from({ length: blocks }).map(() => ({
      id: nanoid(),
      rows: Array.from({ length: rows }).map(() => ({
        id: nanoid(),
        visible: false,
        width: 0,
      })),
    }))
  );

  const onInit = useCallback((node) => {
    if (node) {
      const width = node.clientWidth - 30;
      const width2 = Math.round(width / 2);

      setSkeletonBlocks((blocks) =>
        blocks.map((item) => ({
          ...item,
          rows: item.rows.map((row) => ({
            ...row,
            visible: true,
            width: Math.max(
              Math.round(width * Math.random()),
              Math.round(width2 * Math.random())
            ),
          })),
        }))
      );
    }
  }, []);

  return (
    <div
      className="rc-skeleton-wrapper"
      ref={onInit}
      data-testid="rc-skeleton"
      style={style}
    >
      {skeletonBlocks.map(({ id, rows }) => (
        <div
          className={classNames('rc-skeleton-block', {
            'rc-skeleton-block-rtl': RTL,
          })}
          key={id}
        >
          {showCircle && <div className="rc-skeleton-circle" />}
          {rows.map(
            (row) =>
              row.visible && (
                <SkeletonRow
                  {...row}
                  key={row.id}
                  rowHeight={rowHeight}
                  animate={animate}
                  disableAnimation={!animate}
                />
              )
          )}
        </div>
      ))}
      {}
    </div>
  );
};

Skeleton.displayName = 'Skeleton';

export { Skeleton };
