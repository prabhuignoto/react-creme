import React from "react";

export interface SplitterModel {
  dir: "horizontal" | "vertical";
  children: React.ReactNode[];
  minSplitWidth?: number;
  maxSplitWidth?: number;
  minSplitHeight?: number;
  maxSplitHeight?: number;
}
