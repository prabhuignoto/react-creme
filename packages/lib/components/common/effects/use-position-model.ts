import { CSSProperties, RefObject } from 'react';

export type Position =
  | 'top left'
  | 'top right'
  | 'top center'
  | 'bottom center'
  | 'bottom left'
  | 'bottom right'
  | 'left center'
  | 'left top'
  | 'left bottom'
  | 'right top'
  | 'right bottom'
  | 'right center';

interface Settings {
  alignToEdge?: boolean;
  spacing: number;
}

export type FunctionType = (
  ele: RefObject<HTMLDivElement> | null,
  toolTip: RefObject<HTMLElement>,
  pos: Position,
  settings?: Settings
) => {
  onInit: () => void;
  position?: CSSProperties;
};
