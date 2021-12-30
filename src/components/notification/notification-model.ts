import React from "react";
import { OverlayModel } from "../common/overlay-model";

export type NotificationPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"
  | "top-center";

export interface NotificationModel extends OverlayModel {
  title?: string;
  position?: NotificationPosition;
  children: React.ReactNode[] | React.ReactNode;
  width?: number | string;
  height?: number | string;
  autoClose?: number;
  swipeToClose?: boolean;
  disableHeader?: boolean;
}
