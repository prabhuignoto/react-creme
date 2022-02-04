import { Dispatch, RefObject, SetStateAction } from 'react';

export interface Settings {
  currentValue?: number;
  direction: 'horizontal' | 'vertical';
  endValue?: number;
  maxX?: number;
  maxY?: number;
  minX?: number;
  minY?: number;
  observeContainer?: boolean;
  offsetLeft?: number;
  onDragEnd?: () => void;
  onDragStart?: () => void;
  startValue?: number;
}

export type useDragFunctionType = (
  container: RefObject<HTMLElement>,
  dragTarget: RefObject<HTMLElement>,
  settings: Settings
) => [number, Dispatch<SetStateAction<number>>];
