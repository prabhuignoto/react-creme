import React, { RefObject } from "react";

export type ToolTipPosition =
  | "top left"
  | "top right"
  | "top center"
  | "bottom center"
  | "bottom left"
  | "bottom right"
  | "left center"
  | "left top"
  | "left bottom"
  | "right center";

export interface TooltipModel {
  children: React.ReactNode[] | React.ReactNode;
  isStatic?: boolean;
  message: string;
  onTooltipRendered?: () => void;
  position?: ToolTipPosition;
  ref?: RefObject<HTMLElement>;
  show?: boolean;
  width?: number;
  fixedAtCenter?: boolean;
}
