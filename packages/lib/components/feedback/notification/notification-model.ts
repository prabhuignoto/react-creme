import { OverlayModel } from '@common';

/** ✨positions */
export type NotificationPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'top-center';

/** ✨ Component props */
export interface NotificationProps extends OverlayModel<null> {
  /**🔷 auto closes the tooltip after the duration in Milliseconds */
  autoClose?: number;

  /**🔷 children elements to be rendered inside the tooltip *
  children: React.ReactNode[] | React.ReactNode;

  /**🔷 disable the header */
  disableHeader?: boolean;

  /**🔷 minimum height of the tooltip */
  height?: number | string;

  /**🔷 prop to set the position of the tooltip */
  position?: NotificationPosition;

  size?: 'sm' | 'md' | 'lg';

  /**🔷 swipe gesture to close the notification */
  swipeToClose?: boolean;

  /**🔷 title for the notification */
  title?: string;

  /**🔷 minimum width of the notification */
  width?: number | string;
}
