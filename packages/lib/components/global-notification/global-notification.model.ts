export type GlobalNotificationState = 'success' | 'error' | 'warning' | 'info';

/**
 * GlobalNotification component props interface
 */
export interface GlobalNotificationProps {
  /**
   * Aria label for close button
   * @default 'close notification'
   */
  ariaLabelClose?: string;

  /**
   * Time in milliseconds before auto-closing
   * @default 3000
   */
  closeAfter?: number;

  /**
   * Delay in milliseconds before showing
   * @default 0
   */
  delay?: number;

  /**
   * Makes the component focusable
   * @default true
   */
  focusable?: boolean;

  /**
   * Height of the notification in pixels
   * @default 50
   */
  height?: number;

  /**
   * Animation to use while hiding
   * @default 'hide'
   */
  hideAnimationStyle?: 'hide' | 'shrink';

  /**
   * Message displayed in the notification
   */
  message: string;

  /**
   * Callback executed on close
   */
  onClose?: () => void;

  /**
   * Size of the notification
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * State of the notification
   * @default 'info'
   */
  state?: GlobalNotificationState;
}
