import { Dispatch, RefObject, SetStateAction } from 'react';

export interface Settings {
  currentValue?: number;
  direction: 'horizontal' | 'vertical';
  endValue?: number;
  maxX?: number;
  maxY?: number;
  minX?: number;
  minY?: number;
  moveToPositionOnClick?: boolean;
  observeContainer?: boolean;
  offsetLeft?: number;
  onDragEnd?: () => void;
  onDragStart?: () => void;
  startValue?: number;
  updatePosition?: boolean;
}

export type useDragFunctionType = (
  container: RefObject<HTMLElement>,
  target: RefObject<HTMLElement | null>,
  settings: Settings
) => [number, Dispatch<SetStateAction<number>>];
