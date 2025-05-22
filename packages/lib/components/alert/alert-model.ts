import { ReactNode } from 'react';

/**
 * Alert component props interface
 * @typedef {Object} AlertProps
 */
export interface AlertProps {
  /**
   * Right to left text direction
   * @default false
   */
  RTL?: boolean;

  /**
   * Animation type when alert closes
   * @default 'shrink'
   */
  animation?: 'shrink' | 'fade';

  /**
   * Aria label for close button
   * @default 'close alert'
   */
  ariaLabelClose?: string;

  /**
   * Whether the alert can be dismissed
   * @default true
   */
  canDismiss?: boolean;

  /**
   * React children to render inside alert
   */
  children?: ReactNode;

  /**
   * Whether the alert can be focused
   * @default true
   */
  focusable?: boolean;

  /**
   * Height of the alert in pixels
   * @default 100
   */
  height?: number;

  /**
   * Message to display inside the alert
   */
  message?: string;

  /**
   * Callback executed when alert is dismissed
   */
  onDismiss?: () => void;

  /**
   * Size of the alert
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * State/type of the alert
   * @default 'info'
   */
  state?: 'success' | 'error' | 'warning' | 'info';
}
