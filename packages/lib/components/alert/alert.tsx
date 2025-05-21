// Import necessary modules and icons
import { CheckIcon, CloseIcon, ErrorIcon, InfoIcon, WarningIcon } from '@icons';
import classNames from 'classnames';
import React, {
  CSSProperties,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import useFocus from '../common/effects/useFocusNew';
import { AlertProps } from './alert-model';
import styles from './alert.module.scss';

// Memoize icons to prevent unnecessary re-renders
const icons = {
  error: <ErrorIcon />,
  info: <InfoIcon />,
  success: <CheckIcon />,
  warning: <WarningIcon />,
};

// Define the Alert component
const Alert: React.FunctionComponent<AlertProps> = ({
  // Define default properties
  message,
  height = 100,
  state = 'info',
  canDismiss = true,
  onDismiss,
  children,
  RTL = false,
  focusable = true,
  size = 'sm',
  animation = 'shrink',
  ariaLabelClose = 'close alert',
}) => {
  // Define local state for handling close functionality
  const [close, setClose] = useState(false);

  // Create a ref to the close button
  const btnCloseRef = useRef<HTMLSpanElement>(null);

  // Only apply focus effect if focusable is true
  useFocus(
    focusable ? (btnCloseRef as React.RefObject<HTMLElement>) : null,
    () => setClose(true)
  );

  // Optimize style memoization
  const style = useMemo<CSSProperties>(
    () => ({ '--height': `${height}px` }) as CSSProperties,
    [height]
  );

  // Optimize class memoization
  const messageClass = useMemo(
    () =>
      classNames(styles.alert, {
        [styles[`alert_${state}`]]: true,
        [styles.alert_close]: close,
        [styles.alert_rtl]: RTL,
        [styles[`alert_${size}`]]: true,
        [styles[animation]]: true,
      }),
    [state, close, RTL, size, animation]
  );

  // Optimize close handler
  const handleClose = useCallback(() => {
    setClose(true);
    onDismiss?.();
  }, [onDismiss]);

  // Get the appropriate icon
  const icon = useMemo(() => icons[state] || icons.info, [state]);

  // Return the rendered component
  return (
    <div
      className={messageClass}
      style={style}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.alert_icon_wrapper}>
        <span
          className={styles.alert_icon}
          role="img"
          aria-label={`alert-icon-${state}`}
        >
          {icon}
        </span>
      </div>
      <span className={styles.alert_content}>{children || message}</span>
      {canDismiss && (
        <span
          className={styles.alert_close_btn}
          role="button"
          aria-label={ariaLabelClose}
          ref={btnCloseRef}
          onClick={handleClose}
          tabIndex={focusable ? 0 : -1}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClose();
            }
          }}
        >
          <CloseIcon />
        </span>
      )}
    </div>
  );
};

// Set the display name of the component (useful in debugging)
Alert.displayName = 'Alert';

// Export the component
export { Alert };
