export type GlobalNotificationState = 'success' | 'error' | 'warning' | 'info';

/** ✨ Component props */

export interface GlobalNotificationProps {
  closeAfter?: number;
  delay?: number;

  /** 🟠 makes the component focusable */
  focusable?: boolean;

  /** 🟠 height of the notification */
  height?: number;

  /** 🟠 animation to use while hiding */
  hideAnimationStyle?: 'hide' | 'shrink';

  /** 🟠 message displayed in the notification */
  message: string;

  /** 🟠 callback executed on close */
  onClose?: () => void;

  /** 🟠 state of the notification */
  state?: GlobalNotificationState;
}
