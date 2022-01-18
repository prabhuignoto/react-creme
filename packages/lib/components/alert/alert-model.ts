import { ReactNode } from 'react';

/** ✨ Component props **/
export interface AlertProps {
  /**🟡 right to left */
  RTL?: boolean;

  /**🟡 prop to dismiss the alert */
  canDismiss?: boolean;

  /**🟡 react children */
  children?: ReactNode;

  /**🟡 prop to enable focus on the alert */
  focusable?: boolean;

  /**🟡 sets the height */
  height?: number;

  /**🟡 message that will be displayed inside the alert */
  message?: string;

  /**🟡 callback executed on dismiss */
  onDismiss?: () => void;

  /**🟡 state of the alert */
  state?: 'success' | 'error' | 'warning' | 'info';
}
