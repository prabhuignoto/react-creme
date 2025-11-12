import React from 'react';
import { OverlayModel } from '../common/overlay-model';

/** Notification position on screen */
export type NotificationPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'top-center';

/** Notification component props */
export interface NotificationProps extends OverlayModel<null> {
  /** Auto-close the notification after duration in milliseconds */
  autoClose?: number;

  /** Content to be rendered inside the notification */
  children: React.ReactNode[] | React.ReactNode;

  /** Disable the header (not recommended for accessibility) */
  disableHeader?: boolean;

  /** Minimum height of the notification in pixels */
  height?: number | string;

  /** Position of the notification on screen */
  position?: NotificationPosition;

  /** Size variant for text and close button */
  size?: 'sm' | 'md' | 'lg';

  /** Enable swipe gesture to close (only works for left/right positions) */
  swipeToClose?: boolean;

  /** Title for the notification (recommended for accessibility) */
  title?: string;

  /** Minimum width of the notification in pixels */
  width?: number | string;
}
