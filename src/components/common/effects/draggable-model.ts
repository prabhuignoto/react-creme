import { RefObject } from "react";

export type DragDirection = "HORIZONTAL" | "VERTICAL" | "BOTH";

export interface Position {
  x: number;
  y: number;
  target: HTMLElement | null;
}

export interface DragSettings {
  makeChildrenDraggable?: boolean;
  boundTo?: RefObject<HTMLElement> | null;
  dragDirection?: DragDirection;
}

export type UseDraggable = (
  ref: RefObject<HTMLElement> | HTMLElement,
  settings?: DragSettings
) => Position;
