import React from "react";
import { OverlayModel } from "../common/overlay-model";

export interface NotificationModel extends OverlayModel {
  title: string;
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"
    | "top-center";
  children: React.ReactNode[] | React.ReactNode;
  width?: number | string;
  height?: number | string;
  autoClose?: number;
}
