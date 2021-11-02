import classNames from "classnames";
import React, { CSSProperties, useMemo, useRef } from "react";
import { ProgressModel } from "./progress-model";
import "./progress.scss";

const Progress: React.FunctionComponent<ProgressModel> = ({
  currentValue = 0,
  infiniteStyle = "disappear",
  maxValue = 100,
  showProgressValue = false,
  size = "md",
  type = "progressive",
  width = 250,
}) => {
  const progressTrackRef = useRef<HTMLDivElement>(null);

  const progressPercent = useMemo(
    () => currentValue / maxValue,
    [currentValue]
  );

  const progressPercentValue = useMemo<string | number>(() => {
    const val = Math.round(progressPercent * 100);
    return val > 5 ? `${val}%` : 0;
  }, [progressPercent]);

  const canShowProgressValue = useMemo(
    () =>
      showProgressValue &&
      progressPercentValue !== 0 &&
      type !== "infinite" &&
      size !== "sm",
    [progressPercentValue]
  );

  const fillWidth = useMemo<number>(() => {
    const trackWidth = progressTrackRef.current?.clientWidth;
    if (trackWidth) {
      return Math.round(trackWidth * progressPercent);
    }
    return 0;
  }, [currentValue, progressPercent, progressTrackRef]);

  const fillStyle = useMemo(
    () =>
      ({
        "--width": type === "progressive" ? `${fillWidth}px` : "50%",
      } as CSSProperties),
    [fillWidth]
  );

  const progressComplete = useMemo(
    () => fillWidth === progressTrackRef.current?.clientWidth,
    [fillWidth]
  );

  const fillClass = useMemo(
    () =>
      classNames([
        "progress-fill",
        type,
        infiniteStyle,
        progressComplete ? "complete" : "",
      ]),
    [progressComplete]
  );

  const wrapperStyle = useMemo(
    () =>
      ({
        "--width": `${width}px`,
        "--height":
          size === "lg" ? `${40}px` : size === "md" ? `${20}px` : `${10}px`,
      } as CSSProperties),
    []
  );

  const progressPercentValClass = useMemo(
    () =>
      classNames("progress-percent-value", `progress-percent-value-${size}`),
    []
  );

  return (
    <div
      aria-valuemin={0}
      aria-valuemax={maxValue}
      aria-valuenow={Math.round(progressPercent * maxValue)}
      className="progress-wrapper"
      role="progressbar"
      style={wrapperStyle}
    >
      <div className="progress-track" ref={progressTrackRef}>
        <span className={fillClass} style={fillStyle}>
          {canShowProgressValue && (
            <span
              className={progressPercentValClass}
            >{`${progressPercentValue}`}</span>
          )}
        </span>
      </div>
    </div>
  );
};

export { Progress };
