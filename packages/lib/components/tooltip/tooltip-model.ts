import React, { RefObject } from 'react';

/** ✨ Tooltip Positions */
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

/** ✨ Component props */
export type TooltipProps = {
  //🔷 Background color of the Tooltip
  bgColor?: string;

  children: React.ReactNode[] | React.ReactNode;

  //🔷 pins the Tooltip at the center
  fixedAtCenter?: boolean;

  //🔷 foreground color
  foreColor?: string;

  //🔷 keeps the tooltip visible all the time
  isStatic?: boolean;

  //🔷 maximum width of the tooltip
  maxWidth?: number;

  //🔷 message to be displayed in the tooltip
  message: string;

  //🔷 minimum width of the tooltip
  minWidth?: number;

  //🔷 callback executed when the tooltip is rendered
  onTooltipRendered?: () => void;

  //🔷 position of the tooltip
  position?: ToolTipPosition;

  //🔷 reference to the tooltip container
  ref?: RefObject<HTMLElement>;

  //🔷 whether to show the tooltip
  show?: boolean;
};
