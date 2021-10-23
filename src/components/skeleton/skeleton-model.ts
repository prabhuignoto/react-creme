export interface SkeletonModel {
  rows?: number;
  width?: number;
  blink?: boolean;
  rowHeight?: number;
  blocks?: number;
}

export interface SkeletonRowModel {
  id: string;
  visible?: boolean;
  width?: number;
}

export interface SkeletonBlockModel {
  id: string;
  rows: SkeletonRowModel[];
}
