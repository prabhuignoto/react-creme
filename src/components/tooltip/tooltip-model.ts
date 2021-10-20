import React, { RefObject } from "react";

export type ToolTipPosition =
  | "top left"
  | "top right"
  | "top center"
  | "bottom center"
  | "bottom left"
  | "bottom right"
  | "left center"
  | "right center";

export interface TooltipModel {
  children: React.ReactNode[] | React.ReactNode;
  message: string;
  position?: ToolTipPosition;
  width?: number;
  ref?: RefObject<HTMLElement>;
  isStatic?: boolean;
}
