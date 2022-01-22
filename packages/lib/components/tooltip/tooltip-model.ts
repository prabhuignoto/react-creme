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
export class TooltipProps {
  //🔷 Background color of the Tooltip
  public bgColor?: string;

  public children: React.ReactNode[] | React.ReactNode;

  //🔷 pins the Tooltip at the center
  public fixedAtCenter?: boolean;

  //🔷 foreground color
  public foreColor?: string;

  //🔷 keeps the tooltip visible all the time
  public isStatic?: boolean;

  //🔷 maximum width of the tooltip
  public maxWidth?: number;

  //🔷 message to be displayed in the tooltip
  public message: string = '';

  //🔷 minimum width of the tooltip
  public minWidth?: number;

  //🔷 callback executed when the tooltip is rendered
  public onTooltipRendered?: () => void;

  //🔷 position of the tooltip
  public position?: ToolTipPosition;

  //🔷 reference to the tooltip container
  public ref?: RefObject<HTMLElement>;

  //🔷 whether to show the tooltip
  public show?: boolean;
}
