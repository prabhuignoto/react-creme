import classNames from "classnames";
import React, { CSSProperties, useEffect, useMemo, useRef } from "react";
import { useDrag } from "../common/effects/useDrag";
import { SplitterModel } from "./splitter-model";
import "./splitter.scss";

const round = Math.round;

const Splitter: React.FunctionComponent<SplitterModel> = ({
  dir = "horizontal",
  children,
  minSplitWidth = 350,
  maxSplitWidth = 650,
  minSplitHeight = 200,
  maxSplitHeight = 300,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLSpanElement>(null);

  const [percent, setPercent] = useDrag(wrapperRef, controlRef, {
    direction: dir,
    maxX: maxSplitWidth,
    maxY: maxSplitHeight,
    minX: minSplitWidth,
    minY: minSplitHeight,
  });

  const canSplit = useMemo(() => {
    if (wrapperRef.current) {
      const { clientHeight, clientWidth } = wrapperRef.current;

      if (dir === "horizontal") {
        return round(clientWidth * percent) <= maxSplitWidth;
      } else {
        return round(clientHeight * percent) <= maxSplitHeight;
      }
    }
  }, [wrapperRef.current, percent]);

  const controlClass = useMemo(
    () =>
      classNames(["splitter-control", `splitter-control-${dir}`], {
        "splitter-control-disable": !canSplit,
      }),
    [canSplit]
  );

  const partitionOneStyle = useMemo(() => {
    if (!wrapperRef.current || !canSplit) {
      return;
    }

    const { clientWidth, clientHeight } = wrapperRef.current;
    const width = round(clientWidth * percent);
    const height = round(clientHeight * percent);

    return {
      width: dir === "horizontal" ? width : "100%",
      height: dir === "horizontal" ? "100%" : height,
    } as CSSProperties;
  }, [percent, canSplit]);

  const partitionTwoStyle = useMemo(() => {
    if (!wrapperRef.current || !canSplit) {
      return;
    }

    const { clientWidth, clientHeight } = wrapperRef.current;

    const width = round(clientWidth * (1 - percent));
    const height = round(clientHeight * (1 - percent));

    return {
      width: dir === "horizontal" ? width : "100%",
      height: dir === "horizontal" ? "100%" : height,
    } as CSSProperties;
  }, [percent, dir, canSplit]);

  const wrapperClass = useMemo(
    () => classNames(["splitter-wrapper", `splitter-wrapper-${dir}`]),
    []
  );

  useEffect(() => {
    if (wrapperRef.current) {
      const { clientWidth, clientHeight } = wrapperRef.current;

      let percent = 0;

      if (dir === "horizontal") {
        percent = minSplitWidth / clientWidth;
      } else if (dir === "vertical") {
        percent = minSplitHeight / clientHeight;
      }

      setPercent(percent);
    }
  }, [wrapperRef]);

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
    <div className={wrapperClass} ref={wrapperRef}>
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
