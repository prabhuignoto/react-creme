import React, { RefObject } from "react";

interface OverlayCommon {
  onClose?: () => void;
  onClosing?: () => void;
  placement?: "top" | "bottom";
  align?: "left" | "right";
  placementReference?: RefObject<HTMLElement>;
}

export interface OverlayModel extends OverlayCommon {
  isClosing?: boolean;
  showClose?: boolean;
  placement?: "top" | "bottom";
  align?: "left" | "right";
  containedToParent?: RefObject<HTMLElement>;
  overlayAnimation?: boolean;
}

export interface OverlayProps extends OverlayCommon {
  backdropColor?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  containedToParent?: boolean;
  overlayAnimation?: boolean;
  disableBackdrop?: boolean;
}
