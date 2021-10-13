import React, { MutableRefObject } from "react";

export interface OverlayModel {
  onClose?: () => void;
  isClosing?: boolean;
  showClose?: boolean;
  containedToParent?: MutableRefObject<HTMLElement>;
}

export interface OverlayProps {
  children: React.ReactNode;
  close?: boolean;
  disableAnimation?: boolean;
  disableBackdrop?: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
}
