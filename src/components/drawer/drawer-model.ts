import React from "react";
import { OverlayModel } from "../common/overlay-model";

export interface DrawerModel extends OverlayModel {
  children?: React.ReactNode | React.ReactNode[];
  height?: number | string;
  position?: "left" | "right" | "top" | "bottom";
  width?: number | string;
}
