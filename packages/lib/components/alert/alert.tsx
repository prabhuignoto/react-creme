import classNames from 'classnames';
import * as React from 'react';
import { CSSProperties, useCallback, useMemo } from 'react';
import {
  CheckIcon,
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
} from '../../icons';
import useFocus from '../common/effects/useFocusNew';
import { AlertProps } from './alert-model';
import styles from './alert.module.scss';

const Alert: React.FunctionComponent<AlertProps> = ({
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
}) => {
  const [close, setClose] = React.useState(false);

  const btnCloseRef = React.useRef<HTMLSpanElement>(null);

  if (focusable) {
    useFocus(btnCloseRef, () => setClose(true));
  }

  const style = useMemo(
    () =>
      ({
        '--height': `${height}px`,
      } as CSSProperties),
    [state]
  );

  const messageClass = useMemo(
    () =>
      classNames(styles.alert, {
        [styles[`alert_${state}`]]: true,
        [styles.alert_close]: close,
        [styles.alert_rtl]: RTL,
        [styles[`alert_${size}`]]: true,
        [styles[animation]]: true,
      }),
    [state, close, animation]
  );

  const handleClose = useCallback(() => {
    setClose(true);
    onDismiss?.();
  }, []);

  const icon = useMemo(() => {
    switch (state) {
      case 'success':
        return <CheckIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      default:
        return <InfoIcon />;
    }
  }, []);

  return (
    <div className={messageClass} style={style} role="alert">
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
          aria-label="close alert"
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

Alert.displayName = 'Alert';

export { Alert };
