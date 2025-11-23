import { CloseIcon } from '@icons';
import classNames from 'classnames';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useFocus from '../common/effects/useFocusNew';
import { withOverlay } from '../common/withOverlay';
import { GlobalNotificationProps } from './global-notification.model';
import styles from './global-notification.module.scss';

const GlobalNotification: React.FunctionComponent<GlobalNotificationProps> = ({
  height = 50,
  delay = 0,
  closeAfter = 3000,
  message,
  state = 'info',
  onClose,
  hideAnimationStyle = 'hide',
  focusable = true,
  size = 'md',
  ariaLabelClose = 'close notification',
}) => {
  const [open, setOpen] = useState(false);

  const btnCloseRef = useRef<HTMLSpanElement>(null);

  useFocus(
    focusable ? (btnCloseRef as React.RefObject<HTMLElement>) : null,
    focusable ? () => setOpen(false) : null
  );

  useEffect(() => {
    setTimeout(() => setOpen(true), delay);
  }, [delay]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => onClose?.(), 250);
      }, closeAfter);
    }
  }, [open, closeAfter, onClose]);

  const globalNotificationClass = useMemo(
    () =>
      classNames(styles.global_notification, {
        [styles.close]: !open,
        [styles.open]: open,
        [styles[state]]: true,
        [styles[`animation_${hideAnimationStyle}`]]: true,
        [styles[size]]: true,
      }),
    [open, state, hideAnimationStyle, size]
  );

  const style = useMemo(
    () =>
      ({
        '--height': `${height}px`,
      }) as CSSProperties,
    [height]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  return (
    <div
      className={globalNotificationClass}
      style={style}
      role="alert"
      aria-live="polite"
    >
      <span className={styles.message}>{open && message}</span>
      <span
        className={styles.close_btn}
        onClick={handleClose}
        role="button"
        aria-label={ariaLabelClose}
        ref={btnCloseRef}
        tabIndex={focusable ? 0 : -1}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClose();
          }
        }}
      >
        {open && <CloseIcon />}
      </span>
    </div>
  );
};

GlobalNotification.displayName = 'GlobalNotification';

const GlobalNotificationOverlay = withOverlay<GlobalNotificationProps, null>(
  GlobalNotification,
  {
    backdropColor: 'transparent',
    name: 'globalNotification',
  }
);

export { GlobalNotificationOverlay as GlobalNotification };
