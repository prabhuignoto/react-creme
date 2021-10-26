import classNames from "classnames";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef<HTMLSpanElement>(null);

  const [percent, setPercent] = useDrag(ref, controlRef, {
    direction: dir,
    maxX: maxSplitWidth,
    maxY: maxSplitHeight,
    minX: minSplitWidth,
    minY: minSplitHeight,
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
      }),
    [canSplit]
  );

  const partitionOneStyle = useMemo(() => {
    if (ref.current && canSplit) {
      const { clientWidth, clientHeight } = ref.current;
      const width = round(clientWidth * percent);
      const height = round(clientHeight * percent);

      return {
        width: isHorizontal ? (width !== 0 ? width : minSplitWidth) : "100%",
        height: isHorizontal ? "100%" : height,
      } as CSSProperties;
    }
  }, [percent, canSplit, isHorizontal]);

  const partitionTwoStyle = useMemo(() => {
    if (ref.current && canSplit) {
      const { clientWidth, clientHeight } = ref.current;

      if (percent) {
        const width = round(clientWidth * (1 - percent));
        const height = round(clientHeight * (1 - percent));

        return {
          width: isHorizontal ? width : "100%",
          height: isHorizontal ? "100%" : height,
        } as CSSProperties;
      } else {
        return {
          width: isHorizontal ? clientWidth - minSplitWidth : "100%",
          height: isHorizontal ? "100%" : clientHeight - minSplitHeight,
        } as CSSProperties;
      }
    }
  }, [percent, dir, canSplit, isHorizontal]);

  const wrapperClass = useMemo(
    () => classNames(["splitter-wrapper", `splitter-wrapper-${dir}`]),
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

  return (
    <div className={wrapperClass} ref={setWrapperRef}>
      <span className={controlClass} ref={controlRef}></span>
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
