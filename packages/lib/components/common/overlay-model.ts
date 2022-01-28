import React, { RefObject } from 'react';

interface OverlayCommon {
  align?: 'left' | 'right';
  hideDocumentOverflow?: boolean;
  onClose?: () => void;
  onClosing?: () => void;
  placement?: 'top' | 'bottom';
  placementReference?: RefObject<HTMLElement>;
}

export interface OverlayModel extends OverlayCommon {
  align?: 'left' | 'right';
  containedToParent?: RefObject<HTMLElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  isClosing?: boolean;
  overlayAnimation?: boolean;
  placement?: 'top' | 'bottom';
  showClose?: boolean;
}

export interface OverlayProps extends OverlayCommon {
  backdropColor?: string;
  children: React.ReactNode;
  containedToParent?: boolean;
  disableBackdrop?: boolean;
  overlayAnimation?: boolean;
  showCloseButton?: boolean;
}
