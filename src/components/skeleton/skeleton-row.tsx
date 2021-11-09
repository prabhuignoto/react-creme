import classNames from "classnames";
import React, { CSSProperties, FunctionComponent, useMemo } from "react";
import { SkeletonRowModel } from "./skeleton-model";

const SkeletonRow: FunctionComponent<
  SkeletonRowModel & { blink?: boolean; rowHeight?: number }
> = ({ id, visible, width, blink, rowHeight, disableAnimation }) => {
  const skeletonRowClass = useMemo(
    () =>
      classNames("rc-skeleton-row", {
        "rc-skeleton-blink": blink,
        "rc-skeleton-disable-animation": disableAnimation,
      }),
    [disableAnimation]
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

export { SkeletonRow };
