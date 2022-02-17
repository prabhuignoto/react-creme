import React from 'react';
import { OverlayModel } from '../common/overlay-model';

export interface DialogProps extends OverlayModel<null> {
  // duration of the animation
  animationDuration?: number;

  // animation types
  animationType?: 'drop' | 'pop' | 'rise' | 'slide-left' | 'slide-right';

  // react node
  children?: React.ReactNode;

  // enables or disables focus
  focusable?: boolean;

  // minimum height of the dialog
  height?: number;

  // callback executed on closing the dialog
  onClose?: () => void;

  // callback executed on opening the dialog
  onOpen?: () => void;

  // callback executed on clicking the primary button
  onSuccess?: () => void;

  // available sizes
  size?: 'sm' | 'md' | 'lg';

  // dialog title
  title?: string;

  // minimum width of the dialog
  width?: number;
}
