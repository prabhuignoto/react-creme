import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  SkeletonBlockModel,
  SkeletonModel,
  SkeletonRowModel,
} from "./skeleton-model";
import "./skeleton.scss";

const SkeletonRow: FunctionComponent<
  SkeletonRowModel & { blink?: boolean; rowHeight?: number }
> = ({ id, visible, width, blink, rowHeight }) => {
  const skeletonRowClass = useMemo(
    () =>
      classNames("rc-skeleton-row", {
        "rc-skeleton-blink": blink,
      }),
    []
  );

  const rowStyle = useMemo(
    () =>
      ({
        "--height": `${rowHeight}px`,
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

const Skeleton: FunctionComponent<SkeletonModel> = ({
  rows = 4,
  blink = false,
  rowHeight = 30,
  blocks = 1,
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
      const width = node.clientWidth - 32;
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
    <div className="rc-skeleton-wrapper" ref={onInit} data-testid="rc-skeleton">
      {skeletonBlocks.map(({ id, rows }) => (
        <div className="rc-skeleton-block" key={id}>
          {rows.map(
            (row) =>
              row.visible && (
                <SkeletonRow
                  {...row}
                  key={row.id}
                  rowHeight={rowHeight}
                  blink={blink}
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
