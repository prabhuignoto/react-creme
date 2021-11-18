import React, { CSSProperties } from "react";
import "./circular-progress.scss";

interface CircularProgressProps {
  size?: number;
  style?: "double-ring" | "default";
  type?: "infinite" | "progressive";
}

const CircularProgress: React.FunctionComponent<CircularProgressProps> = ({
  size = 30,
  style = "default",
  type = "infinite",
}) => {
  return (
    <span
      className="circular-progress-wrapper"
      style={{ "--size": `${size}px` } as CSSProperties}
    >
      {style === "double-ring" && <span className="inner-circle"></span>}
      {style === "default" && <span className="inner-circle-2"></span>}
    </span>
  );
};

export { CircularProgress };
