import { CSSProperties } from "react";

export interface SkeletonModel {
  rows?: number;
  width?: number;
  rowHeight?: number;
  blocks?: number;
  showCircle?: boolean;
  animate?: boolean;
  style?: CSSProperties;
}

export interface SkeletonRowModel {
  id: string;
  visible?: boolean;
  width?: number;
  disableAnimation?: boolean;
}

export interface SkeletonBlockModel {
  id: string;
  rows: SkeletonRowModel[];
}
