import React, { RefObject } from 'react';

interface OverlayCommon {
  align?: 'left' | 'right' | 'center';
  hideDocumentOverflow?: boolean;
  leftOffset?: number;
  onClose?: () => void;
  onClosing?: () => void;
  onOpen?: () => void;
  placement?: 'top' | 'bottom';
  placementOffset?: number;
  placementReference?: RefObject<HTMLElement>;
}

export interface OverlayModel<T> extends OverlayCommon {
  align?: 'left' | 'right' | 'center';
  children?: React.ReactNode | React.ReactNode[];
  containedToParent?: RefObject<HTMLElement>;
  data?: T;
  isClosing?: boolean;
  overlayAnimation?: boolean;
  placement?: 'top' | 'bottom';
  ref?: RefObject<HTMLElement | null>;
  showClose?: boolean;
}

export interface OverlayProps {
  align?: 'left' | 'right' | 'center';
  backdropColor?: string;
  children: React.ReactNode;
  containedToParent?: boolean;
  disableBackdrop?: boolean;
  hideDocumentOverflow?: boolean;
  leftOffset?: number;
  onClose?: () => void;
  onClosing?: () => void;
  onOpen?: () => void;
  overlayAnimation?: boolean;
  placement?: 'top' | 'bottom';
  placementOffset?: number;
  placementReference?: RefObject<HTMLElement>;
  showCloseButton?: boolean;
}
