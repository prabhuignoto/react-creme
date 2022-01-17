import { CSSProperties } from "react";

export interface SkeletonProps {
  RTL?: boolean;
  animate?: boolean;
  blocks?: number;
  rowHeight?: number;
  rows?: number;
  showCircle?: boolean;
  style?: CSSProperties;
  width?: number;
}

export interface SkeletonRowProps {
  disableAnimation?: boolean;
  id: string;
  visible?: boolean;
  width?: number;
}

export interface SkeletonBlockProps {
  id: string;
  rows: SkeletonRowProps[];
}
