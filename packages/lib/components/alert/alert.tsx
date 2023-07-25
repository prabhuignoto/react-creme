// Import necessary modules and icons
import { CheckIcon, CloseIcon, ErrorIcon, InfoIcon, WarningIcon } from '@icons';
import classNames from 'classnames';
import React from 'react';
import { CSSProperties, useCallback, useMemo } from 'react';
import useFocus from '../common/effects/useFocusNew';
import { AlertProps } from './alert-model';
import styles from './alert.module.scss';

// Create an object mapping alert states to icons
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
  const [close, setClose] = React.useState(false);

  // Create a ref to the close button
  const btnCloseRef = React.useRef<HTMLSpanElement>(null);

  // Use custom hook to handle focus and set close state
  useFocus(focusable ? btnCloseRef : null, () => setClose(true));

  // Memoize the CSS styles based on the alert state
  const style = useMemo(
    () =>
      ({
        '--height': `${height}px`,
      }) as CSSProperties,
    [height]
  );

  // Memoize the CSS classnames based on various properties
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

  // Define a function to handle the close action
  const handleClose = useCallback(() => {
    setClose(true);
    onDismiss?.();
  }, [onDismiss]);

  // Return the rendered component
  return (
    <div className={messageClass} style={style} role="alert">
      <div className={styles.alert_icon_wrapper}>
        <span
          className={styles.alert_icon}
          role="img"
          aria-label={`alert-icon-${state}`}
        >
          {icons[state] || icons.info}{' '}
          {/* Use the icon corresponding to the state */}
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
