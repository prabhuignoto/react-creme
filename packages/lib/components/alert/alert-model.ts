import { ReactNode } from 'react';

/** ✨ Component props **/
export interface AlertProps {
  /**🟡 right to left */
  RTL?: boolean;

  animation?: 'shrink' | 'fade';

  /**🟡 prop to set the aria label */
  ariaLabelClose?: string;

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

  /**🟡 prop to set the size */
  size?: 'sm' | 'md' | 'lg';

  /**🟡 state of the alert */
  state?: 'success' | 'error' | 'warning' | 'info';
}
