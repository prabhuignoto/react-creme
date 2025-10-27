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
  onPrimaryClick?: () => void;

  // callback executed on clicking the secondary button
  onSecondaryClick?: () => void;

  // @deprecated Use onPrimaryClick instead
  onSuccess?: () => void;

  // label for primary button
  primaryButtonLabel?: string;

  // label for secondary button
  secondaryButtonLabel?: string;

  // whether to show the close button in header
  showCloseButton?: boolean;

  // whether to show the footer with action buttons
  showFooter?: boolean;

  // available sizes
  size?: 'sm' | 'md' | 'lg';

  // dialog title (required for accessibility)
  title: string;

  // heading level for title (h1-h6)
  titleLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  // minimum width of the dialog
  width?: number;
}
