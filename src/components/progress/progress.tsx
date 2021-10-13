import classNames from "classnames";
import React, { CSSProperties, useMemo, useRef } from "react";
import "./progress.scss";

interface ProgressModel {
  currentValue?: number;
  maxValue?: number;
  showProgressValue?: boolean;
  type: "infinite" | "progressive";
  width?: number;
  size?: "big" | "small";
}

const Progress: React.FunctionComponent<ProgressModel> = ({
  type = "progressive",
  maxValue = 100,
  currentValue = 0,
  width = 250,
  showProgressValue,
  size = "big",
}) => {
  const progressTrackRef = useRef<HTMLDivElement>(null);

  const progressPercent = useMemo(() => currentValue / maxValue, [
    currentValue,
  ]);

  const progressPercentValue = useMemo<string | number>(() => {
    const val = Math.round(progressPercent * 100);
    return val > 5 ? `${val}%` : 0;
  }, [progressPercent]);

  const canShowProgressValue = useMemo(
    () => showProgressValue && progressPercentValue !== 0,
    [progressPercentValue]
  );

  const fillWidth = useMemo<number>(() => {
    const trackWidth = progressTrackRef.current?.clientWidth;
    if (trackWidth) {
      return Math.round(trackWidth * progressPercent);
    }
    return 0;
  }, [currentValue, progressPercent]);

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
      classNames(["progress-fill", type, progressComplete ? "complete" : ""]),
    [progressComplete]
  );

  const wrapperStyle = useMemo(
    () =>
      ({
        "--width": `${width}px`,
        "--height": size === "big" ? `${20}px` : `${15}px`,
      } as CSSProperties),
    []
  );

  return (
    <div className="progress-wrapper" style={wrapperStyle}>
      <div className="progress-track" ref={progressTrackRef}>
        <span className={fillClass} style={fillStyle}>
          {canShowProgressValue && (
            <span className="progress-percent-value">{`${progressPercentValue}`}</span>
          )}
        </span>
      </div>
    </div>
  );
};

export { Progress };
