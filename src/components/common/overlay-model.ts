import React, { RefObject } from "react";

interface OverlayCommon {
  onClose?: () => void;
  onClosing?: () => void;
  placement?: "top" | "bottom";
  placementReference?: RefObject<HTMLElement>;
}

export interface OverlayModel extends OverlayCommon {
  isClosing?: boolean;
  showClose?: boolean;
  placement?: "top" | "bottom";
  containedToParent?: RefObject<HTMLElement>;
}

export interface OverlayProps extends OverlayCommon {
  backdropColor?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  containedToParent?: boolean;
}
