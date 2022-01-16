import classNames from "classnames";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDrag } from "../common/effects/useDrag";
import { SplitterModel } from "./splitter-model";
import "./splitter.scss";

const round = Math.round;

const Splitter: React.FunctionComponent<SplitterModel> = ({
  dir = "horizontal",
  children,
  minSplitWidth = 200,
  maxSplitWidth = 400,
  minSplitHeight = 100,
  maxSplitHeight = 200,
  border = true,
  handleBarWidth = 6,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef<HTMLSpanElement>(null);
  const gapWidthHalf = useMemo(
    () => round(handleBarWidth / 2),
    [handleBarWidth]
  );

  const [dragStarted, setDragStarted] = useState(false);

  const [percent, setPercent] = useDrag(ref, controlRef, {
    direction: dir,
    maxX: maxSplitWidth,
    maxY: maxSplitHeight,
    minX: minSplitWidth,
    minY: minSplitHeight,
    observeContainer: true,
    onDragEnd: () => setDragStarted(false),
    onDragStart: () => setDragStarted(true),
  });

  const isHorizontal = useMemo(() => dir === "horizontal", []);

  const canSplit = useMemo(() => {
    if (ref.current) {
      const { clientHeight, clientWidth } = ref.current;

      if (dir === "horizontal") {
        return round(clientWidth * percent) <= maxSplitWidth;
      } else {
        return round(clientHeight * percent) <= maxSplitHeight;
      }
    }
  }, [percent]);

  const controlClass = useMemo(
    () =>
      classNames(["splitter-control", `splitter-control-${dir}`], {
        "splitter-control-disable": !canSplit,
        "splitter-control-dragged": dragStarted,
      }),
    [canSplit, dragStarted]
  );

  const partitionOneStyle = useMemo(() => {
    if (ref.current && canSplit) {
      const { clientWidth, clientHeight } = ref.current;
      const width = round(clientWidth * percent) - gapWidthHalf;
      const height = round(clientHeight * percent) - gapWidthHalf;
      const gap = `${handleBarWidth}px`;

      return {
        height: isHorizontal ? "100%" : height,
        width: isHorizontal ? (width !== 0 ? width : minSplitWidth) : "100%",
        ...(isHorizontal ? { paddingRight: gap } : { paddingBottom: gap }),
      } as CSSProperties;
    }
  }, [percent, canSplit, isHorizontal]);

  const partitionTwoStyle = useMemo(() => {
    if (ref.current && canSplit) {
      const { clientWidth, clientHeight } = ref.current;

      if (percent) {
        const gap = handleBarWidth;
        const width = round(clientWidth * (1 - percent)) - gapWidthHalf;
        const height = round(clientHeight * (1 - percent)) - gapWidthHalf;

        return {
          height: isHorizontal ? "100%" : height,
          width: isHorizontal ? width : "100%",
          ...(isHorizontal
            ? { paddingLeft: `${gap}px` }
            : { paddingTop: `-${gap}px` }),
        } as CSSProperties;
      } else {
        return {
          height: isHorizontal ? "100%" : clientHeight - minSplitHeight,
          width: isHorizontal ? clientWidth - minSplitWidth : "100%",
        } as CSSProperties;
      }
    }
  }, [percent, dir, canSplit, isHorizontal]);

  const wrapperClass = useMemo(
    () =>
      classNames(["splitter-wrapper", `splitter-wrapper-${dir}`], {
        "splitter-wrapper-border": border,
      }),
    []
  );

  const setWrapperRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      ref.current = node;
      const { clientWidth, clientHeight } = node;
      let percent = 0;

      if (dir === "horizontal") {
        percent = minSplitWidth ? minSplitWidth / clientWidth : 0.5;
      } else if (dir === "vertical") {
        percent = minSplitHeight ? minSplitHeight / clientHeight : 0.5;
      }

      setPercent(percent);
    }
  }, []);

  useEffect(() => {
    if (controlRef.current) {
      if (dir === "horizontal") {
        controlRef.current.style.left = `${minSplitWidth}px`;
      } else {
        controlRef.current.style.top = `${minSplitHeight}px`;
      }
    }
  }, []);

  const handleBarStyle = useMemo(() => {
    if (dir === "horizontal") {
      return {
        width: `${handleBarWidth}px`,
      } as CSSProperties;
    } else {
      return {
        height: `${handleBarWidth}px`,
      } as CSSProperties;
    }
  }, []);

  return (
    <div className={wrapperClass} ref={setWrapperRef}>
      <span
        className={controlClass}
        ref={controlRef}
        style={handleBarStyle}
      ></span>
      <div className="splitter-partition" style={partitionOneStyle}>
        {children && children[0]}
      </div>
      <div className="splitter-partition" style={partitionTwoStyle}>
        {children && children[1]}
      </div>
    </div>
  );
};

export { Splitter };
