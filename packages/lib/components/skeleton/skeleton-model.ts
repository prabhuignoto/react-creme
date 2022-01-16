import { CSSProperties } from "react";

export interface SkeletonModel {
  RTL?: boolean;
  animate?: boolean;
  blocks?: number;
  rowHeight?: number;
  rows?: number;
  showCircle?: boolean;
  style?: CSSProperties;
  width?: number;
}

export interface SkeletonRowModel {
  disableAnimation?: boolean;
  id: string;
  visible?: boolean;
  width?: number;
}

export interface SkeletonBlockModel {
  id: string;
  rows: SkeletonRowModel[];
}
