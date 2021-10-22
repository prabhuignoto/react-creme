import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import "./skeleton.scss";

export interface SkeletonModel {
  rows?: number;
  width?: number;
  blink?: boolean;
  rowHeight?: number;
}

export interface SkeletonRowModel {
  id: string;
  visible?: boolean;
  width?: number;
}

const Skeleton: FunctionComponent<SkeletonModel> = ({
  rows = 4,
  blink = false,
  rowHeight = 10,
}) => {
  const [skeletons, setSkeletons] = useState<SkeletonRowModel[]>(
    Array.from({ length: rows }).map(() => ({
      id: nanoid(),
      visible: false,
      width: 0,
    }))
  );

  const onInit = useCallback((node) => {
    if (node) {
      const width = node.clientWidth;
      const width2 = Math.round(node.clientWidth / 2);

      setSkeletons((skeletons) =>
        skeletons.map((item) => ({
          ...item,
          width: Math.max(
            Math.round(width * Math.random()),
            Math.round(width2 * Math.random())
          ),
          visible: true,
        }))
      );
    }
  }, []);

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
    []
  );

  return (
    <div className="rc-skeleton-wrapper" ref={onInit} data-testid="rc-skeleton">
      {skeletons.map(
        ({ id, visible, width }) =>
          visible && (
            <span
              className={skeletonRowClass}
              key={id}
              style={{ width: `${width}px`, ...rowStyle }}
            ></span>
          )
      )}
    </div>
  );
};

export { Skeleton };
