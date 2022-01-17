import React, { RefObject } from 'react';

export type ToolTipPosition =
  | 'top left'
  | 'top right'
  | 'top center'
  | 'bottom center'
  | 'bottom left'
  | 'bottom right'
  | 'left center'
  | 'left top'
  | 'left bottom'
  | 'right center';

export interface TooltipProps {
  bgColor?: string;
  children: React.ReactNode[] | React.ReactNode;
  fixedAtCenter?: boolean;
  foreColor?: string;
  isStatic?: boolean;
  maxWidth?: number;
  message: string;
  minWidth?: number;
  onTooltipRendered?: () => void;
  position?: ToolTipPosition;
  ref?: RefObject<HTMLElement>;
  show?: boolean;
}
