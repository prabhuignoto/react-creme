import { nanoid } from "nanoid";
import React, { FunctionComponent, useCallback, useState } from "react";
import { SkeletonBlockModel, SkeletonModel } from "./skeleton-model";
import { SkeletonRow } from "./skeleton-row";
import "./skeleton.scss";

const Skeleton: FunctionComponent<SkeletonModel> = ({
  rows = 4,
  rowHeight = 30,
  blocks = 1,
  showCircle = false,
  animate = false,
  style,
}) => {
  const [skeletonBlocks, setSkeletonBlocks] = useState<SkeletonBlockModel[]>(
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
            width: Math.max(
              Math.round(width * Math.random()),
              Math.round(width2 * Math.random())
            ),
            visible: true,
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
        <div className="rc-skeleton-block" key={id}>
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

export { Skeleton };
