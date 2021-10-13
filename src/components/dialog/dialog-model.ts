import React from "react";
import { OverlayModel } from "../common/overlay-model";

export interface DialogModel extends OverlayModel {
  children?: React.ReactNode;
  onClose?: () => void;
  onSuccess?: () => void;
  title?: string;
}
