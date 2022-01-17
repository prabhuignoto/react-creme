import React from "react";
import { OverlayModel } from "../common/overlay-model";

export type NotificationPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"
  | "top-center";

export interface NotificationProps extends OverlayModel {
  autoClose?: number;
  children: React.ReactNode[] | React.ReactNode;
  disableHeader?: boolean;
  height?: number | string;
  position?: NotificationPosition;
  swipeToClose?: boolean;
  title?: string;
  width?: number | string;
}
