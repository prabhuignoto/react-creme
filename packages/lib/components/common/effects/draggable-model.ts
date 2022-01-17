import { RefObject } from 'react';

export type DragDirection = 'HORIZONTAL' | 'VERTICAL' | 'BOTH';

export interface Position {
  target: HTMLElement | null;
  x: number;
  y: number;
}

export interface DragSettings {
  boundTo?: RefObject<HTMLElement> | null;
  dragDirection?: DragDirection;
  makeChildrenDraggable?: boolean;
}

export type UseDraggable = (
  ref: RefObject<HTMLElement> | HTMLElement,
  settings?: DragSettings
) => Position;
