export interface SkeletonModel {
  rows?: number;
  width?: number;
  blink?: boolean;
  rowHeight?: number;
  blocks?: number;
  showCircle?: boolean;
  animate?: boolean;
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
